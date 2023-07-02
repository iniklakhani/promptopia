import { Button } from '@/ui-shadcn/components/ui/button'
import { Textarea } from '@/ui-shadcn/components/ui/textarea'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form as UIForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui-shadcn/components/ui/form'
import { Input } from '@/ui-shadcn/components/ui/input'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  // prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters.' }),
  // tag: z.string().min(3, { message: 'Tag must be at least 3 characters.' }),
})

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      tag: '',
    },
  })

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <UIForm {...form}>
        <form
          // onSubmit={form.handleSubmit((e) => console.log(e))}
          onSubmit={handleSubmit}
          className="space-y-8 mt-10 w-full max-w-2xl glassmorphism"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-gray-700">Your AI Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      setPost({
                        ...post,
                        prompt: e.target.value,
                      })
                    }}
                    placeholder="What if the world was flat?"
                    value={post.prompt}
                    required
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-gray-700">Tag</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      setPost({
                        ...post,
                        tag: e.target.value,
                      })
                    }}
                    placeholder="e.g. #scifi #fantasy #horror"
                    value={post.tag}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Button type="submit">{submitting ? `${type}..` : type}</Button>
            <Link href="/" className="ml-4 text-gray-700">
              Cancel
            </Link>
          </div>
        </form>
      </UIForm>
    </section>
  )
}

export default Form
