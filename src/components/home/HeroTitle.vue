<template>
    <div>
        <!-- Desktop only title - positioned at center -->
        <div class="absolute inset-0 top-[-50%] hidden md:flex justify-center items-center opacity-0 z-10 transition-all duration-1000 ease-out"
            :class="{ 'opacity-100 desktop-title-animated': visible }">
            <div class="text-center text-white px-6">
                <div class="title-container desktop-title-container" :class="{ 'animate-container': animationsReady }">
                    <h1 class="desktop-title-text">
                        <span class="block font-extralight text-5xl tracking-[0.25em] uppercase">
                            <span class="letter-span" :class="{ 'animate-letter': animationsReady }"
                                v-for="(letter, index) in 'Willem Loomans'" :key="'desktop-' + index"
                                :style="{ 'animation-delay': `${0.3 + (index * 0.05)}s` }">
                                {{ letter === ' ' ? '\u00A0' : letter }}
                            </span>
                        </span>
                        <span
                            class="block subtitle-animate-desktop relative font-thin text-lg tracking-[0.2em] uppercase mt-2"
                            :class="{ 'animate-subtitle': animationsReady }">
                            <span class="relative z-10">Portfolio</span>
                            <span class="title-underline-desktop"
                                :class="{ 'animate-underline': animationsReady }"></span>
                        </span>
                    </h1>
                </div>
            </div>
        </div>

        <!-- Mobile only title - positioned at ~20% from top -->
        <div class="absolute top-[20%] inset-x-0 md:hidden flex justify-center items-center opacity-0 z-10 transition-all duration-1000 ease-out"
            :class="{ 'opacity-100 mobile-title-animated': visible }">
            <div class="text-center text-white px-6">
                <div class="title-container" :class="{ 'animate-container-mobile': animationsReady }">
                    <h1 class="mobile-title-text">
                        <span class="block font-extralight text-2xl tracking-[0.2em] uppercase">
                            <span class="letter-span" :class="{ 'animate-letter-mobile': animationsReady }"
                                v-for="(letter, index) in 'Willem Loomans'" :key="'mobile-' + index"
                                :style="{ 'animation-delay': `${0.3 + (index * 0.05)}s` }">
                                {{ letter === ' ' ? '\u00A0' : letter }}
                            </span>
                        </span>
                        <span class="block subtitle-animate relative font-thin text-sm tracking-[0.15em] uppercase mt-1"
                            :class="{ 'animate-subtitle-mobile': animationsReady }">
                            <span class="relative z-10">Portfolio</span>
                            <span class="title-underline"
                                :class="{ 'animate-underline-mobile': animationsReady }"></span>
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeroTitle',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        animationsReady: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
/* Mobile title animations */
.mobile-title-text {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    position: relative;
    letter-spacing: 0.15em;
    animation: subtle-glow 4s ease-in-out infinite;
}

.title-container {
    position: relative;
    padding: 1.25rem 1.5rem;
}

.title-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(3px);
    border-radius: 4px;
    transform: scaleX(0);
    transform-origin: left;
}

.mobile-title-animated {
    animation: float 4s ease-in-out infinite;
}

.letter-span {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) rotate(5deg);
    filter: blur(4px);
}

.title-underline {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    bottom: -3px;
    left: 15%;
    right: 15%;
    transform: scaleX(0);
}

.subtitle-animate {
    opacity: 0;
    transform: translateY(15px);
}

/* Desktop title animations */
.desktop-title-container {
    padding: 1.5rem 2rem;
}

.desktop-title-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    border-radius: 6px;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0s;
}

.animate-container::before {
    animation: reveal-bg-desktop 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
}

.desktop-title-animated {
    animation: float-desktop 10s ease-in-out infinite;
    animation-delay: 3s;
}

.animate-letter {
    animation: letter-drop 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.subtitle-animate-desktop {
    opacity: 0;
    transform: translateY(20px);
}

.animate-subtitle {
    animation: slide-in-fade-desktop 1s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.2s;
}

.title-underline-desktop {
    position: absolute;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
    bottom: -6px;
    left: 10%;
    right: 10%;
    transform: scaleX(0);
}

.animate-underline {
    animation: draw-line-desktop 0.8s ease-out 1.6s forwards;
}

.desktop-title-text {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    position: relative;
}

/* Mobile title animations - JS controlled */
.animate-container-mobile::before {
    animation: reveal-bg 1s ease-out 0.2s forwards;
}

.animate-letter-mobile {
    animation: letter-drop-mobile 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-subtitle-mobile {
    animation: slide-in-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.9s;
}

.animate-underline-mobile {
    animation: draw-line 0.6s ease-out 1.3s forwards;
}

/* Animation keyframes */
@keyframes letter-drop {
    to {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
        filter: blur(0);
    }
}

@keyframes reveal-bg-desktop {
    to {
        transform: scaleX(1);
    }
}

@keyframes float-desktop {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-30px);
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes slide-in-fade-desktop {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes draw-line-desktop {
    to {
        transform: scaleX(1);
    }
}

@keyframes letter-drop-mobile {
    to {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
        filter: blur(0);
    }
}

@keyframes reveal-bg {
    to {
        transform: scaleX(1);
    }
}

@keyframes slide-in-fade {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes draw-line {
    to {
        transform: scaleX(1);
    }
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes subtle-glow {

    0%,
    100% {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    50% {
        text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2), 1px 1px 3px rgba(0, 0, 0, 0.5);
    }
}
</style>
