<template>
    <section class="py-16 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Featured Work</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(project, index) in projects" :key="index"
                    class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                    <div class="relative pb-[56.25%] overflow-hidden">
                        <img :src="project.thumbnail" :alt="project.title"
                            class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ project.description }}</p>
                        <router-link :to="`/projects/${project.id}`"
                            class="inline-block text-primary hover:text-primary-dark font-medium">
                            View Project →
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="text-center mt-12">
                <router-link to="/projects"
                    class="inline-block bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    View All Projects
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getImage } from '@/services/mediaService';

export default {
    name: 'FeaturedProjects',
    setup() {
        const projects = ref([
            {
                id: 1,
                title: 'The Wachters',
                thumbnail: null,
                description: 'A detailed character design showcasing my skills in creating realistic 3D models.'
            },
            {
                id: 2,
                title: 'ROBOTOAD',
                thumbnail: null,
                description: 'An adventurous journey into sci-fi world-building with unique character designs.'
            },
            {
                id: 3,
                title: 'Curse of the Cliffs',
                thumbnail: null,
                description: 'Environmental storytelling through intricate landscapes and atmospheric lighting.'
            }
        ]);

        const loadProjectImages = async () => {
            try {
                // Load project thumbnails with lazy loading
                projects.value[0].thumbnail = await getImage('Characters/De Wachters.jpg', null, { lazy: true });
                projects.value[1].thumbnail = await getImage('Characters/ROBOTOAD character design.jpg', null, { lazy: true });
                projects.value[2].thumbnail = await getImage('Posters/Poster Curse of the cliffs Artistiek dossier kopie.jpg', null, { lazy: true });
            } catch (error) {
                console.error('Error loading project images:', error);
            }
        };

        onMounted(() => {
            loadProjectImages();
        });

        return {
            projects
        };
    }
}
</script>
