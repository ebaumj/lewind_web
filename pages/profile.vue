<template>
    <div class="justify-center flex">
        <div class="md:text-4xl text-2xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl">
            <div class="flex justify-center items-center w-full"><h1 class="flex justify-center font-semibold">Your Account</h1></div>
            <p class="text-lg flex justify-center md:py-6 py-4">{{ email }}</p>
            <!--<form class="pb-10 md:space-y-2 space-y-4" @submit.prevent="changeName(nameFormData)">
                <div>
                    <label for="first_name" class="block mb-1 text-sm">First Name</label>
                    <input v-model="nameFormData.first_name" type="text" name="first_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Average">
                </div>
                <div>
                    <label for="last_name" class="block mb-1 text-sm">Last Name</label>
                    <input v-model="nameFormData.last_name" type="text" name="last_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Joe">
                </div>
                <div class="pt-2"><button type="submit" class="text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-2 md:px-4 px-2 border rounded shadow text-lg items-center justify-center">Change Name</button></div>
            </form>-->
            <form class="md:space-y-2 space-y-4" @submit.prevent="changePassword(passwordFormData)">
                <div>
                    <label for="password_old" class="block mb-1 text-sm">Old Password</label>
                    <input v-model="passwordFormData.password_old" type="password" name="password_old" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div>
                    <label for="password_new" class="block mb-1 text-sm">New Password</label>
                    <input v-model="passwordFormData.password_new" type="password" name="password_new" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div>
                    <label for="password_new_repeat" class="block mb-1 text-sm">Repeat new Password</label>
                    <input v-model="passwordFormData.password_new_repeat" type="password" name="password_new_repeat" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div class="pt-2"><button type="submit" class="text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-2 md:px-4 px-2 border rounded shadow text-lg items-center justify-center">Change Password</button></div>
            </form>
            <form class="md:space-y-2 space-y-4" @submit.prevent="deleteAccount(deleteAccountData)">
                <div class="pt-10">
                    <label for="password" class="block mb-1 text-sm">Type in your password</label>
                    <input v-model="deleteAccountData.password" type="password" name="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="Password" required>
                </div>
                <div class="pt-2"><button @click="deleteAccount" class="text-lg flex hover:bg-rose_dark_red bg-rose_red text-white py-2 md:px-4 px-2 border rounded shadow text-lg items-center justify-center">Delete Account</button></div>
            </form>
        </div>
        <BaseModal :show="modalShow" @close-modal="closeModal" :title="modalTitle" :message="modalMessage" />
    </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })
const modalShow = ref(false)
const modalMessage = ref("")
const modalTitle = ref("")
const email = ref("")
const deleteAction = ref(false)

/*const nameFormData = reactive({
  first_name: "",
  last_name: ""
})*/
const passwordFormData = reactive({
  password_old: "",
  password_new: "",
  password_new_repeat: ""
})
const deleteAccountData = reactive({
    password: ""
})

/*const changeName = async (form) => {

}*/

onMounted(() => {
    email.value = useAuthentification().getUser()?.email
})

const closeModal = () => {
    modalShow.value = false
    if(deleteAction.value)
        navigateTo("/")
}

const changePassword = async (form) => {
    modalTitle.value = "Change password failed"
    if(form.password_new === form.password_new_repeat) {
        const action = await useAuthentification().changePassword(form.password_old, form.password_new)
        if(action.result) {
            form.password_old = ""
            form.password_new = ""
            form.password_new_repeat = ""
            modalTitle.value = "Password changed successfully"
            modalMessage.value = "You can log in with your new password from now"
        }
        else
            modalMessage.value = action.response
    }
    else {
        modalMessage.value = "New passwords do not match"
    }
    modalShow.value = true
}

const deleteAccount = async (form) => {
    modalTitle.value = "Delete Account failed"
    const action = await useAuthentification().deleteUser(form.password)
    if(action.result) {
        modalTitle.value = "Account deleted"
        modalMessage.value = "Your account was successfully deleted"
        deleteAction.value = true
    }
    else
        modalMessage.value = action.response
    modalShow.value = true
}
</script>

<style scoped>

</style>