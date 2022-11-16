<script>
import FeaturedGames from "../components/FeaturedGames.vue";
export default {
  components: { FeaturedGames},
  data() {
    return {
      idx: 0,
      gamesInterval: null,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadGames" });
    this.startInterval();
  },
  unmounted() {
    clearInterval(this.gamesInterval);
  },
  computed: {
    games() {
      return this.$store.getters.games;
    },
    currGame() {
      return this.games[this.idx];
    },
  },
  methods: {
    setIdx(idx) {
      clearInterval(this.gamesInterval);
      this.idx = idx;
      this.startInterval();
    },
    startInterval() {
      this.gamesInterval = setInterval(() => {
        if (this.idx >= 4) this.idx = 0;
        else this.idx++;
      }, 8000);
    },
  },
};
</script>

<template>
  <section v-if="currGame" class="home main-layout">
    <h2>Featured Games</h2>
    <FeaturedGames :games="games" :currGame="currGame" @set-idx="setIdx" />
  </section>
</template>

<style lang="scss">
.home {

  h2 {
    font-family: monts-thin;
    margin-bottom: 20px;
    font-size: 35px;
  }
}
</style>