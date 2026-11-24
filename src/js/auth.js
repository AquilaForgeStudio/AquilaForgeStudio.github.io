// src/js/auth.js
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendEmailVerification 
} from "firebase/auth";
import { 
    doc, 
    setDoc, 
    getDoc,
    Timestamp,
    serverTimestamp 
} from "firebase/firestore";
import { auth, db } from './firebase';

const saveUserToLocalStorage = async (user) => {
    const token = await user.getIdToken();
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('accessToken', token);
};

const isUnder13 = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age < 13;
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await saveUserToLocalStorage(userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.code };
    }
};

/**
 * 최종 가입 완료 시점에 호출되는 함수 (이메일 및 소셜 공통)
 */
export const registerUserFinal = async (email, password, additionalData) => {
    try {
        if (isUnder13(additionalData.birthDate)) {
            return { success: false, error: "auth/under-age" };
        }

        let user;

        // 소셜 가입인 경우 (비밀번호가 전달되지 않거나 authType이 소셜인 경우)
        if (additionalData.authtype && additionalData.authtype !== 'email') {
            user = auth.currentUser; // 현재 팝업으로 인증된 유저 가져오기
        } else {
            // 이메일 가입인 경우
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            await sendEmailVerification(user);
        }

        if (!user) {
            return { success: false, error: "auth/no-user" };
        }

        const birthTimestamp = Timestamp.fromDate(new Date(additionalData.birthDate));

        // Firestore에 유저 정보 저장
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: email || user.email,
            nickname: additionalData.nickname,
            birthDate: birthTimestamp,
            country: additionalData.country,
            termsAccepted: additionalData.termsAccepted,
            marketingAccepted: additionalData.marketingAccepted || false,
            createdAt: serverTimestamp(),
            authtype: additionalData.authtype || "email",
            role: 0,
            notifications: [{
                title: "welcome to aquila forge studio",
                detail: "Welcome to aquila forge studio",
                createdat:serverTimestamp()
            }]
        });

        await saveUserToLocalStorage(user);
        return { success: true, user };
    } catch (error) {
        return { success: false, error: error.code };
    }
};

// 구글 소셜 로그인
export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return { success: true, isNewUser: true, user };
        }

        await saveUserToLocalStorage(user);
        return { success: true, isNewUser: false, user };
    } catch (error) {
        return { success: false, error: error.code };
    }
};

// 깃허브 소셜 로그인 (이메일 비공개 계정 예외 처리 포함)
export const loginWithGitHub = async () => {
    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // 💡 깃허브 설정에서 이메일이 비공개(private)인 경우 user.email이 null일 수 있습니다.
        if (!user.email) {
            return { success: false, error: "auth/github-email-private" };
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return { success: true, isNewUser: true, user };
        }

        await saveUserToLocalStorage(user);
        return { success: true, isNewUser: false, user };
    } catch (error) {
        return { success: false, error: error.code };
    }
};