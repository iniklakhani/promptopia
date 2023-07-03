'use client'
import { useState, useEffect, use } from 'react'
import PromptCard from '@/components/PromptCard'
import { Input } from '@/ui-shadcn/components/ui/input'
import { useRouter } from 'next/navigation'

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <>
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleEdit={() => handleEdit && handleEdit(prompt)}
          handleDelete={() => handleDelete && handleDelete(prompt)}
        />
      ))}
    </>
  )
}

const Feed = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = async (e) => {
    e.preventDefault()
    setSearchText(e.target.value)

    if (e.target.value !== '') {
      const filteredPrompts = prompts.filter((prompt) => {
        const promptText = prompt.prompt.toLowerCase()
        const tagText = prompt.tag.toLowerCase()
        const usernameText = prompt.creator.username.toLowerCase()

        return (
          promptText.includes(e.target.value.toLowerCase()) ||
          tagText.includes(e.target.value.toLowerCase()) ||
          usernameText.includes(e.target.value.toLowerCase())
        )
      })

      setPrompts(filteredPrompts)
    } else {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPrompts(data)
    }
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPrompts(data)
    }

    fetchPrompts()
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
    <>
      <div className="feed">
        <form action="" className="relative w-full flex-center">
          <Input
            type="email"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="grid grid-cols-3 gap-4 py-20 pt-10">
        <PromptCardList data={prompts} handleTagClick={() => {}} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </>
  )
}

export default Feed
