<template>
    <div class="min-h-screen bg-gray-50">
        <!-- About Header -->
        <section class="relative bg-secondary py-24">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    3D Artist, Designer & Animator
                </p>
            </div>
        </section>

        <!-- About Content -->
        <section class="py-16 px-4">
            <div class="max-w-5xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/3">
                            <div class="h-64 md:h-full bg-gray-200 relative">
                                <img src="@/assets/images/profile.jpg" alt="Profile" class="w-full h-full object-cover"
                                    @error="onImageError" />
                            </div>
                        </div>
                        <div class="md:w-2/3 p-8">
                            <h2 class="text-3xl font-bold mb-4">Willem Doe</h2>
                            <p class="text-gray-700 mb-6">
                                I'm a passionate 3D artist with over 5 years of experience creating stunning visuals and
                                immersive environments.
                                My journey in 3D began with a fascination for bringing imagination to life, and I've
                                been dedicated to perfecting
                                my craft ever since.
                            </p>
                            <p class="text-gray-700 mb-6">
                                Specializing in character design, environment building, and animation, I strive to
                                create work that balances technical
                                excellence with artistic vision. Each project is an opportunity to push boundaries and
                                explore new creative territories.
                            </p>
                            <div class="flex space-x-4">
                                <a href="#" class="text-primary hover:text-blue-700">Instagram</a>
                                <a href="#" class="text-primary hover:text-blue-700">ArtStation</a>
                                <a href="#" class="text-primary hover:text-blue-700">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="py-16 px-4 bg-gray-100">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-12">My Skills</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold border-b border-gray-200 pb-3 mb-4">Software</h3>
                        <ul class="space-y-2">
                            <li class="flex justify-between items-center">
                                <span>Blender</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 95%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Maya</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 80%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>ZBrush</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 75%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Substance Painter</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Photoshop</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 90%"></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold border-b border-gray-200 pb-3 mb-4">Specialties</h3>
                        <ul class="space-y-2">
                            <li class="flex justify-between items-center">
                                <span>Character Modeling</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 90%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Environment Design</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Texturing</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 80%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Animation</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 75%"></div>
                                </div>
                            </li>
                            <li class="flex justify-between items-center">
                                <span>Lighting & Rendering</span>
                                <div class="w-2/5 bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 90%"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <section class="py-16 px-4">
            <div class="max-w-5xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-12">Experience & Education</h2>

                <div class="space-y-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <h3 class="text-xl font-bold">Freelance 3D Artist</h3>
                            <span class="text-gray-600">2018 - Present</span>
                        </div>
                        <p class="text-gray-700">
                            Working with various clients to create custom 3D models, animations, and visual effects for
                            games, films, and marketing materials.
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <h3 class="text-xl font-bold">Junior 3D Artist at Creative Studios</h3>
                            <span class="text-gray-600">2016 - 2018</span>
                        </div>
                        <p class="text-gray-700">
                            Collaborated with a team of artists to create 3D assets for video games and animated shorts.
                            Responsible for modeling, texturing, and basic animation.
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <h3 class="text-xl font-bold">Bachelor of Fine Arts, Digital Media</h3>
                            <span class="text-gray-600">2012 - 2016</span>
                        </div>
                        <p class="text-gray-700">
                            University of Creative Arts. Focused on 3D modeling, animation, and digital storytelling.
                            Graduated with honors.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 px-4 bg-secondary text-white text-center">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold mb-6">Interested in working together?</h2>
                <p class="text-xl text-gray-300 mb-8">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your
                    visions.
                </p>
                <router-link to="/contact"
                    class="inline-block bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Get in Touch
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';
import { generatePlaceholder } from '@/services/mediaService';

export default {
    name: 'AboutPage',
    setup() {
        const onImageError = (event) => {
            // Replace broken image with a placeholder
            event.target.src = generatePlaceholder('Profile Picture', 400, 600);
        };

        return {
            onImageError
        };
    }
}
</script>
