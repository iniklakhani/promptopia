import React from 'react'
import PromptCard from '@/components/PromptCard'
import { Input } from '@/ui-shadcn/components/ui/input'

const Profile = ({ name, desc, data, handleEdit, handleDelete, searchText, handleSearchChange }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <form action="" className="relative w-full pt-10 pb-7 w-[350px]">
        <Input
          type="email"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <div className="grid grid-cols-3 gap-4 pb-20">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
