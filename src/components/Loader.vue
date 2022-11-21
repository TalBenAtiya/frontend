<script>
import LoaderSvg from "./svgs/LoaderSvg.vue";
export default {
  components: { LoaderSvg },
  data() {
    return {};
  },
};
</script>

<template>
  <section class="loader">
    <loader-svg class="loader-svg" />
  </section>
</template>

<style lang="scss">
@keyframes slide {
  0% {
  }
  50% {
    left: 50%;
    translate: -50%;
  }
  100% {
    left: 120%;
  }
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .loader-svg {
    position: absolute;
    left: -15%;
    animation: slide 2.5s infinite;
  }
}
</style>

