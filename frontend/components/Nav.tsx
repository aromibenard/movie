'use client'

import { Avatar } from "@mui/material";
import { VideoIcon } from "@radix-ui/react-icons";
import { signOut, User } from "firebase/auth";
import { auth } from "@/firebase";

import { DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuPortal, 
    DropdownMenuSeparator, 
    DropdownMenuShortcut, 
    DropdownMenuSub, 
    DropdownMenuSubContent, 
    DropdownMenuSubTrigger, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export interface NavProps {
    userName: string,
    photoURL: string,
    user: User | null
}

const Nav: React.FC<NavProps> = ({ userName, photoURL, user }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    async function logout() {
        setLoading(true)
        return signOut(auth)
            .then(() => {
                router.push('/')
                setLoading(false)
            }).catch ((error) => {
                //handle
            })
        
    }

    if (loading) return <Loading />
    
    return (
        <div className="bg-slate-200 h-14 w-full flex justify-around items-center shadow">
            
            <div>
                <div>
                    <h1 className="flex bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent items-center font-bold drop-shadow-md" ><span className="mx-1 text-black"><VideoIcon/></span>MovieConnect</h1>
                </div>
            </div>
            
            <div>
                todo
            </div>

            <div className="flex items-center">
                <p className="mx-2 font-semibold">{userName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar src={photoURL} alt={userName} className="hover:scale-105 transition cursor-pointer"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Keyboard shortcuts
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            New Team
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} >
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Nav



