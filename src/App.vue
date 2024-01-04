<template>
  <Banner></Banner>
  <router-view />
</template>

<script>
import './charts/ChartjsConfig';
import Banner from './components/Banner.vue';
import { useAuthStore } from './stores/auth.store.js';

export default {
  components: {
    Banner
  },

  setup () {
    const authStore = useAuthStore();

    return {
      authStore,
    }
  }
}
</script>

