<template>
  <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-500" :class="{
    'opacity-100 bg-secondary bg-opacity-90 shadow-lg': scrolled,
    'bg-secondary bg-opacity-90 opacity-0 hover:opacity-100': !scrolled && !isOpen && !isProjectsPage,
    'bg-secondary bg-opacity-90': !scrolled && !isOpen && isProjectsPage,
    'opacity-100': isOpen
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-white font-bold text-xl">Portfolio</router-link>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <router-link v-for="(item, index) in navItems" :key="index" :to="item.path"
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
            {{ item.name }}
          </router-link>
        </div>
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-gray-300 hover:text-white">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Full-screen Mobile menu overlay -->
    <div v-if="isOpen" class="md:hidden fixed inset-0 bg-secondary bg-opacity-95 z-50 flex items-center justify-center">
      <div class="absolute top-0 right-0 p-4">
        <button @click="toggleMenu" class="text-white hover:text-gray-300 transition-colors">
          <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="text-center">
        <router-link v-for="(item, index) in navItems" :key="index" :to="item.path"
          class="text-white hover:text-gray-300 block px-3 py-4 text-2xl font-light tracking-wide transition-all"
          :style="{ animationDelay: `${index * 0.1}s` }" @click="closeMenu">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false,
      scrolled: false,
      navItems: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  },
  computed: {
    isProjectsPage() {
      // Check if current route starts with /projects
      return this.$route.path.startsWith('/projects');
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // Apply scrolled state immediately if page loads scrolled down
    this.handleScroll();
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;

      // No longer adding pointer-events-none class via JavaScript
      // Let CSS handle this with our new hover system
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;

      // When opening menu, always make sure pointer events are enabled
      if (this.isOpen) {
        document.querySelector('nav').classList.remove('pointer-events-none');
      }

      // Toggle body scroll when menu is open
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }
}
</script>

<style scoped>
/* Add animations for mobile menu items */
.text-2xl {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure all nav elements are clickable */
nav,
nav a,
nav button {
  pointer-events: auto !important;
}

/* Remove the hover-trigger, hover-hide system that's causing issues */
/* Simplify with standard hover state */
nav {
  transition: opacity 0.3s ease;
}

nav:hover {
  opacity: 1 !important;
  background-color: rgba(31, 41, 55, 0.9);
}

/* IMPORTANT: Remove the problematic hover detection zone */
/* 
.hover-trigger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: auto;
}
*/

/* Mobile menu styles remain unchanged */
</style>
