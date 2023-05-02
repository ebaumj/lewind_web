<template>
    <div>
        <h1>Profile</h1>
        <p>{{ email }}</p>
    </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })
const email = useGetUser().email
</script>

<style scoped>

</style>