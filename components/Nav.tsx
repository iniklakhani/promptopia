'use client'

import { Button, buttonVariants } from '@/ui-shadcn/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, signIn, useSession, getProviders } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui-shadcn/components/ui/avatar'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui-shadcn/components/ui/dropdown-menu'

const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            width={50}
            height={50}
            alt="Promptopia"
            className="object-contain mt-3 mb-3 mr-3"
          />
          <p className="logo_text">Promptopia</p>
        </Link>

        {/* Desktop navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5 items-center">
              <Link href="/create-prompt" className={buttonVariants({ variant: 'default' })}>
                Create Prompt
              </Link>

              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>

              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>{session?.user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <Button onClick={() => signIn(provider.id)} variant="outline" key={provider.name}>
                      Sign In with {provider.name}
                    </Button>
                  )
                })}
            </>
          )}
        </div>

        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>{session?.user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/create-prompt">
                    <DropdownMenuItem>Create Prompt</DropdownMenuItem>
                  </Link>
                  <Link href="/create-prompt">
                    <DropdownMenuItem>My Prompts</DropdownMenuItem>
                  </Link>
                  <Link href="">
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <Button onClick={() => signIn(provider.id)} variant="outline" key={provider.name}>
                      Sign In with {provider.name}
                    </Button>
                  )
                })}
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav
