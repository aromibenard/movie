'use client'

import Body from "@/components/Body";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/home')
      } else {
        router.push('/')
      }
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Body />
    </div>
  )
}
