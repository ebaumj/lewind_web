<template>
    <div class="relative z-10" role="dialog">
      <div class="fixed inset-0 bg-black bg-opacity-75"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full justify-center p-8 text-center items-center">
          <!--
            Modal panel, show/hide based on modal state.
  
            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div class="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl w-full md:max-w-xl">
            <div class="bg-white px-4 md:pt-5 py-6 pb-4">
              <div class="justify-center">
                <div class="mt-3 text-center">
                    <h3 class="text-2xl font-semibold leading-6 text-gray-900 text-center">Login</h3>
                    <div class="mt-4">
                    </div>
                    <div>
                        <label for="email" class="block mb-1 text-sm text-left">Email</label>
                        <input v-model="formData.email" type="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@lewind.ch" required>
                        <label for="password" class="block mb-1 text-sm text-left mt-4">Password</label>
                        <input v-model="formData.password" type="password" name="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@lewind.ch" required>
                    </div>
                </div>
              </div>
            </div>
            <div class="px-4 pb-6 justify-center">
              <button @click="$emit('login', formData.email, formData.password)" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark_red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red mt-3 w-36">Log In</button>
              <button @click="$emit('create-account', formData.email, formData.password)" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red my-2 w-36">Create Account</button>
              <button @click="$emit('close-modal')" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red mb-0 w-36">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
const formData = reactive({
  email: "",
  password: "",
})
</script>
  
  <style scoped>
    
  </style>