import Providers from "@/components/Providers";
import React from "react";

export default function ProfileLayout({ children }: {
    children: React.ReactNode }) {

    return (
        <div>
            <Providers>
               {children}
            </Providers>
        </div>
    )
}