<script lang='ts'>
  import LatestPost from '$lib/components/LatestPost.svelte'
  import { signIn, signOut } from '@auth/sveltekit/client'

  const { data } = $props()

  let email = $state('')
  let loading = $state(false)

  async function send_email(event: SubmitEvent) {
    event.preventDefault()
    loading = true
    await signIn('nodemailer', { email, redirect: false })
    loading = false
  }
</script>

<div class='vbox gap-10 px-10 text-center'>
  <div class='vbox gap-5'>
    {#if data.session}
      <button class='btn' onclick={() => signOut()}>Sign Out</button>
      <LatestPost {data} />
    {:else}
      <form onsubmit={e => send_email(e)} class='vbox gap-5'>
        <input required class='input' placeholder='Email' type='email' bind:value={email} />
        <button class='btn' onclick={() => send_email} disabled={!email}>{loading ? 'Sending...' : 'Send magic link'}</button>
      </form>
      <button class='btn' onclick={() => signIn('discord')}>Login with Discord</button>
    {/if}
  </div>
</div>
