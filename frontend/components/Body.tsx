
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link"

export default function Body() {
    return (
      <div className="h-dvh w-full md:max-w-5xl mx-auto p-4 py-10">
        <div className="grid md:grid-cols-2 h-5/6 p-2">
            <div className="p-2 grid">
                <h2 className="flex items-center space-x-2">
                    <span >Discover</span><span>Share</span><span>Connect</span>
                </h2>
                <h1 className="font-extrabold text-3xl tracking-tight text-balance ">Welcome to <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">MovieConnect</span></h1>
                <p className="text-balance">Your ultimate social platform for movie enthusiasts. 
                    Create and share your personalized movie watchlists, read and write reviews, 
                    and get recommendations from friends and fellow movie lovers.
                    Dive into a community where your love for movies finds its perfect match.</p>
                <Link href={'/auth/login'} className="flex items-center hover:scale-105 transition">
                    Get Started
                    <span className="mx-6"><ArrowRightIcon/></span>
                </Link>
            </div>
            <div className="overflow-hidden">
                <Image 
                    src={'/movie-graphic.jpg'}
                    alt="landing image"
                    width={200}
                    height={100}
                    quality={100}
                    priority
                    className="object-cover w-full overflow-hidden"
                />
            </div>
        </div>
        
      </div>
    )
}