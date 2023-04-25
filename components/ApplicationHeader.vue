<template>
    <nav class="bg-rose_dark">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/">
              <div class="flex-shrink-0">
                <img class="h-14 w-14" src="~/assets/images/icon.png" alt="Your Company">
              </div>
            </NuxtLink>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4 text-rose_very_light">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <NuxtLink to="/" class="hover:text-rose_red rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">home</i>Home</NuxtLink>
                <NuxtLink to="/stationsMap" class="hover:text-rose_red rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">map</i>Stations Map</NuxtLink>
                <NuxtLink to="/about" class="hover:text-rose_red rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">info</i>About</NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button @click="toggleProfileMenu" type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                  </button>
                </div>

                <Transition name="profile-menu" mode="out-in">
                  <div v-show="profileMenuActive" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center rounded-md bg-rose_dark p-2 text-rose_light hover:bg-rose_semi_dark hover:text-rose_red focus:outline-none " aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg v-show="!mobileMenuActive" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg v-show="mobileMenuActive" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
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
          <NuxtLink to="/" class="hover:text-rose_red block rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">home</i>Home</NuxtLink>
          <NuxtLink to="/stationsMap" class="hover:text-rose_red block rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">map</i>Stations Map</NuxtLink>
          <NuxtLink to="/about" class="hover:text-rose_red block rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">info</i>About</NuxtLink>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Tom Cook</div>
              <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
            </div>
            <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2 text-rose_very_light">
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">Your Profile</a>

            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">Settings</a>

            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white">Sign out</a>
          </div>
        </div>
      </div>
    </nav>
</template>

<script setup>
const mobileMenuActive = ref(false)
const profileMenuActive = ref(false)
useNuxtApp().$setPageTranition(() => { 
  mobileMenuActive.value = false
  profileMenuActive.value = false
 })
const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}
const toggleProfileMenu = () => {
  profileMenuActive.value = !profileMenuActive.value
}
</script>

<style scoped>
.router-link-exact-active {
    color: #C80000; /* rose_red */
    background-color: #2d4053; /* rose_semi_dark */
}

/*
Dropdown menu, show/hide based on menu state.
  Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
  Leaving: "transition ease-in duration-75"
    From: "transform opacity-100 scale-100"
    To: "transform opacity-0 scale-95"
*/
.profile-menu-enter-from {
  transform: opacity-0 scale-95
}
.profile-menu-enter-to {
  transform: opacity-100 scale-100
}
.profile-menu-enter-active {
  transition: ease-out duration-100
}
.profile-menu-leave-from {
  transform: opacity-100 scale-100
}
.profile-menu-leave-to {
  transform: opacity-0 scale-95
}
.profile-menu-leave-active {
  transition: ease-in duration-75
}
</style>