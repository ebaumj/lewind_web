<template>
      <Transition name="background" appear>
        <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-75"></div>
      </Transition>
      <Transition name="dialog" appear>
        <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" role="dialog">
          <div class="flex min-h-full justify-center p-8 text-center items-center">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl w-full md:max-w-xl">
              <div class="bg-white px-4 md:pt-5 pt-6 pb-2">
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
              <div class="px-4 pb-2 text-sm text-left underline text-rose_semi_dark"><span class="cursor-pointer" @click="$emit('reset-password', formData.email)">I fortgot my password</span></div>
              <div class="px-4 pb-6 justify-center">
                <button @click="$emit('login', formData.email, formData.password)" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark_red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red mt-3 w-36">Log In</button>
                <button @click="$emit('create-account', formData.email, formData.password)" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red my-2 w-36">Create Account</button>
                <button @click="$emit('close-modal')" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red mb-0 w-36">Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </Transition>
</template>
  
<script setup>
const formData = reactive({
  email: "",
  password: "",
})
const { show } = defineProps(['show'])
const emit = defineEmits(['login', 'create-account', 'close-modal', 'reset-password']);
</script>
  
<style scoped>
/* Dialog */
.dialog-enter-active,
.dialog-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(200%);
}

/* Background */
.background-enter-active,
.background-leave-active {
  transition: opacity .4s linear;
}

.background-enter-from,
.background-leave-to {
  opacity: 0;
}
</style>