<template>
    <div v-if="isVisible"
        class="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
        :class="{ 'fade-out': isExiting }">

        <!-- Only show loading indicator when loadingComplete is false -->
        <loading-indicator v-if="!loadingComplete" class="mb-12" message=""></loading-indicator>

        <!-- Elegant button - shown when timer completes -->
        <button v-if="loadingComplete" @click="startExperience" class="elegant-button">
            <span class="button-bg"></span>
            <span class="button-content">
                <span class="button-text">Enter Experience</span>
                <span class="button-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
            </span>
            <span class="button-line"></span>
        </button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LoadingIndicator from '../common/LoadingIndicator.vue';

export default {
    name: 'LoadingScreen',
    components: {
        LoadingIndicator
    },
    emits: ['start-experience'],
    setup(props, { emit }) {
        const isVisible = ref(true);
        const isExiting = ref(false);
        const loadingComplete = ref(false);

        // Transition out the loading screen
        const startExitAnimation = () => {
            isExiting.value = true;
            setTimeout(() => {
                isVisible.value = false;
            }, 1000); // Match this to the CSS transition duration
        };

        // User clicked the start button
        const startExperience = () => {
            emit('start-experience');
            startExitAnimation();
        };

        onMounted(() => {
            // Simply wait 2 seconds before showing the start button
            setTimeout(() => {
                loadingComplete.value = true;
            }, 2000);
        });

        return {
            isVisible,
            isExiting,
            loadingComplete,
            startExperience
        };
    }
};
</script>

<style scoped>
.loading-screen {
    transition: opacity 1s ease-out;
}

.fade-out {
    opacity: 0;
    pointer-events: none;
}

/* Animate the bounce */
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}

/* Loading animation */
.loading-animation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.7;
    animation: dotPulse 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dotPulse {

    0%,
    100% {
        transform: scale(0.7);
        opacity: 0.5;
    }

    50% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Elegant Button Styles - Matching the homepage style */
.elegant-button {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1.8rem;
    overflow: hidden;
    text-decoration: none;
    z-index: 1;
    margin: 1rem;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    animation: elegant-button-entrance 0.8s ease-out forwards 0.2s;
    opacity: 0;
    transform: translateY(10px);
}

.button-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(3px);
    border-radius: 4px;
    transform: scaleX(0.95);
    transform-origin: center;
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: -1;
}

.button-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.8rem;
    transition: all 0.3s ease-out;
}

.button-text {
    color: white;
    font-size: 0.9rem;
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-right: 0.8rem;
    transition: transform 0.3s ease-out;
}

.button-arrow {
    color: white;
    display: flex;
    align-items: center;
    transform: translateX(-5px);
    opacity: 0.7;
    transition: all 0.3s ease-out;
}

.button-line {
    position: absolute;
    bottom: 0.6rem;
    left: 1.8rem;
    right: 1.8rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: scaleX(0.3);
    opacity: 0;
    transition: all 0.4s ease-out 0.1s;
}

/* Hover states */
.elegant-button:hover .button-bg {
    transform: scaleX(1);
}

.elegant-button:hover .button-line {
    transform: scaleX(0.8);
    opacity: 1;
}

.elegant-button:hover .button-arrow {
    transform: translateX(3px);
    opacity: 1;
}

.elegant-button:hover .button-text {
    transform: translateX(-3px);
}

.elegant-button:focus {
    outline: none;
}

.elegant-button:active .button-bg {
    transform: scaleX(0.98);
}

@keyframes elegant-button-entrance {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Additional pulsing effect to draw attention */
.elegant-button {
    animation: elegant-button-entrance 0.8s ease-out forwards 0.2s, subtle-pulse 2s infinite 1s;
}

@keyframes subtle-pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}
</style>