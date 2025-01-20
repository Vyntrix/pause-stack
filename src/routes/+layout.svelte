<script lang='ts'>
  import 'uno.css'
  import '@unocss/reset/tailwind.css'

  const { children } = $props()
</script>

<div class='text-center-5 mx-auto min-h-screen vpack gap-10 bg-light-1 p-10 text-dark font-sans antialiased'>
  <header class='mx-auto max-w-screen-sm text-center'>
    <h1 class='text-5xl font-400 tracking-tighter'><span class='text-rose-5 font-800'>PAUSE</span>STACK</h1>
    <p class='text-2xl text-dark/60 font-400 tracking-tighter'>
      opinionated tech stack
    </p>
  </header>
  <main>
    {@render children()}
  </main>
</div>
