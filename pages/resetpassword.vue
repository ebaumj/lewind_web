<template>
    <div class="justify-center flex">
        <div class="md:text-4xl text-2xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl">
            <div class="flex justify-center items-center w-full"><h1 class="flex justify-center font-semibold">Reset Your Password</h1></div>
            <form class="md:space-y-2 space-y-4" @submit.prevent="resetPassword(passwordFormData)">
                <div>
                    <label for="password_new" class="block mb-1 text-sm">New Password</label>
                    <input v-model="passwordFormData.password_new" type="password" name="password_new" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div>
                    <label for="password_new_repeat" class="block mb-1 text-sm">Repeat new Password</label>
                    <input v-model="passwordFormData.password_new_repeat" type="password" name="password_new_repeat" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div class="pt-2"><button type="submit" class="text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-2 md:px-4 px-2 border rounded shadow text-lg items-center justify-center">Reset Password</button></div>
            </form>
        </div>
        <BaseModal :show="modalShow" @close-modal="closeModal" :title="modalTitle" :message="modalMessage" />
    </div>
</template>

<script setup>
definePageMeta({ middleware: ['resetpassword'] })
const modalShow = ref(false)
const modalMessage = ref("")
const modalTitle = ref("")
const passwordResetRequested = ref(false)

const passwordFormData = reactive({
  password_new: "",
  password_new_repeat: ""
})

const closeModal = () => {
    modalShow.value = false
    if(passwordResetRequested.value)
        navigateTo("/")
}

const resetPassword = async (form) => {
    modalTitle.value = "Reset password failed"
    if(form.password_new === form.password_new_repeat) {
        const action = await useAuthentification().changePasswordFromReset(form.password_new)
        if(action.result) {
            modalTitle.value = "Password changed successfully"
            modalMessage.value = "You can log in with your new password from now"
            passwordResetRequested.value = true
        }
        else
            modalMessage.value = action.response
    }
    else {
        modalMessage.value = "New passwords do not match"
    }
    modalShow.value = true
}
</script>

<style scoped>

</style>