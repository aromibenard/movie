'use client'
import { Avatar } from "@mui/material"
import { useAuth } from "./Auth"
import { Button } from "./ui/button"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

export default function ProfileSideBar() {
    const {user, userId, userName, photoURL, loading} = useAuth()
    return (
        <div className="w-full h-full flex flex-col p-4 justify-around space-y-4 shadow-lg">
            <div className="flex-initial w-3/4 mx-auto">
                <Avatar 
                    src={photoURL}
                    sx={{
                        width:'100%',
                        height: '100%',
                        boxShadow: 3
                    }}
                />
            </div>
            <div className=" flex flex-col justify-around items-center">
                <div className="w-full flex flex-col justify-around space-y-4 h-[5rem] mt-[-60px] mb-[1rem] border-b-2 border-gray-200">
                    <div>
                        <h1 className="tracking-tight text-xl text-gray-700 font-bold flex mx-auto items-center justify-center">{userName}</h1>
                        <p className="text-sm my-[-8px] text-gray-500 flex mx-auto justify-center ml-[-20px]">User</p>
                    </div>
                    <div>
                        <p className="flex mx-auto justify-center text-xs">online 😉</p>
                    </div>            
                </div>
                <div className="flex flex-col justify-center">
                    <Link href={'/profile/watchlist'}
                        className= { `w-full ${buttonVariants({ variant: 'ghost'})}`}
                    >
                        Watchlist
                    </Link>
                    <Link href={'/profile/friends'}
                        className= { `w-full ${buttonVariants({ variant: 'ghost'})}`}>
                        Community
                    </Link>
                </div>
            </div>
            <div className="flex-initial w-full mx-auto">
                <div className="flex mx-auto">
                    <Button className="w-full">LOG OUT</Button>
                </div>
               
            </div>
        </div>
    )
}