<script lang='ts'>
  import type { Post, Prisma, User } from '@prisma/client'
  import { postSchema, type PostSchema } from '$lib/schemas/post'
  import {
    type Infer,
    superForm,
    type SuperValidated,
  } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'

  const { data }: {
    data: {
      form: SuperValidated<Infer<PostSchema>>
      latestPost: Prisma.PostGetPayload<{
        include: {
          user: true
        }
      }> | null
    }
  } = $props()

  const form = superForm(data.form, {
    validators: zodClient(postSchema),
  })

  const { form: formData, enhance } = form
</script>

<form method='POST' use:enhance class='vbox gap-4'>
  <input bind:value={$formData.content} type='text' id='content' name='content' placeholder='Write something...' required class='input' />
  <button class='btn'>Post</button>
</form>

{#if data.latestPost}
  <hgroup class='vbox gap-4'>
    <h2>Latest post:</h2>
    <div class='vbox gap-2 rounded bg-light-7 p-4 text-left text-pretty'>
      <p>{data.latestPost.content}</p>
      <p class='text-dark/60 underline'>by {data.latestPost.user.name}</p>
    </div>
  </hgroup>
{/if}
