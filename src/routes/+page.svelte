<script>
  import LatestPost from '$lib/components/LatestPost.svelte'
  import { signIn, signOut } from '@auth/sveltekit/client'

  const { data } = $props()
</script>

<div class='vbox gap-10 px-10 text-center'>
  <div class='vbox gap-5'>
    {#if data.session}
      <button class='btn' onclick={() => signOut()}>Sign Out</button>
      <LatestPost {data} />
    {:else}
      <button class='btn' onclick={() => signIn('discord')}>Login</button>
    {/if}
  </div>
</div>
