'use client'
import Loading from "@/components/Loading";
import { auth, provider } from "@/firebase";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function login() {
        setLoading(true)

        return signInWithPopup(auth, provider)
        .then(() => {
            setLoading(true)
            router.push('/home')
            setLoading(false)

        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            return console.log(errorCode, errorMessage)
        })

    }

    if (loading) return <Loading />

    return (
        <div className="h-dvh w-dvw grid">
            <div className="bg-gray-200 w-2/3 h-2/3 mx-auto my-auto rounded-md shadow-md grid md:grid-cols-2">
                <div className="p-8">
                    <h1 className="my-12 font-bold text-xl">MovieConnect</h1>
                    <div className="h-1 border-t border- w-2/3 mt-32"></div>
                    <p className="my-2 flex items-center">Sign In to Get Started<span className="mx-3"><ArrowRightIcon/></span></p>

                </div>
                <div className="grid items-center border-l border-white">
                    <Button 
                        onClick={login}
                        className="px-2 flex mx-auto"
                    >Sign In With Google <span className="mx-3 flex items-center"><Google/></span></Button>

                </div>

            </div>
        </div>
    )
}