<template>
    <div>
        <img :style="{transform: `rotate(${parseInt(rotation) + 270}deg)`}" src="~/assets/images/left_arrow_icon_free_svg_file.png" class="h-10 w-10">
    </div>
</template>

<script setup>
const { rotation } = defineProps(['rotation'])
</script>

<style lang="scss" scoped>

</style>