<script>
  import { signIn } from '@auth/sveltekit/client'
</script>

<div class='vbox gap-10 px-10 text-center'>
  <div class='vbox gap-5'>
    <button class='btn' onclick={() => signIn('discord')}>Login</button>
  </div>
</div>
