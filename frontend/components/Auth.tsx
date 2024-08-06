'use client'

import { auth, db } from "@/firebase"
import { AuthContextTypes } from "@/types/types"
import { onAuthStateChanged, User } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextTypes | undefined >(undefined) 

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [userId, setUserId] = useState<string>('')
    const [watchlist, setWatchlist] = useState([])

    const fetchWatchlist = async (uid:string) => {
        try {
          const querySnapshot = await getDocs( collection(db, 'users', uid, 'watchlist'))
          const watchlistData = querySnapshot.docs.map(doc => doc.data())
          setWatchlist(watchlistData)
        } catch (error) {
          console.error("Error fetching watchlist:", error)
        } finally {
          setIsLoading(false)
          console.log(watchlist)
        }     
    }

    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const user = auth.currentUser
                setUser(user)
                const uid = user!.uid
                setUserId(uid)
                setUserName(user!.displayName!)
                setPhotoURL(user?.photoURL || '')
                setIsLoading(true)
                await fetchWatchlist(user!.uid) 
            } else { 
                setUser(null)
                setWatchlist([]) 
            }          
            setLoading(false)
        })
    
        // Clean up function
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value ={{
            photoURL, userId, user, 
            userName, loading, watchlist 
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}