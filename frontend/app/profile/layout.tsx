import ProfileSideBar from "@/components/ProfileSideBar";
import Providers from "@/components/Providers";
import React from "react";

export default function ProfileLayout({ children }: {
    children: React.ReactNode }) {

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <Providers>
                <div className="w-full flex-none md:w-64">
                    <ProfileSideBar />
                </div>
                <div className="flex-grow md:overflow-y-auto">    
                    {children}          
                </div>
            </Providers>
        </div>
    )
}