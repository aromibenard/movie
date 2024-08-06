'use server'

import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"

export async function addToWatchlist(formData: FormData) {
   'use server'
   const userId = formData.get('userId') as string
   const movie = JSON.parse(formData.get('movie') as string)
    
    try {
        await addDoc(collection(db, 'users', userId, 'watchlist'), movie)
        return { success: true }
    } catch (error) {
        console.error('Error adding movie to watchlist')
        return { success: false, error: 'Failed to add movie'}
    }
}