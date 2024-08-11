'use client'

import { Avatar } from "@mui/material"
import { useAuth } from "./Auth"
import { Button } from "./ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { DesktopIcon, GlobeIcon, PersonIcon } from "@radix-ui/react-icons"

export default function ProfileSideBar() {
    const {user, userId, userName, photoURL, loading} = useAuth()
    const pathname = usePathname()

    return (
        <div className="w-full h-full flex flex-col p-4 justify-around space-y-4 shadow-md">
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
                <div className="w-full flex flex-col justify-around space-y-4 h-[5rem] mt-[-60px] mb-[1rem] border-b-2 border-gray-200 pb-[0.5rem]">
                    <div>
                        <h1 className="tracking-tight text-xl text-gray-700 font-bold flex mx-auto items-center justify-center">{userName}</h1>
                        <p className="text-sm my-[-8px] text-gray-500 flex mx-auto justify-center ml-[-20px]">User</p>
                    </div>
                    <div className="">
                        <p className="flex mx-auto justify-center text-xs">online 😉</p>
                    </div>            
                </div>
                <div className="flex flex-col justify-around">
                    <Link href={'/profile'}
                            className= {clsx(
                                'mb-1 flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-sky-500 transition md:flex-none  md:p-2 md:px-3',
                                {
                                ' text-sky-500': pathname === '/profile',
                                },
                            )}
                        >
                        <PersonIcon/> Account
                    </Link>
                    <Link href={'/profile/watchlist'}
                        className= {clsx(
                            'my-1 flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:text-sky-500 md:flex-none  transition md:p-2 md:px-3',
                            {
                              ' text-sky-500': pathname === '/profile/watchlist',
                            },
                          )}
                    >
                       <DesktopIcon/> Watchlist
                    </Link>
                    <Link href={'/profile/friends'}
                        className= {clsx(
                            'my-0.5 flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-sky-500 transition md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                              ' text-sky-500': pathname === '/profile/friends',
                            },
                          )}>
                        <GlobeIcon/> Community
                    </Link>
                </div>
            </div>

            {/* TODO: Add Logout Function */}
            <div className="flex-initial w-full mx-auto">
                <div className="flex mx-auto">
                    <Button className="w-full bg-sky-500">LOG OUT</Button>
                </div>
               
            </div>
        </div>
    )
}