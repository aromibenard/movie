'use client'

import Clock from "@/components/Clock";
import { ContentTab } from "@/components/ContentTab";
import Loading from "@/components/Loading";
import Nav, { NavProps } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { Avatar } from "@mui/material";
import { ClockIcon } from "@radix-ui/react-icons";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            router.push('/home')
    
            const user = auth.currentUser
            setUser(user)
            const photoURL = user?.photoURL
            setUserName(user!.displayName!)
            setPhotoURL(user?.photoURL || '')
            
    
          } else {
            setUser(null)
            router.push('/auth/register');
          }
          setLoading(false)
        });
    
        // Clean up function
        return () => unsubscribe();
      }, [router]);
    
      if (loading) {
        return <Loading/>
      }

    return(
        <div>
          <Nav userName={userName} photoURL={photoURL} user={user}/>
          <Body userName={userName} photoURL={photoURL} user={user}/>
        </div>
    )
}

//sub components
const Body: React.FC<NavProps> = ({userName, photoURL}) => {
  return (
    <div className="h-dvh bg-slate-50 md:max-w-5xl mx-auto p-4">
      <div className="grid md:grid-cols-4 gap-4 h-[15rem]">
        <div className="bg-yellow-100 p-4 col-span-1">
          <Avatar 
            src={photoURL}
            alt={userName}
            sx={{height: 180, width: 180}}
            className="flex mx-auto"
          />
          <h2 className="m-3 font-semibold flex mx-auto">{userName}</h2>
          <div className="flex items-center space-x-2 m-3 mx-auto">
            <ClockIcon className="text-2xl"/>
            <Clock />
          </div>
          <Button className="flex mx-auto">Edit Profile</Button>
        </div>
        <div className=" p-4 col-span-3">
          <ContentTab />
        </div>
      </div>
    </div>
  )
}

