<script lang="ts">
  let { data } = $props();
  let count = $state(data.count);

  async function get() {
    count = (await (await fetch('/count')).json()).value;
  }

  async function set(value: number) {
    await fetch(`/count/${value}`, { method: 'PUT' });
  }

  async function update(value: number) {
    count = (await (await fetch(`/count/${value}`, { method: 'PATCH' })).json())
      .value;
  }

  async function save() {
    await set(updated);
    count = updated;
    open = false;
  }

  let open = $state(false);
  let updated = $state(0);
</script>

<svelte:window
  onkeydown={async (e) => {
    if (e.key == 'ArrowLeft') await update(-1);
    if (e.key == 'ArrowRight') await update(+1);
  }}
/>

<main class="flex flex-row">
  <button
    onclick={async () => await update(-1)}
    class="rounded-[30%] p-2 text-3xl">−</button
  >
  <output class="p-2 text-4xl">{count}</output>
  <button
    onclick={async () => await update(+1)}
    class="rounded-[30%] p-2 text-3xl">+</button
  >
  <button
    class="p-2"
    onclick={() => {
      open = !open;
      if (open) updated = count;
    }}>↵</button
  >

  <dialog {open} class="absolute rounded border-[1px] border-black p-10">
    <div class="flex">
      <input
        class="border-[1px]"
        type="number"
        min="1"
        autofocus
        bind:value={updated}
        onkeyup={async (e) => {
          if (e.key == 'Escape') open = false;
          if (e.key == 'Enter') await save();
        }}
      />
      <i class="w-2"></i>
      <button
        class="rounded-1xl bg-blue-200 px-2"
        type="submit"
        onclick={async () => await save()}
      >
        ✓
      </button>
      <button
        class="absolute -right-0 -top-3 z-10 bg-white"
        type="submit"
        onclick={() => (open = false)}
      >
        ⊗
      </button>
    </div>
  </dialog>
</main>
