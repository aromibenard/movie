'use client'

import { useAuth } from "@/components/Auth"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
} from "@/components/ui/dialog"
import { Button, Input } from "@mui/material"
import { 
    ArrowLeftIcon,
    BellIcon, 
    EnvelopeClosedIcon, 
    Pencil2Icon, 
    RowsIcon 
} from "@radix-ui/react-icons"
import { Label } from "@/components/ui/label"
import { Suspense } from "react"
import MiniLoader from "@/components/MiniLoader"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function Profile() {
    const {
        user, 
        userId, 
        userName, 
        photoURL, 
        email
    } = useAuth()

    return (
        <div className="h-full w-full bg-slate-50 p-10">
            <div className="flex justify-around items-center bg-white drop-shadow p-1 rounded opacity-95">
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
            <div className="p-4 border-t border-b my-8 flex justify-around">
                <div>
                    <h1 className="font-semibold text-gray-600 text-lg">Account Information</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <p className="flex items-center text-sm text-gray-500 hover:text-sky-400 hover:cursor-pointer transition">
                                <Pencil2Icon className="mr-1"/>Edit your information
                            </p>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <h1 className="font-semibold text-gray-600 text-md">Username:</h1>
                    <Suspense fallback={<MiniLoader/>}>
                        <UsersName userName={userName}/>
                    </Suspense>
                </div>
                <div>
                    <h1 className="font-semibold text-gray-600 text-md">Email:</h1>
                    <Suspense fallback={<MiniLoader/>}>
                        <UsersEmail email={email}/>
                    </Suspense>
                </div>           
            </div>
            <Link href={'/home'} 
                className={`hover:text-sky-500 transition ${buttonVariants({variant: 'outline'})}`}>
                    <ArrowLeftIcon className="mx-1"/>Home
            </Link>
        </div>
    )
}

interface ComponentProps {
    email?: string
    userName?: string
}

const UsersEmail = ({email}:ComponentProps) => {
   return (
    <p className="flex items-center text-sm text-gray-500 hover:text-sky-400 hover:cursor-pointer transition">
        {email}
    </p>
   ) 
}

const UsersName = ({userName}: ComponentProps) => {
    return (
     <p className="flex items-center text-sm text-gray-500 hover:text-sky-400 hover:cursor-pointer transition">
         {userName}
     </p>
    ) 
 }