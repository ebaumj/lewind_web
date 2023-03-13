<template>
    <div class="items-center justify-center">
        <div class="text-2xl items-center justify-center mb-2 flex">{{ name }}</div>
        <WindArrow :rotation="direction" class="items-center flex justify-center mb-2" />
        <div class="text-lg flex items-center justify-center mb-4">
            <ColorGradient :windspeed="windspeed" direction="to-t" class="overflow-clip" addClass="rounded-md p-4">{{ windspeed }}kts</ColorGradient>
        </div>
        <div class="flex items-center justify-center mb-2 text-rose_red"><button @click="$emit('add-station')" class="flex hover:bg-rose_light py-2 md:px-4 px-2 border border-rose_red rounded shadow text-lg items-center justify-center">
            <i class="material-icons mr-2 mb-0 pb-0 text-xl">add_circle</i>Add to my List
        </button></div>
    </div>
</template>

<script setup>
const { name, windspeed, direction } = defineProps(['name', 'windspeed', 'direction'])
</script>

<style lang="scss" scoped>

</style>