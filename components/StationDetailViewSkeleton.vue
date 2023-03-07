<template>
    <div class="md:text-4xl text-2xl min-h-screen py-0 px-0 bg-white rounded-md shadow-md w-full">
        <div class="md:px-4 px-2 py-8 justify-center flex w-full">
            <AnimatedPlaceholder class="h-18 w-[50%]"/>
        </div>
        <div class="container my-2 mx-auto px-0 md:px-4 grid md:grid-cols-2 grid-cols-1">
            <div class="md:mx-16 mb-0 justify-center items-center md:p-20 p-8">
                <div class="square justify-center items-center">
                    <AnimatedPlaceholder class="md:h-96 h-60 max-w-[80%]"/>
                </div>
                <AnimatedPlaceholder class="h-18 max-w-[50%] justify-center flex mt-8"/>
            </div> 
            <div class="w-full flex items-center">
                <div class="w-full md:px-6 px-2 grid grid-rows-2 items-center">
                    <div class="grid grid-cols-2 md:gap-6 gap-2 md:mb-6 mb-4">
                        <div class="">
                            <AnimatedPlaceholder class="md:h-40 h-28 max-w-[50%]"/>
                        </div>
                        <div class="">
                            <AnimatedPlaceholder class="md:h-40 h-28 max-w-[50%]"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 md:gap-6 gap-2">
                        <div class="">
                            <AnimatedPlaceholder class="md:h-40 h-28 max-w-[50%]"/>
                        </div>
                        <div class="">
                            <AnimatedPlaceholder class="md:h-40 h-28 max-w-[50%]"/>
                        </div>
                        <div class="">
                            <AnimatedPlaceholder class="md:h-40 h-28 max-w-[50%]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="flex justify-center mb-8 mt-8 md:text-4xl text-xl"></h2>
        <div class="px-4 pb-4 flex justify-center w-full">
            <AnimatedPlaceholder class="md:h-96 h-48 md:w-[60%] w-[95%]"/>
        </div>
        <h2 class="flex justify-center md:mt-8 mt-0 my-8 md:text-4xl text-xl"></h2>
        <div class="px-4 pb-4 flex justify-center w-full my-8">
            <AnimatedPlaceholder class="md:h-96 h-48 md:w-[60%] w-[95%]"/>
        </div>
        <div class="mt-8 text-white">..</div>
    </div>
</template>