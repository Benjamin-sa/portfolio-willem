<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Page Header -->
        <section class="relative bg-secondary py-24">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">My Portfolio</h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    A collection of my 3D artwork, animations, and design projects created with Blender
                </p>
            </div>
        </section>

        <!-- Projects Grid -->
        <section class="py-16 px-4">
            <div class="max-w-7xl mx-auto">
                <!-- Filters -->
                <div class="mb-10 flex flex-wrap justify-center gap-4">
                    <button @click="activeCategory = 'all'" class="px-6 py-2 rounded-full transition-colors" :class="activeCategory === 'all' ?
                        'bg-primary text-white' :
                        'bg-gray-200 text-gray-800 hover:bg-gray-300'">
                        All Projects
                    </button>
                    <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
                        class="px-6 py-2 rounded-full transition-colors" :class="activeCategory === category.id ?
                            'bg-primary text-white' :
                            'bg-gray-200 text-gray-800 hover:bg-gray-300'">
                        {{ category.name }}
                    </button>
                </div>

                <!-- Projects -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="project in filteredProjects" :key="project.id"
                        class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                        <div class="relative pb-[56.25%] overflow-hidden">
                            <img :src="project.thumbnail" :alt="project.title"
                                class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-xl font-bold">{{ project.title }}</h3>
                                <span class="px-2 py-1 text-xs font-medium rounded-full"
                                    :class="getCategoryClass(project.category)">
                                    {{ getCategoryName(project.category) }}
                                </span>
                            </div>
                            <p class="text-gray-600 mb-4">{{ project.description }}</p>
                            <router-link :to="`/projects/${project.id}`"
                                class="inline-block text-primary hover:text-primary-dark font-medium">
                                View Project →
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { getImage } from '@/services/mediaService';

export default {
    name: 'ProjectsPage',
    setup() {
        const projects = ref([]);
        const activeCategory = ref('all');
        const loadedProjects = ref(new Set());

        const categories = [
            { id: 'character', name: 'Characters', color: 'bg-blue-100 text-blue-800' },
            { id: 'environment', name: 'Environments', color: 'bg-green-100 text-green-800' },
            { id: 'animation', name: 'Animations', color: 'bg-purple-100 text-purple-800' },
            { id: 'poster', name: 'Posters', color: 'bg-yellow-100 text-yellow-800' }
        ];

        // Filter projects by active category
        const filteredProjects = computed(() => {
            if (activeCategory.value === 'all') {
                return projects.value;
            }
            return projects.value.filter(project => project.category === activeCategory.value);
        });

        // Watch filtered projects and load their images if not already loaded
        watch(filteredProjects, async (newProjects) => {
            // Load thumbnails for newly visible projects
            for (const project of newProjects) {
                if (!loadedProjects.value.has(project.id)) {
                    loadedProjects.value.add(project.id);
                    if (project.images && project.images.length > 0) {
                        project.thumbnail = await getImage(project.images[0], null, { lazy: true });
                    }
                }
            }
        }, { immediate: false });

        const getCategoryName = (categoryId) => {
            const category = categories.find(c => c.id === categoryId);
            return category ? category.name : 'Other';
        };

        const getCategoryClass = (categoryId) => {
            const category = categories.find(c => c.id === categoryId);
            return category ? category.color : 'bg-gray-100 text-gray-800';
        };

        // Initialize only the projects we need immediately
        const loadInitialThumbnails = async (projects, limit = 6) => {
            // Load first batch of thumbnails immediately - these are above the fold
            const initialProjects = projects.slice(0, limit);
            for (const project of initialProjects) {
                if (project.images && project.images.length > 0) {
                    loadedProjects.value.add(project.id);
                    project.thumbnail = await getImage(project.images[0]);
                }
            }

            // Then load the rest with lazy loading
            setTimeout(() => {
                projects.slice(limit).forEach(async project => {
                    if (project.images && project.images.length > 0 && !loadedProjects.value.has(project.id)) {
                        loadedProjects.value.add(project.id);
                        project.thumbnail = await getImage(project.images[0], null, { lazy: true });
                    }
                });
            }, 200);
        };

        onMounted(async () => {
            // Load project data
            await loadProjects();

            // Load initial thumbnails
            await loadInitialThumbnails(projects.value);
        });

        const loadProjects = async () => {
            try {
                // Define projects array with placeholder images
                projects.value = [
                    {
                        id: 1,
                        title: 'The Wachters',
                        category: 'character',
                        thumbnail: null,
                        description: 'A detailed character design showcasing my skills in creating realistic 3D models.',
                        images: ['Characters/De Wachters.jpg'],
                        videos: [],
                        fullDescription: 'The Wachters is a character design project focused on creating a mysterious guardian figure. This project highlights my expertise in character modeling, texturing, and rendering in Blender.'
                    },
                    {
                        id: 2,
                        title: 'ROBOTOAD',
                        category: 'character',
                        thumbnail: null,
                        description: 'An adventurous journey into sci-fi world-building with unique character designs.',
                        images: ['Characters/ROBOTOAD character design.jpg', 'Characters/Skylander character design  kopie.jpg'],
                        videos: ['2.mp4'],
                        fullDescription: 'ROBOTOAD combines organic and mechanical elements in a unique character design. This project explores the intersection of nature and technology through detailed modeling and texturing techniques.'
                    },
                    {
                        id: 3,
                        title: 'Curse of the Cliffs',
                        category: 'poster',
                        thumbnail: null,
                        description: 'Environmental storytelling through intricate landscapes and atmospheric lighting.',
                        images: ['Posters/Poster Curse of the cliffs Artistiek dossier kopie.jpg', 'Backgrounds/Achtergrond longshot (1) kopie.jpg'],
                        videos: [],
                        fullDescription: 'This poster for "Curse of the Cliffs" showcases my ability to create dramatic environments with compelling atmosphere and lighting that tells a story through visual elements alone.'
                    },
                    {
                        id: 4,
                        title: 'Liver and Bone',
                        category: 'poster',
                        thumbnail: null,
                        description: 'Experimental project playing with organic forms and textures.',
                        images: ['Posters/Poster Liver and Bone.jpg'],
                        videos: [],
                        fullDescription: 'Liver and Bone is an artistic exploration of organic textures and forms, pushing the boundaries of what can be achieved with Blender\'s material system and lighting techniques.'
                    },
                    {
                        id: 5,
                        title: 'Monster Animation',
                        category: 'animation',
                        thumbnail: null,
                        description: 'Character animation showcasing movement and personality.',
                        images: ['Characters/Het Monster.jpg'],
                        videos: ['1.mp4', '3.mp4'],
                        fullDescription: 'This animation project focuses on bringing characters to life through fluid movement and expressive actions, demonstrating my skills in rigging and animation within Blender.'
                    },
                    {
                        id: 6,
                        title: 'Tower Room',
                        category: 'environment',
                        thumbnail: null,
                        description: 'Detailed interior environment with rich textures and lighting.',
            images: ['Backgrounds/render torenkamer .jpg'],
            videos: ['4.mp4'],
            fullDescription: 'The Tower Room is an environment design project featuring intricate architectural details, custom textures, and dramatic lighting that creates a mysterious atmosphere.'
          },
          {
            id: 7,
            title: 'Frog Background Series',
            category: 'environment',
            thumbnail: null,
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
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    
    return {
      projects,
      filteredProjects,
      activeCategory,
      categories,
      getCategoryName,
      getCategoryClass
    };
  }
}
</script>