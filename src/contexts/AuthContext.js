import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import { auth, db } from "../firebase";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [userRole, setUserRole] = useState()
    const [loading, setLoading] = useState(true)
    const refereceUserDb = db.collection('members');

    console.log('userRole', userRole)
    
    const registerNewUser = async (data) => {
        const { name, email, password, role } = data;

        try {
            const registerData = await auth.createUserWithEmailAndPassword(email, password);
            await refereceUserDb.doc(registerData.user.uid).set({
                uid: registerData.user.uid,
                name,
                email,
                role,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                isOnline: true,
            })
        } catch (error) {
            console.log('registerNewUser error', error)
        }
    }

    const loginUser = async (data) => {
        const {email, password } = data;
        try {
            const loginData = await auth.signInWithEmailAndPassword(email, password);
            await refereceUserDb.doc(loginData.user.uid).update({
                isOnline: true,
            })
        } catch (error) {
            console.log('loginUser error', error)
        }
    }

    const signOut = async () => {
        try {
            await refereceUserDb.doc(user.uid).update({
                isOnline: false,
            })
            await auth.signOut();
        } catch (error) {
            console.log('signOut', error);
        }
      };
  

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user) => {
            setUser(user)
            try {
                let userStatus = []
                const dataQuery = await refereceUserDb.where('uid', '==', user.uid).get();
                if(dataQuery) {
                    dataQuery.docs.forEach(doc => {
                        userStatus.push(doc.data())
                    })
                }
                setUserRole(userStatus[0])
            } catch (error) {
                setUserRole({})
                console.log('error getData')
            }
            setLoading(false)
        })
    
        return unsubscribe
    }, [])
  
    const value = {
        user,
        userRole,
        registerNewUser,
        loginUser,
        signOut
    }
  
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
  }