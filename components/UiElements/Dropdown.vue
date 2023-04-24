<template>
  <div class="relative mt-2">
    <button type="button" @click="selected = !selected" class="relative w-full max-w-lg cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-sm md:text-lg sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      <span class="flex items-center">
        <span class="ml-3 block truncate">{{ text }}</span>
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>
    <Transition name="dropdown-items" mode="out-in">
        <ul v-show="selected" class="absolute z-10 mt-1 max-h-56 w-full max-w-lg overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 text-sm md:text-lg" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
          <li v-for="(item, index) in options" :key="index" class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-rose_light hover:text-white" id="listbox-option-0" role="option" @click="indexChanged(index)">
              <div class="flex items-center">
                <span class="font-normal ml-3 block truncate">{{ item }}</span>
              </div>
              <span v-show="index === selectedIndex" class="text-rose_red absolute inset-y-0 right-0 flex items-center pr-4">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
              </span>
          </li>
        </ul>
    </Transition>
  </div>
</template>

<script setup>
const { startIndex, options } = defineProps(['startIndex', 'options'])
const text = ref(null)
var selectedIndex = startIndex
text.value = options[selectedIndex]
const selected = ref(false)
const emit = defineEmits(['index-changed']);
const indexChanged = (newIndex) => {
  emit('index-changed', newIndex)
  selectedIndex = newIndex
  text.value = options[newIndex]
  selected.value = false
}
</script>

<style scoped>
.dropdown-items-enter-active {
    transition: 100ms ease-in;
}
.dropdown-items-enter-from {
    opacity: 0;
}
.dropdown-items-enter-to {
    opacity: 100;
}
.dropdown-items-leave-active {
    transition: 100ms ease-in;
}
.dropdown-items-leave-from {
    opacity: 100;
}
.dropdown-items-leave-to {
    opacity: 0;
}
</style>