<template>
    <div>
        <div class="from-wind_0"></div>
        <div class="from-wind_2"></div>
        <div class="from-wind_4"></div>
        <div class="from-wind_6"></div>
        <div class="from-wind_8"></div>
        <div class="from-wind_10"></div>
        <div class="from-wind_12"></div>
        <div class="from-wind_14"></div>
        <div class="from-wind_16"></div>
        <div class="from-wind_18"></div>
        <div class="from-wind_20"></div>
        <div class="from-wind_22"></div>
        <div class="from-wind_24"></div>
        <div class="from-wind_26"></div>
        <div class="from-wind_28"></div>
        <div class="from-wind_30"></div>
        <div class="from-wind_32"></div>
        <div class="from-wind_34"></div>
        <div class="from-wind_36"></div>
        <div class="from-wind_38"></div>
        <div class="from-wind_40"></div>
        <div class="from-wind_42"></div>
        <div class="from-wind_44"></div>
        <div class="from-wind_46"></div>
        <div class="from-wind_48"></div>
        <div class="from-wind_50"></div>
        <div class="from-wind_52"></div>
        <div v-if="direction == 'to-l'" :class="`bg-gradient-to-l from-wind_${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-r'" :class="`bg-gradient-to-r from-wind_${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-t'" :class="`bg-gradient-to-t from-wind_${color} w-full h-full`">
            <slot/>
        </div>
        <div v-if="direction == 'to-b'" :class="`bg-gradient-to-b from-wind_${color} w-full h-full`">
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