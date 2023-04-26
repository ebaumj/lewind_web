<template>
    <div class="justify-center flex">
      <div class="md:text-4xl text-2xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl">
        <div class="flex justify-center items-center w-full"><img src="~/assets/images/icon.png" class="justify-center flex max-h-16 mr-6"/><h1 class="flex justify-center font-semibold">Le Wind</h1></div>
        <p class="text-lg flex justify-center md:py-6 py-4">Created by: Janis M. Baumann</p>
        <h2 class="flex justify-center font-semibold mt-4">Contact</h2>
        <p class="text-sm mb-4 text-center md:mt-2">Got a technical issue? Want to send feedback about a feature? Let me know.</p>
        <form class="md:space-y-6 space-y-4" @submit.prevent="submit(formData)">
          <div>
            <label for="email" class="block mb-1 text-sm">Your email</label>
            <input v-model="formData.email" type="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@lewind.ch" required>
          </div>
          <div>
            <label for="subject" class="block mb-1 text-sm">Subject</label>
            <input v-model="formData.subject" type="text" name="subject" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Let me know how I can help you" required>
          </div>
          <div>
            <label for="message" class="block mb-1 text-sm">Your message</label>
            <textarea v-model="formData.message" name="message" rows="6" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Leave a comment.." required />
          </div>
          <button type="submit" class="text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-2 md:px-4 px-2 border rounded shadow text-lg items-center justify-center"><i class="material-icons mr-2 mb-0 pb-0">mail</i>Send Message</button>
        </form>
        <div class="flex justify-center mt-12 text-lg"><a href='https://play.google.com/store/apps/details?id=com.baumannsw.lewind&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img class="h-16" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a></div>
      </div>
      <BaseModal v-show="modalShow" @close-modal="modalShow = false" :title="modalTitle" :message="modalMessage" />
    </div>
</template>

<script setup>
definePageMeta({ authRequired: false })

const formData = reactive({
  email: "",
  subject: "",
  message: ""
})

const modalShow = ref(false)
const modalMessage = ref("")
const modalTitle = ref("")

const submit = async (form) => {
  await $fetch('/api/contact/', {
    method: 'POST',
    body: form
  }).then(() => {
    formData.email = ""
    formData.subject = ""
    formData.message = ""
    modalMessage.value = "Thank you for your Message!"
    modalTitle.value = "Success"
    modalShow.value = true
  }).catch(() => {
    modalMessage.value = "Your message couldn't be delivered successfully. Please try again!"
    modalTitle.value = "Something went wrong..."
    modalShow.value = true
  })
}
</script>