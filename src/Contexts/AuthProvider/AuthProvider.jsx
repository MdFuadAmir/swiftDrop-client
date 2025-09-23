import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";


const AuthProvider = ({children}) => {
    // states 
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // creat user
    const creatUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sign in
    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    // update profile
    const updateUserProfile = (profileInfo) =>{
        return updateProfile(auth.currentUser, profileInfo);

    }
    
    // google sign in
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    // logout 
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe()
        }

    },[])
    const authInfo ={
        user,
        loading,
        creatUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;