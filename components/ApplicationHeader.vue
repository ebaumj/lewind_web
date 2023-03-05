<template>
    <nav class="bg-rose_dark">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/">
              <div class="flex-shrink-0">
                <img class="h-10 w-10" src="~/assets/images/icon.png" alt="Your Company">
              </div>
            </NuxtLink>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4 text-rose_very_light">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <NuxtLink to="/" class="hover:text-rose_red rounded-md px-3 py-2 text-sm font-medium">Home</NuxtLink>
                <NuxtLink to="/stationsMap" class="hover:text-rose_red rounded-md px-3 py-2 text-sm font-medium">Stations Map</NuxtLink>
                <NuxtLink to="/about" class="hover:text-rose_red rounded-md px-3 py-2 text-sm font-medium">About</NuxtLink>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center rounded-md bg-rose_dark p-2 text-rose_light hover:bg-rose_semi_dark hover:text-rose_red focus:outline-none focus:ring-2 focus:ring-rose_semi_dark focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-show="mobileMenuActive" class="md:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3 text-rose_very_light">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <NuxtLink to="/" class="hover:text-rose_red block rounded-md px-3 py-2 text-sm font-medium">Home</NuxtLink>
          <NuxtLink to="/stationsMap" class="hover:text-rose_red block rounded-md px-3 py-2 text-sm font-medium">Stations Map</NuxtLink>
          <NuxtLink to="/about" class="block hover:text-rose_red rounded-md px-3 py-2 text-sm font-medium">About</NuxtLink>
        </div>
      </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
const mobileMenuActive = ref({ type: Boolean, default: false })
mobileMenuActive.value = false
const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}
</script>

<style scoped>
.router-link-exact-active {
    /*color: #C80000; /* rose_red */
    background-color: #2d4053; /* rose_semi_dark */
}
</style>