<template>
    <div class="video-container absolute inset-0 w-full h-full" :class="{ 'video-loaded': videoLoaded }">
        <!-- Loading animation -->
        <div class="loading-animation absolute inset-0 flex items-center justify-center z-20"
            :class="{ 'loading-complete': videoLoaded }">
            <div class="loading-circle"></div>
        </div>

        <video ref="videoRef" class="absolute w-full h-full object-cover transform"
            :class="{ 'video-zoom-in': videoLoaded }" loop playsinline>
            <source v-if="videoSrc" :src="videoSrc" type="video/mp4">
        </video>

        <!-- Mute Button -->
        <button @click.stop="toggleMute"
            class="absolute bottom-6 right-6 z-50 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 opacity-0 cursor-pointer"
            :class="{ 'opacity-100': videoLoaded }">
            <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a 1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
        </button>

        <!-- Overlay with animated gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 opacity-0 transition-all duration-1000"
            :class="{ 'opacity-100 cinematic-overlay': videoLoaded }"></div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { getVideo } from '@/services/mediaService';

export default {
    name: 'VideoBackground',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        initialMuted: {
            type: Boolean,
            default: false
        }
    },
    emits: ['ready', 'loaded', 'error'],
    setup(props, { emit }) {
        const videoSrc = ref(null);
        const videoRef = ref(null);
        const videoLoaded = ref(false);
        const isMuted = ref(props.initialMuted);
        const componentMounted = ref(false);

        // Toggle mute function
        const toggleMute = (event) => {
            if (!videoRef.value) return;

            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            videoRef.value.muted = !videoRef.value.muted;
            isMuted.value = videoRef.value.muted;
            console.log('Video mute toggled:', isMuted.value);
        };

        // Safely play video and handle errors
        const safePlayVideo = async (video) => {
            if (!video || !componentMounted.value) return false;

            try {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    return true;
                }
                return true;
            } catch (err) {
                if (!componentMounted.value) return false;
                console.warn(`Video playback issue: ${err.name} - ${err.message}`);
                return false;
            }
        };

        // Handle video playback optimization based on visibility
        const handleVisibilityChange = () => {
            if (!componentMounted.value) return;

            const video = videoRef.value;
            if (!video) return;

            if (document.visibilityState === 'visible') {
                if (video.paused && props.active) {
                    safePlayVideo(video);
                }
            } else {
                if (!video.paused) {
                    try {
                        video.pause();
                    } catch (err) {
                        // Ignore pause errors
                    }
                }
            }
        };

        // Load the video
        const loadVideo = async () => {
            try {
                videoSrc.value = await getVideo('3_comp.mp4');
                emit('ready');

                await nextTick();
                if (componentMounted.value) {
                    const video = videoRef.value;

                    // Set initial mute state
                    video.muted = isMuted.value;

                    // Add a slight delay before playing to allow for transition effects
                    setTimeout(() => {
                        if (props.active && componentMounted.value) {
                            videoLoaded.value = true;
                            safePlayVideo(video);
                            emit('loaded');
                        }
                    }, 500);
                }
            } catch (error) {
                console.error('Error loading main video:', error);

                try {
                    // Try fallback video
                    videoSrc.value = await getVideo('achtergrond.mp4');
                    emit('ready');

                    await nextTick();
                    if (componentMounted.value) {
                        const video = videoRef.value;
                        video.muted = isMuted.value;

                        setTimeout(() => {
                            if (props.active && componentMounted.value) {
                                videoLoaded.value = true;
                                safePlayVideo(video);
                                emit('loaded');
                            }
                        }, 500);
                    }
                } catch (err) {
                    console.error('Failed to load any video:', err);
                    emit('error');
                }
            }
        };

        // Watch for active state changes
        watch(() => props.active, (newValue) => {
            if (newValue && videoRef.value) {
                videoLoaded.value = true;
                safePlayVideo(videoRef.value);
                emit('loaded');
            }
        });

        onMounted(() => {
            componentMounted.value = true;
            document.addEventListener('visibilitychange', handleVisibilityChange);
            loadVideo();
        });

        onUnmounted(() => {
            componentMounted.value = false;
            document.removeEventListener('visibilitychange', handleVisibilityChange);

            // Clean up video
            const video = videoRef.value;
            if (video) {
                try {
                    video.pause();
                    video.removeAttribute('src');
                    video.load();
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
        });

        return {
            videoSrc,
            videoRef,
            videoLoaded,
            isMuted,
            toggleMute
        };
    }
}
</script>

<style scoped>
.video-container {
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
}

.video-loaded {
    opacity: 1;
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
    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), filter 1.2s ease;
    will-change: transform;
}

/* Enhanced video animation */
.video-zoom-in {
    animation: dramatic-zoom-in 6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* Cinematic overlay with gradient effect */
.cinematic-overlay {
    animation: gradient-pulse 10s ease infinite;
    transition: background 0.3s ease, transform 0.3s ease;
    will-change: transform, background;
}

/* Loading animation */
.loading-animation {
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 0.8s ease-out;
}

.loading-complete {
    opacity: 0;
    pointer-events: none;
}

.loading-circle {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: loading-spin 1s ease-in-out infinite;
}

/* Improve mute button visibility and clickability */
button[class*="bottom-6 right-6"] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    min-width: 42px;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    animation: button-appear 0.8s cubic-bezier(0.19, 1, 0.22, 1) 2s forwards;
}

button[class*="bottom-6 right-6"]:hover {
    transform: scale(1.1);
}

/* Animations */
@keyframes dramatic-zoom-in {
    0% {
        transform: translate(-50%, -50%) scale(1.1);
        filter: brightness(0.8) blur(10px);
    }

    100% {
        transform: translate(-50%, -50%) scale(1.05);
        filter: brightness(1) blur(0);
    }
}

@keyframes gradient-pulse {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

@keyframes loading-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes button-appear {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
