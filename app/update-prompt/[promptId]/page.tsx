'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Form from '@/components/Form'

const EditPrompt = () => {
  const params = useParams()
  console.log(params)
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${params.promptId}`)
      const data = await res.json()

      setPost(data)
    }

    if (params.promptId) getPromptDetails()
  }, [params.promptId])

  const editPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!params.promptId) return

    try {
      const response = await fetch(`/api/prompt/${params.promptId}`, {
        method: 'PATCH',
        headers: {},
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt} />
}

export default EditPrompt
