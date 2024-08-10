'use client'

import { useAuth } from "@/components/Auth"
import Loading from "@/components/Loading"
import { Avatar } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Profile() {
    const {user, userId, userName, photoURL, loading} = useAuth()

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="h-full w-full bg-red-400">
            im the main page
        </div>
    )
}