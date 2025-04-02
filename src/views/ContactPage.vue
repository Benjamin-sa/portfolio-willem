<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Contact Header -->
        <section class="relative bg-secondary py-24">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    Have a project in mind or want to discuss a collaboration? I'd love to hear from you.
                </p>
            </div>
        </section>

        <!-- Contact Content -->
        <section class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Contact Form -->
                    <div class="bg-white rounded-lg shadow-lg p-8">
                        <h2 class="text-2xl font-bold mb-6">Send Me a Message</h2>
                        
                        <form @submit.prevent="submitForm">
                            <div class="mb-6">
                                <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    v-model="form.name"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    :class="{'border-red-500': errors.name}"
                                    placeholder="Enter your name"
                                >
                                <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
                            </div>
                            
                            <div class="mb-6">
                                <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    v-model="form.email"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    :class="{'border-red-500': errors.email}"
                                    placeholder="Enter your email"
                                >
                                <p v-if="errors.email" class="mt-1 text-red-500 text-sm">{{ errors.email }}</p>
                            </div>
                            
                            <div class="mb-6">
                                <label for="subject" class="block text-gray-700 font-medium mb-2">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    v-model="form.subject"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    :class="{'border-red-500': errors.subject}"
                                    placeholder="What is this regarding?"
                                >
                                <p v-if="errors.subject" class="mt-1 text-red-500 text-sm">{{ errors.subject }}</p>
                            </div>
                            
                            <div class="mb-6">
                                <label for="message" class="block text-gray-700 font-medium mb-2">Your Message</label>
                                <textarea 
                                    id="message" 
                                    v-model="form.message"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary h-40"
                                    :class="{'border-red-500': errors.message}"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                                <p v-if="errors.message" class="mt-1 text-red-500 text-sm">{{ errors.message }}</p>
                            </div>
                            
                            <div class="pt-2">
                                <button 
                                    type="submit"
                                    class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                    :disabled="isSubmitting"
                                >
                                    <span v-if="isSubmitting">Sending...</span>
                                    <span v-else>Send Message</span>
                                </button>
                            </div>
                        </form>

                        <div v-if="submitSuccess" class="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
                            Thank you for your message! I'll get back to you as soon as possible.
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <div class="bg-secondary text-white rounded-lg shadow-lg p-8">
                        <h2 class="text-2xl font-bold mb-6">Contact Information</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="bg-primary rounded-full p-3 mr-4">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-medium mb-1">Email</h3>
                                    <p class="text-gray-300">contact@example.com</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="bg-primary rounded-full p-3 mr-4">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-medium mb-1">Phone</h3>
                                    <p class="text-gray-300">+1 (123) 456-7890</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="bg-primary rounded-full p-3 mr-4">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-medium mb-1">Location</h3>
                                    <p class="text-gray-300">Amsterdam, Netherlands</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-10">
                            <h3 class="text-lg font-medium mb-4">Follow Me</h3>
                            <div class="flex space-x-4">
                                <a href="#" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="#" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                                    </svg>
                                </a>
                                <a href="#" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Google Map or Location Image -->
        <section class="py-16 bg-gray-100">
            <div class="max-w-6xl mx-auto px-4">
                <div class="h-96 bg-gray-300 rounded-lg overflow-hidden">
                    <!-- Here you could embed a Google Map or add a custom location image -->
                    <div class="w-full h-full flex items-center justify-center">
                        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'ContactPage',
    setup() {
        const form = ref({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        
        const errors = ref({});
        const isSubmitting = ref(false);
        const submitSuccess = ref(false);
        
        const validateForm = () => {
            const newErrors = {};
            
            if (!form.value.name.trim()) {
                newErrors.name = 'Name is required';
            }
            
            if (!form.value.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            
            if (!form.value.subject.trim()) {
                newErrors.subject = 'Subject is required';
            }
            
            if (!form.value.message.trim()) {
                newErrors.message = 'Message is required';
            } else if (form.value.message.trim().length < 10) {
                newErrors.message = 'Message must be at least 10 characters';
            }
            
            errors.value = newErrors;
            return Object.keys(newErrors).length === 0;
        };
        
        const submitForm = async () => {
            if (!validateForm()) {
                return;
            }
            
            isSubmitting.value = true;
            
            try {
                // In a real application, you would send this data to your backend
                // Simulating API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                console.log('Form submitted:', form.value);
                
                // Reset the form
                form.value = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };
                
                submitSuccess.value = true;
                setTimeout(() => {
                    submitSuccess.value = false;
                }, 5000);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again later.');
            } finally {
                isSubmitting.value = false;
            }
        };
        
        return {
            form,
            errors,
            isSubmitting,
            submitSuccess,
            submitForm
        };
    }
}
</script>
