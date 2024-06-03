'use client'
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('');
    // const [photoURL, setPhotoURL] = useState('');
    const router = useRouter()

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            router.push('/home')
    
            const user = auth.currentUser
            const photoURL = user.photoURL
            setUserName(user!.displayName!)
            
    
          } else {
            router.push('/auth/register');
          }
          setLoading(false)
        });
    
        // Clean up function
        return () => unsubscribe();
      }, [router]);
    
      // Render loading component if loading state is true
      if (loading) {
        return 
      }

    return(
        <div>hello {userName}</div>
    )
}