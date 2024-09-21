<script>
  import '../app.css';

  const { children } = $props();
</script>

<div class="flex h-screen items-center justify-center">
  {@render children()}
</div>
