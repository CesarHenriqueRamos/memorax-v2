import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";


    interface TrasactionsProviderProps{
        children: ReactNode
    }

    const provider = new GoogleAuthProvider();
    const AuthGoogleContextUser = createContext<any>('');

    export function AuthGoogleProvider({children}:TrasactionsProviderProps){
        const auth = getAuth(app);
        const [user,setUser] = useState<any>(null)

    useEffect(()=>{
        const loadStorageAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser){
                const userLoad = JSON.parse(sessionUser);
                setUser(userLoad)
            }
        }
        loadStorageAuth();
    },[])

     const signAuth = () =>{
         signInWithPopup(auth, provider)
           .then((result) => {
             const credential = GoogleAuthProvider.credentialFromResult(result);
             const token = credential?.accessToken;
             const user = result.user;
             setUser(user)
             sessionStorage.setItem("@AuthFirebase:token", token!)
             sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user))
           }).catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             const email = error.customData.email;
             const credential = GoogleAuthProvider.credentialFromError(error);
             return {errorCode,errorMessage,email,credential}
         });
       }

    const signOut = () =>{
        sessionStorage.clear();
        setUser(null);
        return <Navigate to="/"/>;
    }  
        return(
            <AuthGoogleContextUser.Provider value={{signed:!!user, user, signOut,signAuth}}>
                {children}
            </AuthGoogleContextUser.Provider>
        )
    }


    export function useAuthGoogle(){
        const context = useContext(AuthGoogleContextUser);
        return context;
    }