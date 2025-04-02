<template>
  <footer class="bg-secondary text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Portfolio</h3>
          <p class="text-gray-400">Showcasing my creativity and expertise through innovative projects.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Links</h3>
          <ul class="space-y-2">
            <li v-for="(item, index) in navItems" :key="index">
              <router-link :to="item.path" class="text-gray-400 hover:text-white transition">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Connect</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-github text-xl"></i></a>
            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin text-xl"></i></a>
            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-xl"></i></a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Your Portfolio. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      navItems: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  }
}
</script>
