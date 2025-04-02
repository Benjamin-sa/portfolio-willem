<template>
  <Navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" @before-leave="handleTransitionBeforeLeave"
      @after-enter="handleTransitionAfterEnter">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    handleTransitionBeforeLeave() {
      // This event fires before a component is removed during transition
      // We can use this to ensure proper cleanup before transitions
      console.log('Component transition: before-leave');
    },
    handleTransitionAfterEnter() {
      // This event fires after a component is fully inserted
      // We can use this to ensure proper initialization after transitions
      console.log('Component transition: after-enter');
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
