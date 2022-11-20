<script>
import AppHeader from "./components/AppHeader.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {};
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


<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>