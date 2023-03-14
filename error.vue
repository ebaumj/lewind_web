<template>
    <div class="w-full h-screen bg-rose_very_light m-0">
        <div class="justify-center flex mx-4">
            <div class="text-4xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl mt-10">
                <div class="flex justify-center items-center w-full mt-6"><img src="~/assets/images/noWind.png" class="justify-center flex max-h-32"/></div>
                <h1 class="flex justify-center font-semibold mt-8">{{ error.statusCode}}</h1>
                <p class="text-lg flex justify-center md:py-6 py-4">{{ error.message }}</p>
                <div class="px-4 py-6 flex justify-center">
                    <button @click="handleClearError" type="button" class="inline-flex w-full justify-center rounded-md bg-rose_dark_red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose_red mx-3 w-36">Bring me home</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps(['error'])
    const handleClearError = () => clearError({ redirect: '/' })
</script>

<style scoped>
</style>