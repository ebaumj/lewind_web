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
                <NuxtLink to="/" class="hover:bg-rose_semi_dark rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">home</i>Home</NuxtLink>
                <NuxtLink to="/stationsMap" class="hover:bg-rose_semi_dark rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">map</i>Stations Map</NuxtLink>
                <NuxtLink to="/about" class="hover:bg-rose_semi_dark rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">info</i>About</NuxtLink>
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
                    <img class="h-10 w-10 rounded-full" :key="displayUsername" :src="`https://ui-avatars.com/api/?name=${displayUsername}&size=512&background=C80000&color=c5ccd3&bold=true&length=1&font-size=0.8`" alt="">
                  </button>
                </div>

                <Transition name="profile-menu" mode="out-in">
                  <div v-show="profileMenuActive" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <NuxtLink to="/profile" v-show="isLoggedIn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-rose_very_light" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</NuxtLink>
                    <NuxtLink to="/settings" v-show="isLoggedIn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-rose_very_light" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</NuxtLink>
                    <button v-show="isLoggedIn" @click="logout(); profileMenuActive = false" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose_very_light" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</button>
                    <button v-show="!isLoggedIn" @click="showLoginModal = true; profileMenuActive = false" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose_very_light" role="menuitem" tabindex="-1" id="user-menu-item-2">Log in</button>
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
          <NuxtLink to="/" class="hover:bg-rose_semi_dark block rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">home</i>Home</NuxtLink>
          <NuxtLink to="/stationsMap" class="hover:bg-rose_semi_dark block rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">map</i>Stations Map</NuxtLink>
          <NuxtLink to="/about" class="hover:bg-rose_semi_dark rounded-md px-3 py-2 text-xl font-medium flex items-center"><i class="material-icons mr-2">info</i>About</NuxtLink>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3 text-rose_very_light">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe&size=256" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">Tom Cook</div>
              <div class="text-sm font-medium leading-none">tom@example.com</div>
            </div>
            <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2 text-rose_very_light">
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-rose_semi_dark">Your Profile</a>

            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-rose_semi_dark">Settings</a>

            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium hover:bg-rose_semi_dark">Sign out</a>
          </div>
        </div>
      </div>
    </nav>
    <LoginModal v-show="showLoginModal" @close-modal="showLoginModal = false" @login="login" @create-account="createAccount" />
    <BaseModal v-show="baseModalShow" @close-modal="baseModalShow = false" :title="baseModalTitle" :message="baseModalMessage" />
</template>

<script setup>
const isLoggedIn = ref(await useGetUser() !== null)
const displayUsername = ref("⎘")
const showLoginModal = ref(false)

const baseModalShow = ref(false)
const baseModalMessage = ref("")
const baseModalTitle = ref("")

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

const login = async (email, password) => {
  const login = await useLogin(email, password)
  showLoginModal.value = false
  if(login.result) {
    isLoggedIn.value = true
    const user = await useGetUser()
    displayUsername.value = user.email.substring(0, 1)
  }
  else {
    baseModalMessage.value = login.response
    baseModalTitle.value = "Login Failed"
    baseModalShow.value = true
  }
}

const createAccount = async (email, password) => {
  const createAccount = await useCreateAccount(email, password)
  showLoginModal.value = false
  if(createAccount.result) {
    baseModalMessage.value = "Your Account was successfully created and you can now log in"
    baseModalTitle.value = "Account Created"
    baseModalShow.value = true
  }
  else {
    baseModalMessage.value = createAccount.response
    baseModalTitle.value = "Create Account failed"
    baseModalShow.value = true
  }
}

const logout = async () => {
  const logout = await useLogout()
  if(logout.result) {
    isLoggedIn.value = false
    displayUsername.value = "⎘"
  }
  else {
    baseModalMessage.value = createAccount.response
    baseModalTitle.value = "Logout failed"
    baseModalShow.value = true
  }
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