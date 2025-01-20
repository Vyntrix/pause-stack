import type { Actions, PageServerLoad } from './$types'
import { postSchema } from '$lib/schemas/post'
import { prisma } from '$lib/server/prisma'
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export const load: PageServerLoad = async () => {
  const latestPost = await prisma.post.findFirst({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    latestPost,
    form: await superValidate(zod(postSchema)),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(postSchema))

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const session = await event.locals.auth()

    if (!session || !session.user?.id) {
      return fail(402, {
        form,
      })
    }

    try {
      const post = await prisma.post.create({
        data: {
          content: form.data.content,
          userId: session.user?.id,
        },
      })

      return { post, form }
    }
    catch (error) {
      console.error(error)
      return fail(500, {
        form,
        error,
      })
    }
  },
}
