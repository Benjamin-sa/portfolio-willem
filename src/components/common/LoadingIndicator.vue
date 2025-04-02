<template>
    <div class="text-white text-center">
        <div class="loading-container">
            <div class="animated-text">
                <span class="letter" v-for="(letter, index) in 'LOADING'" :key="index"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    {{ letter }}
                </span>
            </div>
            <div class="loading-animation mt-4">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="mt-4">{{ message }}</div>
    </div>
</template>

<script>
export default {
    name: 'LoadingIndicator',
    props: {
        message: {
            type: String,
            default: 'Loading...'
        }
    }
}
</script>

<style scoped>
.loading-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.animated-text {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.5rem;
    margin-right: -0.5rem;
    /* Compensate for letter spacing on last letter */
}

.letter {
    display: inline-block;
    position: relative;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    animation: letterAnimation 2s infinite ease-in-out;
}

@keyframes letterAnimation {

    0%,
    100% {
        color: rgba(255, 255, 255, 0.8);
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        transform: translateY(0);
    }

    50% {
        color: rgba(255, 255, 255, 1);
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
            0 0 30px rgba(255, 255, 255, 0.6),
            0 0 40px rgba(255, 255, 255, 0.4);
        transform: translateY(-8px);
    }
}

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
</style>
