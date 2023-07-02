'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui-shadcn/components/ui/avatar'
import { Button } from '@/ui-shadcn/components/ui/button'
import { Separator } from '@/ui-shadcn/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui-shadcn/components/ui/card'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('Copy')
  const { data: session } = useSession()
  const pathName = usePathname()

  const handleCopy = () => {
    setCopied('Copied')
    setTimeout(() => {
      setCopied('Copy')
    }, 3000)
  }

  return (
    <Card className="w-[350px] mt-16" key={prompt.id}>
      <CardHeader className="pb-2">
        <CardDescription className="cursor-pointer" onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
          #{prompt.tag}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-gray-700 pb-3">{prompt.prompt}</CardContent>
      <Separator className="mb-4" />
      <CardFooter>
        <Link href="/profile">
          <Avatar>
            <AvatarImage src={prompt.creator.image} alt={prompt?.creator?.username} />
            <AvatarFallback>{prompt?.creator?.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex justify-center flex-col">
          <h3 className="font-semibold text-gray-700 pl-2 text-sm">
            <Link href="/profile">{prompt?.creator?.username}</Link>
          </h3>
          {session?.user?.id === prompt?.creator?._id && (
            <p className="text-gray-700 pl-2 text-sm gap-1 flex">
              <span className="hover:underline cursor-pointer" onClick={handleEdit}>
                edit
              </span>
              |
              <span className="hover:underline cursor-pointer" onClick={handleDelete}>
                delete
              </span>
            </p>
          )}
        </div>
        <CopyToClipboard text={prompt.prompt} onCopy={handleCopy}>
          <Button variant="outline" className="ml-auto">
            {copied}
          </Button>
        </CopyToClipboard>
      </CardFooter>
    </Card>
  )
}

export default PromptCard
