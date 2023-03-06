<template>
    <div>
        <div class="from-wind-0"></div>
        <div class="from-wind-2"></div>
        <div class="from-wind-4"></div>
        <div class="from-wind-6"></div>
        <div class="from-wind-8"></div>
        <div class="from-wind-10"></div>
        <div class="from-wind-12"></div>
        <div class="from-wind-14"></div>
        <div class="from-wind-16"></div>
        <div class="from-wind-18"></div>
        <div class="from-wind-20"></div>
        <div class="from-wind-22"></div>
        <div class="from-wind-24"></div>
        <div class="from-wind-26"></div>
        <div class="from-wind-28"></div>
        <div class="from-wind-30"></div>
        <div class="from-wind-32"></div>
        <div class="from-wind-34"></div>
        <div class="from-wind-36"></div>
        <div class="from-wind-38"></div>
        <div class="from-wind-40"></div>
        <div class="from-wind-42"></div>
        <div class="from-wind-44"></div>
        <div class="from-wind-46"></div>
        <div class="from-wind-48"></div>
        <div class="from-wind-50"></div>
        <div class="from-wind-52"></div>
        <div v-if="direction == 'to-l'" :class="`bg-gradient-to-l from-wind-${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-r'" :class="`bg-gradient-to-r from-wind-${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-t'" :class="`bg-gradient-to-t from-wind-${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-b'" :class="`bg-gradient-to-b from-wind-${color} w-full h-full`">
            <slot/>
        </div>
    </div>
</template>

<script setup>
const { windspeed, direction } = defineProps(['windspeed', 'direction'])
const color = (windspeed > 52 ? 52 : 2 * Math.floor(windspeed / 2))
</script>

<style lang="scss" scoped>

</style>