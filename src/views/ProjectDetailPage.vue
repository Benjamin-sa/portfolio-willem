<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Enhanced Project Header -->
        <section class="relative bg-secondary py-24 overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-pattern"></div>
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row justify-between items-center relative z-10">
                    <div class="md:max-w-2xl">
                        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 transition-opacity duration-500"
                            :class="project ? 'opacity-100' : 'opacity-0'">
                            {{ project ? project.title : 'Loading Project...' }}
                        </h1>
                        <p class="text-xl text-gray-300 max-w-3xl leading-relaxed">
                            {{ project ? project.description : 'Please wait while we load the project details.' }}
                        </p>
                    </div>
                    <div class="mt-8 md:mt-0">
                        <router-link to="/projects"
                            class="group flex items-center text-white hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2 transform transition-transform group-hover:-translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Projects
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Content -->
        <section v-if="project" class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <!-- Enhanced Project Images Gallery -->
                <div class="mb-16">
                    <h2 class="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Project Gallery</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="(imagePath, index) in project.images" :key="`img-${index}`"
                            class="group rounded-xl overflow-hidden shadow-md h-64 relative cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                            @click="openLightbox(index)">
                            <div
                                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                                </svg>
                            </div>
                            <img v-if="imageSources[index]" :src="imageSources[index]"
                                :alt="`${project.title} - Image ${index + 1}`"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy" />
                            <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                                <svg class="animate-spin h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Project Videos -->
                <div v-if="project.videos && project.videos.length > 0" class="mb-16">
                    <h2 class="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Project Videos</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="(videoPath, index) in project.videos" :key="`video-${index}`"
                            class="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                            <!-- Only load video when visible (using Intersection Observer via v-if directive) -->
                            <div class="video-container w-full" ref="videoContainers">
                                <video v-if="videoIsVisible[index]" class="w-full h-auto" controls preload="metadata"
                                    :poster="videoPosters[index]">
                                    <source v-if="videoSources[index]" :src="videoSources[index]" type="video/mp4">
                                </video>
                                <div v-else
                                    class="flex items-center justify-center bg-gray-800 aspect-video rounded-t-xl">
                                    <div class="text-center p-8">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p class="text-gray-300 text-lg">Video will load when scrolled into view</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white p-4 rounded-b-xl">
                                <p class="text-gray-700 font-medium">Video {{ index + 1 }}</p>
                                <p class="text-gray-500 text-sm">Click to play</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Project Description -->
                <div class="mb-16">
                    <h2 class="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">About This Project</h2>
                    <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                        <p class="text-gray-700 text-lg leading-relaxed">
                            {{ project.fullDescription || project.description }}
                        </p>

                        <!-- Project metadata (optional - a nice professional touch) -->
                        <div class="mt-8 pt-6 border-t border-gray-100">
                            <div class="flex flex-wrap items-center gap-4">
                                <span class="px-3 py-1 text-sm font-medium rounded-full"
                                    :class="getCategoryStyle(project.category)">
                                    {{ getCategoryName(project.category) }}
                                </span>

                                <span class="text-gray-500 text-sm">
                                    <span class="font-medium">Media:</span>
                                    {{ project.images.length }} images, {{ project.videos ? project.videos.length : 0 }}
                                    videos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Navigation -->
                <div class="flex justify-between items-center">
                    <router-link v-if="prevProjectId" :to="`/projects/${prevProjectId}`"
                        class="group flex items-center bg-white hover:bg-gray-100 text-gray-800 py-3 px-6 rounded-xl shadow transition-all hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Previous Project
                    </router-link>
                    <div v-else></div>

                    <router-link v-if="nextProjectId" :to="`/projects/${nextProjectId}`"
                        class="group flex items-center bg-white hover:bg-gray-100 text-gray-800 py-3 px-6 rounded-xl shadow transition-all hover:shadow-md">
                        Next Project
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Enhanced Loading State -->
        <section v-else class="py-16 px-4">
            <div class="max-w-5xl mx-auto">
                <div class="animate-pulse space-y-8">
                    <div class="h-80 bg-gray-200 rounded-xl"></div>
                    <div class="space-y-3">
                        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="h-64 bg-gray-200 rounded-xl"></div>
                        <div class="h-64 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Lightbox Component -->
        <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            @click="closeLightbox">
            <div class="max-w-6xl w-full flex items-center justify-center" @click.stop>
                <!-- Close button -->
                <button @click="closeLightbox"
                    class="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Navigation buttons -->
                <button v-if="project.images.length > 1" @click.stop="prevImage"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button v-if="project.images.length > 1" @click.stop="nextImage"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <!-- Image -->
                <img v-if="currentLightboxImage !== null" :src="currentLightboxImage"
                    :alt="`${project.title} - Full Image`"
                    class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />

                <!-- Image counter -->
                <div
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                    {{ currentLightboxIndex + 1 }} / {{ project.images.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue';
import { getImage, getVideo, generatePlaceholder } from '@/services/mediaService';
import { prefetchNeighboringProjects, preloadProjectAssets } from '@/services/preloadService';

export default {
    name: 'ProjectDetailPage',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    setup(props) {
        const project = ref(null);
        const allProjects = ref([]);
        const imageSources = ref([]);
        const videoSources = ref([]);
        const videoPosters = ref([]);
        const videoContainers = ref([]);
        const videoIsVisible = ref([]);
        const observers = ref([]);

        // Navigation
        const currentIndex = computed(() => {
            if (!project.value) return -1;
            return allProjects.value.findIndex(p => p.id == props.id);
        });

        const prevProjectId = computed(() => {
            if (currentIndex.value <= 0) return null;
            return allProjects.value[currentIndex.value - 1].id;
        });

        const nextProjectId = computed(() => {
            if (currentIndex.value === -1 || currentIndex.value >= allProjects.value.length - 1) return null;
            return allProjects.value[currentIndex.value + 1].id;
        });

        // Create intersection observer for lazy loading videos
        const setupIntersectionObserver = () => {
            if (project.value?.videos?.length) {
                nextTick(() => {
                    const containers = videoContainers.value;
                    if (!containers || !containers.length) return;

                    // Setup observers for each video element
                    project.value.videos.forEach((_, index) => {
                        const container = containers[index];
                        if (!container) return;

                        const observer = new IntersectionObserver(
                            (entries) => {
                                entries.forEach((entry) => {
                                    if (entry.isIntersecting) {
                                        // Video is now visible in viewport
                                        videoIsVisible.value[index] = true;

                                        // Load the video if not already loaded
                                        if (!videoSources.value[index]) {
                                            loadVideo(project.value.videos[index], index);
                                        }

                                        // Disconnect after loading
                                        observer.disconnect();
                                    }
                                });
                            },
                            { threshold: 0.1 } // Trigger when 10% of the element is visible
                        );

                        observer.observe(container);
                        observers.value.push(observer);
                    });
                });
            }
        };

        const loadVideo = async (path, index) => {
            try {
                videoSources.value[index] = await getVideo(path);
            } catch (error) {
                console.error(`Failed to load video: ${path}`, error);
            }
        };

        const getImageUrl = async (path, index) => {
            try {
                const imageUrl = await getImage(path);
                imageSources.value[index] = imageUrl;
                return imageUrl;
            } catch (error) {
                console.error(`Failed to load image: ${path}`, error);
                return null;
            }
        };

        const loadProjectMedia = async () => {
            if (!project.value) return;

            // Reset media arrays
            imageSources.value = Array(project.value.images?.length || 0).fill(null);
            videoSources.value = Array(project.value.videos?.length || 0).fill(null);
            videoPosters.value = Array(project.value.videos?.length || 0).fill(null);
            videoIsVisible.value = Array(project.value.videos?.length || 0).fill(false);

            // Load first image immediately (critical for UX)
            if (project.value.images?.length > 0) {
                await getImageUrl(project.value.images[0], 0);

                // Load the rest of the images with a slight delay to prioritize critical content
                setTimeout(() => {
                    project.value.images.slice(1).forEach((path, i) => {
                        getImageUrl(path, i + 1);
                    });
                }, 100);
            }

            // Generate video poster images
            if (project.value.videos?.length > 0) {
                project.value.videos.forEach((_, index) => {
                    videoPosters.value[index] = generatePlaceholder(`Video ${index + 1}`, 640, 360);
                });

                // Setup observers for lazy loading videos
                setupIntersectionObserver();
            }

            // Prefetch neighboring projects' assets
            prefetchNeighboringProjects(allProjects.value, props.id);
        };

        const openLightbox = (index) => {
            currentLightboxIndex.value = index;

            // Use the already loaded image source if available
            if (imageSources.value[index]) {
                currentLightboxImage.value = imageSources.value[index];
                lightboxOpen.value = true;
            } else {
                // If image isn't loaded yet, load it now
                getImageUrl(project.value.images[index], index).then(url => {
                    currentLightboxImage.value = url;
                    lightboxOpen.value = true;
                });
            }

            // Prevent scrolling of the body when lightbox is open
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightboxOpen.value = false;
            // Re-enable scrolling
            document.body.style.overflow = '';
        };

        const nextImage = () => {
            if (!project.value || !project.value.images.length) return;

            currentLightboxIndex.value = (currentLightboxIndex.value + 1) % project.value.images.length;
            updateLightboxImage();
        };

        const prevImage = () => {
            if (!project.value || !project.value.images.length) return;

            currentLightboxIndex.value = (currentLightboxIndex.value - 1 + project.value.images.length) % project.value.images.length;
            updateLightboxImage();
        };

        const updateLightboxImage = () => {
            const index = currentLightboxIndex.value;

            if (imageSources.value[index]) {
                currentLightboxImage.value = imageSources.value[index];
            } else {
                // If this image hasn't been loaded yet, load it now
                getImageUrl(project.value.images[index], index).then(url => {
                    currentLightboxImage.value = url;
                });
            }
        };

        // Clean up observers on component unmount
        onUnmounted(() => {
            observers.value.forEach(observer => {
                if (observer) {
                    observer.disconnect();
                }
            });
        });

        // Watch for changes in the project ID
        watch(() => props.id, async (newId) => {
            project.value = allProjects.value.find(p => p.id == newId);
            if (project.value) {
                await loadProjectMedia();
                // Preload this project's assets strategically
                preloadProjectAssets(project.value);
            }
        });

        onMounted(async () => {
            // In a real application, you would likely fetch this data from an API
            // For now, we'll define the projects directly
            allProjects.value = [
                {
                    id: 1,
                    title: 'The Wachters',
                    category: 'character',
                    description: 'A detailed character design showcasing my skills in creating realistic 3D models.',
                    images: ['Characters/De Wachters.jpg'],
                    videos: [],
                    fullDescription: 'The Wachters is a character design project focused on creating a mysterious guardian figure. This project highlights my expertise in character modeling, texturing, and rendering in Blender.'
                },
                {
                    id: 2,
                    title: 'ROBOTOAD',
                    category: 'character',
                    description: 'An adventurous journey into sci-fi world-building with unique character designs.',
                    images: ['Characters/ROBOTOAD character design.jpg', 'Characters/Skylander character design  kopie.jpg'],
                    videos: ['2.mp4'],
                    fullDescription: 'ROBOTOAD combines organic and mechanical elements in a unique character design. This project explores the intersection of nature and technology through detailed modeling and texturing techniques.'
                },
                {
                    id: 3,
                    title: 'Curse of the Cliffs',
                    category: 'poster',
                    description: 'Environmental storytelling through intricate landscapes and atmospheric lighting.',
                    images: ['Posters/Poster Curse of the cliffs Artistiek dossier kopie.jpg', 'Backgrounds/Achtergrond longshot (1) kopie.jpg'],
                    videos: [],
                    fullDescription: 'This poster for "Curse of the Cliffs" showcases my ability to create dramatic environments with compelling atmosphere and lighting that tells a story through visual elements alone.'
                },
                {
                    id: 4,
                    title: 'Liver and Bone',
                    category: 'poster',
                    description: 'Experimental project playing with organic forms and textures.',
                    images: ['Posters/Poster Liver and Bone.jpg'],
                    videos: [],
                    fullDescription: 'Liver and Bone is an artistic exploration of organic textures and forms, pushing the boundaries of what can be achieved with Blender\'s material system and lighting techniques.'
                },
                {
                    id: 5,
                    title: 'Monster Animation',
                    category: 'animation',
                    description: 'Character animation showcasing movement and personality.',
                    images: ['Characters/Het Monster.jpg'],
                    videos: ['1.mp4', '3.mp4'],
                    fullDescription: 'This animation project focuses on bringing characters to life through fluid movement and expressive actions, demonstrating my skills in rigging and animation within Blender.'
                },
                {
                    id: 6,
                    title: 'Tower Room',
                    category: 'environment',
                    description: 'Detailed interior environment with rich textures and lighting.',
                    images: ['Backgrounds/render torenkamer .jpg'],
                    videos: ['4.mp4'],
                    fullDescription: 'The Tower Room is an environment design project featuring intricate architectural details, custom textures, and dramatic lighting that creates a mysterious atmosphere.'
                },
                {
                    id: 7,
                    title: 'Frog Background Series',
                    category: 'environment',
                    description: 'Series showing my environment design process from concept to completion.',
                    images: [
                        'Backgrounds/BACKGROUND_FROG (schets) kopie.jpg',
                        'Backgrounds/BACKGROUND_FROG (lineart) kopie.jpg',
                        'Backgrounds/BACKGROUND_FROG (kleur) kopie.jpg',
                        'Backgrounds/BACKGROUND_FROG (finished) kopie.jpg'
                    ],
                    videos: [],
                    fullDescription: 'This series documents my complete workflow from initial sketch to final render, demonstrating how I approach environment design and development in Blender.'
                }
            ];

            // Find the project that matches the ID
            project.value = allProjects.value.find(p => p.id == props.id);

            if (project.value) {
                await loadProjectMedia();
                // Preload this project's assets strategically
                preloadProjectAssets(project.value);
            } else {
                console.error(`Project with ID ${props.id} not found`);
            }

            // Add keyboard event listeners
            window.addEventListener('keydown', handleKeydown);
        });

        // Add category styling logic to match ProjectsPage
        const getCategoryName = (categoryId) => {
            const categories = {
                'character': 'Characters',
                'environment': 'Environments',
                'animation': 'Animations',
                'poster': 'Posters'
            };
            return categories[categoryId] || 'Other';
        };

        const getCategoryStyle = (categoryId) => {
            const styles = {
                'character': 'bg-blue-100 text-blue-800',
                'environment': 'bg-green-100 text-green-800',
                'animation': 'bg-purple-100 text-purple-800',
                'poster': 'bg-yellow-100 text-yellow-800'
            };
            return styles[categoryId] || 'bg-gray-100 text-gray-800';
        };

        const handleKeydown = (e) => {
            if (!lightboxOpen.value) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        };

        // Lightbox state
        const lightboxOpen = ref(false);
        const currentLightboxIndex = ref(0);
        const currentLightboxImage = ref(null);





        return {
            project,
            prevProjectId,
            nextProjectId,
            imageSources,
            videoSources,
            videoPosters,
            videoIsVisible,
            videoContainers,
            openLightbox,
            getCategoryName,
            getCategoryStyle,
            lightboxOpen,
            currentLightboxIndex,
            currentLightboxImage,
            closeLightbox,
            nextImage,
            prevImage
        };
    }
}
</script>

<style scoped>
.bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Add lightbox transitions */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

[v-if="lightboxOpen"] {
    animation: fadeIn 0.3s ease;
}
</style>
