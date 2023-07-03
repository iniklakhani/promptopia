'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Profile from '@/components/Profile'
import { Input } from '@/ui-shadcn/components/ui/input'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [prompts, setPrompts] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/prompts`)
      const data = await res.json()

      setPrompts(data)
    }

    if (session?.user?.id) fetchPrompts()
  }, [session])

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

  const handleSearchChange = async (e) => {
    e.preventDefault()
    setSearchText(e.target.value)

    if (e.target.value !== '') {
      const filteredPrompts = prompts.filter((prompt) => {
        const promptText = prompt.prompt.toLowerCase()
        const tagText = prompt.tag.toLowerCase()

        return promptText.includes(e.target.value.toLowerCase()) || tagText.includes(e.target.value.toLowerCase())
      })

      setPrompts(filteredPrompts)
    } else {
      const res = await fetch(`/api/users/${session?.user?.id}/prompts`)
      const data = await res.json()

      setPrompts(data)
    }
  }

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />
    </>
  )
}

export default MyProfile
