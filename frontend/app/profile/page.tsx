'use client'

import { useAuth } from "@/components/Auth"
import Loading from "@/components/Loading"
import { Input } from "@mui/material"
import { BellIcon, EnvelopeClosedIcon, RowsIcon } from "@radix-ui/react-icons"

export default function Profile() {
    const {user, userId, userName, photoURL, loading} = useAuth()

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="h-full w-full bg-slate-50 p-10">
            <div className="flex justify-around items-center bg-white drop-shadow p-1 rounded">
                <div className="flex space-x-6">
                    <EnvelopeClosedIcon className="hover:cursor-pointer hover:scale-110 transition hover:text-sky-400"/>
                    <BellIcon className="hover:cursor-pointer hover:scale-110 transition hover:text-sky-400 z-50"/>
                </div>
                <div className="flex-shrink-0 fle">
                    <Input placeholder={`search account`}/>
                </div>
                <div>
                    <RowsIcon className="hover:cursor-pointer hover:scale-110 transition hover:text-sky-400"/>
                </div>
            </div>
        </div>
    )
}