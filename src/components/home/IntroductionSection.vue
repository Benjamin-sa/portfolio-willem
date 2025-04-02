<template>
    <section ref="sectionRef" class="py-20 bg-white overflow-hidden">
        <div class="max-w-5xl mx-auto px-4">
            <!-- Section heading with decorative elements -->
            <div class="relative text-center mb-16">
                <div
                    class="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary opacity-5">
                </div>
                <h2 class="text-3xl md:text-4xl font-bold relative z-10">About My Art</h2>
                <div class="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <!-- Introduction text with enhanced styling -->
            <div class="max-w-3xl mx-auto mb-12 transition-all duration-700 transform"
                :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
                <p class="text-lg text-gray-700 text-center leading-relaxed">
                    I'm a passionate 3D artist specializing in creating stunning visual experiences with Blender.
                    My work spans from character design to environment building, focusing on storytelling through
                    detailed and immersive 3D worlds.
                </p>
            </div>

            <!-- Skills indicators -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-300 transform"
                :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
                <div v-for="(skill, index) in skills" :key="index"
                    class="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    :style="{ transitionDelay: `${index * 100 + 300}ms` }">
                    <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-primary">
                        <span v-html="skill.icon"></span>
                    </div>
                    <h3 class="font-medium text-gray-900">{{ skill.name }}</h3>
                </div>
            </div>

            <!-- View More button with consistent styling -->
            <div class="text-center mt-12 transition-all duration-700 delay-700 transform"
                :class="[isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
                <ViewMoreButton @click="scrollToProjects" />
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ViewMoreButton from './ViewMoreButton.vue';

export default {
    name: 'IntroductionSection',
    components: {
        ViewMoreButton
    },
    setup() {
        const sectionRef = ref(null);
        const isVisible = ref(false);
        let observer = null;

        // Skill items with SVG icons as strings (avoiding JSX)
        const skills = [
            {
                name: 'Character Design',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>'
            },
            {
                name: 'Environment',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
            },
            {
                name: 'Animation',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            },
            {
                name: 'Rendering',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>'
            }
        ];

        const scrollToProjects = () => {
            // Get the FeaturedProjects component and scroll to it
            const projectsSection = document.querySelector('section.py-16.bg-gray-100');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        onMounted(() => {
            // Set up intersection observer to detect when section is visible
            observer = new IntersectionObserver((entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    // Once animation has played, we can disconnect the observer
                    observer.disconnect();
                }
            }, {
                threshold: 0.2 // Trigger when 20% of the element is visible
            });

            if (sectionRef.value) {
                observer.observe(sectionRef.value);
            }
        });

        onUnmounted(() => {
            // Clean up observer on component unmount
            if (observer) {
                observer.disconnect();
            }
        });

        return {
            sectionRef,
            isVisible,
            skills,
            scrollToProjects
        };
    }
}
</script>
