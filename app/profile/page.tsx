'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from '@/components/Profile'

const MyProfile = () => {
  const router = useRouter()
  const { data: session, loading } = useSession()
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/prompts`)
      const data = await res.json()

      setPrompts(data)
    }

    if (session?.user?.id) fetchPrompts()
  }, [])

  const handleEdit = (prompt) => {
    router.push(`/update-prompt/${prompt._id}`)
  }

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (!hasConfirmed) return

    try {
      await fetch(`/api/prompt/${prompt._id.toString()}`, {
        method: 'DELETE',
      })

      setPrompts((prev) => prev.filter((p) => p._id !== prompt._id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
