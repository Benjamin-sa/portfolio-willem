<template>
    <button @click="$emit('click')" class="elegant-button group">
        <span class="button-bg"></span>
        <span class="button-content">
            <span class="button-text">View More</span>
            <span class="button-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 rotate-90" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
        </span>
        <span class="button-line"></span>
    </button>
</template>

<script>
export default {
    name: 'ViewMoreButton',
    emits: ['click']
}
</script>

<style scoped>
.elegant-button {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1.8rem;
    overflow: hidden;
    text-decoration: none;
    z-index: 30;
    margin: 1rem;
    cursor: pointer;
    animation: button-fade-in 1s ease-out forwards 0.5s;
    opacity: 0;
    transform: translateY(10px);
}

.button-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
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

@keyframes button-fade-in {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
