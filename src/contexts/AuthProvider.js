// import React, { createContext } from 'react';
// import useFirebase from '../hooks/useFirebase';

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//     const allContexts = useFirebase();
//     return (
//         <AuthContext.Provider value={allContexts}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';



export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const updateUser = (userInfo) => {
        // return updateProfile(auth.currentUser, userInfo);
        return updateProfile(auth.currentUser, userInfo)
    }

    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser,
        signIn,
        user,
        logOut,
        updateUser,
        loading,
        setLoading,
        providerLogin


    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;