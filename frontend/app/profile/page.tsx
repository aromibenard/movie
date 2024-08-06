'use client'

import { useAuth } from "@/components/Auth"

export default function Profile() {
    const {user, userId, userName, photoURL} = useAuth()
    return (
        <div>
            hello {userName}
        </div>
    )
}