<script>
import AppHeader from "./components/AppHeader.vue";
import Footer from './components/Footer.vue';

export default {
  data() {
    return {
      
    }
  },
  components: { AppHeader, Footer },
};
</script>
    AppHeader


<template>
  <AppHeader />
  <RouterView />
  <Footer />
</template>


<style>
</style>