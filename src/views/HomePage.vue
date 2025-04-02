<template>
    <div>
        <!-- Loading Screen Component - Only shown on first visit in the session -->
        <LoadingScreen v-if="showLoadingScreen" @start-experience="startExperience" />

        <!-- Initial loading indicator when no video is loaded yet -->
        <div v-else-if="!videoReady" class="fixed inset-0 flex items-center justify-center bg-secondary z-30">
            <LoadingIndicator message="Loading experience..." />
        </div>

        <!-- Hero Section - 90vh on mobile, full screen on desktop -->
        <section class="relative h-[90vh] md:h-screen overflow-hidden">
            <!-- Video background component -->
            <VideoBackground :active="videoLoaded" :initial-muted="isMuted" @ready="handleVideoReady"
                @loaded="handleVideoLoaded" @error="handleVideoError" />

            <!-- Hero title component -->
            <HeroTitle :visible="videoLoaded" :animations-ready="animationsReady" />

            <!-- Content that appears after video loads -->
            <div class="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center opacity-0 transform translate-y-10 transition-all duration-1000 ease-out z-20"
                :class="{ 'opacity-100 translate-y-0': videoLoaded }">
                <ViewMoreButton @click="scrollToIntro" />
            </div>
        </section>

        <!-- Black bar - only visible on mobile -->
        <div class="h-[20vh] md:hidden bg-gradient-to-b from-black to-gray-900 w-full flex items-center justify-center">
            <div class="w-16 h-px bg-gray-700"></div>
        </div>


        <!-- Featured Projects Component -->
        <FeaturedProjects ref="featuredProjectsRef" />
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';
import { hasUserInteracted, markUserInteraction } from '@/services/sessionService';
import { preloadCommonImages } from '@/services/mediaService';

// Components
import LoadingScreen from '@/components/layout/LoadingScreen.vue';
import LoadingIndicator from '@/components/common/LoadingIndicator.vue';
import VideoBackground from '@/components/home/VideoBackground.vue';
import HeroTitle from '@/components/home/HeroTitle.vue';
import ViewMoreButton from '@/components/home/ViewMoreButton.vue';
import FeaturedProjects from '@/components/home/FeaturedProjects.vue';

export default {
    name: 'HomePage',
    components: {
        LoadingScreen,
        LoadingIndicator,
        VideoBackground,
        HeroTitle,
        ViewMoreButton,
        FeaturedProjects
    },
    setup() {
        // State variables
        const videoLoaded = ref(false);
        const videoReady = ref(false);
        const componentMounted = ref(false);
        const showLoadingScreen = ref(false);
        const isMuted = ref(false);
        const animationsReady = ref(false);
        const abortController = new AbortController();
        const featuredProjectsRef = ref(null);

        // Handle when video component signals it's ready
        const handleVideoReady = () => {
            console.log("Video is ready");
            videoReady.value = true;

            // If user has already interacted, show video immediately
            if (hasUserInteracted()) {
                console.log("User has already interacted, showing video");
                videoLoaded.value = true;
                animationsReady.value = true;
                document.body.classList.add('loading-screen-gone');
            } else {
                // First visit, show loading screen
                console.log("First visit, showing loading screen");
                showLoadingScreen.value = true;
            }
        };

        // Handle when video component signals it's loaded and playing
        const handleVideoLoaded = () => {
            console.log("Video has loaded and started playing");
        };

        // Handle video error
        const handleVideoError = () => {
            console.error("Failed to load video");
            videoReady.value = true;
        };

        // Start the experience after user interaction with loading screen
        const startExperience = () => {
            console.log("Starting experience from user interaction");
            markUserInteraction();
            videoLoaded.value = true;

            setTimeout(() => {
                if (componentMounted.value) {
                    animationsReady.value = true;
                    console.log("Animations ready");
                }
            }, 1500);
        };

        // Preload images for other sections
        const preloadAssets = () => {
            if (componentMounted.value) {
                preloadCommonImages([
                    'profile.jpg',
                    'Characters/Het Monster.jpg',
                    'Backgrounds/render torenkamer .jpg'
                ]);
            }
        };

        // Scroll to featured projects section
        const scrollToIntro = () => {
            if (featuredProjectsRef.value) {
                featuredProjectsRef.value.$el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        onMounted(() => {
            console.log("HomePage component mounted");
            componentMounted.value = true;

            // Preload assets for later use
            setTimeout(() => {
                if (componentMounted.value) {
                    preloadAssets();
                }
            }, 1000);
        });

        onBeforeUnmount(() => {
            console.log("HomePage component before unmount");
            componentMounted.value = false;
            abortController.abort();
        });

        onUnmounted(() => {
            console.log("HomePage component unmounted");
        });

        return {
            videoLoaded,
            videoReady,
            showLoadingScreen,
            isMuted,
            animationsReady,
            featuredProjectsRef,

            startExperience,
            scrollToIntro,
            handleVideoReady,
            handleVideoLoaded,
            handleVideoError
        };
    }
};
</script>

<style scoped>
/* Video animations */
.video-container {
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
}

.video-loaded {
    opacity: 1;
}

.video-zoom-in {
    transform: translate(-50%, -50%) scale(1.05);
    animation: slow-zoom 30s ease-out forwards;
}

@keyframes slow-zoom {
    from {
        transform: translate(-50%, -50%) scale(1.05);
    }

    to {
        transform: translate(-50%, -50%) scale(1.15);
    }
}

/* Handle video overflow */
.overflow-hidden {
    overflow: hidden;
}

/* Make sure video always covers the container regardless of aspect ratio */
video {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.05);
}

.video-zoom-in {
    transform: translate(-50%, -50%) scale(1.05);
    animation: slow-zoom 30s ease-out forwards;
}

@keyframes slow-zoom {
    from {
        transform: translate(-50%, -50%) scale(1.05);
    }

    to {
        transform: translate(-50%, -50%) scale(1.15);
    }
}

/* Loading animation for initial state */
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

/* Enhanced button styles */
.interactive-button {
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
}

.interactive-button::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.interactive-button:hover {
    transform: translateY(-3px);
}

.interactive-button:hover::after {
    transform: translateX(100%);
}

/* Add a subtle pulsing effect */
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}

.interactive-button {
    animation: pulse 2s infinite;
}

/* Improve mute button visibility and clickability - Updated selector for new position */
button[class*="bottom-6 right-6"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    min-width: 42px;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Add spacing from the interactive button */
    margin-bottom: 20px;
}

button[class*="bottom-6 right-6"]:hover {
    transform: scale(1.1);
}

/* Mobile title animations */
.mobile-title-text {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    position: relative;
    letter-spacing: 0.15em;
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
    animation: reveal-bg 1s ease-out 0.2s forwards;
}

@keyframes reveal-bg {
    to {
        transform: scaleX(1);
    }
}

.mobile-title-animated {
    animation: float 8s ease-in-out infinite;
}

.letter-animate {
    opacity: 0;
    animation: slide-in-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s;
    transform: translateY(20px);
}

.subtitle-animate {
    opacity: 0;
    animation: slide-in-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.9s;
    transform: translateY(15px);
}

.title-underline {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    bottom: -3px;
    left: 15%;
    right: 15%;
    transform: scaleX(0);
    animation: draw-line 0.6s ease-out 1.3s forwards;
}

@keyframes draw-line {
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

@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-6px);
    }

    100% {
        transform: translateY(0px);
    }
}

/* Remove these animations as they're replaced by the new ones */
.animate-fade-in-2,
.animate-fade-in-3 {
    animation: none;
}

@keyframes animate-fade-in-2 {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes animate-fade-in-3 {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    30% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Make glow effect more subtle and professional */
@keyframes subtle-glow {

    0%,
    100% {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    50% {
        text-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2), 1px 1px 3px rgba(0, 0, 0, 0.5);
    }
}

.mobile-title-text {
    animation: subtle-glow 4s ease-in-out infinite;
}

/* Refined elegant button styles to match title */
.elegant-button {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1.8rem;
    overflow: hidden;
    text-decoration: none;
    z-index: 30;
    /* Increased z-index to ensure button is clickable */
    margin: 1rem;
    cursor: pointer;
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

/* Animation for button entrance */
.elegant-button {
    animation: button-fade-in 1s ease-out forwards 0.5s;
    opacity: 0;
    transform: translateY(10px);
}

@keyframes button-fade-in {
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    /* No animation by default */
}

.animate-container::before {
    animation: reveal-bg-desktop 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
}

.desktop-title-animated {
    animation: float-desktop 10s ease-in-out infinite;
    animation-delay: 3s;
    /* Delay the floating until after initial animations */
}

.letter-span {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) rotate(5deg);
    filter: blur(4px);
    /* No animation by default */
}

.animate-letter {
    animation: letter-drop 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    /* Animation delay is set inline based on index */
}

.subtitle-animate-desktop {
    opacity: 0;
    transform: translateY(20px);
    /* No animation by default */
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
    /* No animation by default */
}

.animate-underline {
    animation: draw-line-desktop 0.8s ease-out 1.6s forwards;
}

.desktop-title-text {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    position: relative;
}

/* Mobile title animations - updated to use JS control */
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

/* Keep the original animation definitions */
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
        transform: translateY(-10px);
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
        transform: translateY(-6px);
    }

    100% {
        transform: translateY(0px);
    }
}

/* Remove any global selector styles that are no longer needed */
/* Remove these selectors:
:global(body.loading-screen-gone) .desktop-title-container::before,
:global(body.loading-screen-gone) .letter-animate-desktop .letter-span,
etc...
*/

/* ...existing styles for remaining elements... */
</style>