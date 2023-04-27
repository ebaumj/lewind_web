<template>
  <Transition name="background" appear>
    <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-75"></div>
  </Transition>
  <Transition name="dialog" appear>
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
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
                <h3 class="text-2xl font-semibold leading-6 text-gray-900 text-center">{{ title }}</h3>
                <div class="mt-2">
                  <p class="text-lg text-gray-500">{{ message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-6 justify-center">
            <button @click="$emit('close-modal')" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark_red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red my-3 w-36">Bring me back</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  const { title, message, show } = defineProps(['title', 'message', 'show'])
  const emit = defineEmits(['close-modal']);
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