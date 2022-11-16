<script>
import DynamicCmp from '../components/DynamicCmp.vue';
import FeaturedGames from "../components/FeaturedGames.vue";
export default {
  components: { FeaturedGames, DynamicCmp,},
  data() {
    return {
      idx: 0,
      gamesInterval: null,
      actionGames: [],
      adventureGames: [],
      rpgGames: [],
    };
  },
  created() {
    this.$store.dispatch({ type: "loadGames" });
    this.startInterval();
  },
  updated() {
    if (this.actionGames.length <= 0) {
      this.$store.getters.games.forEach((game) => {
        if (game.genres.some((genre) => genre.name === "Action")) {
          this.actionGames.push(game);
        }
        if (game.genres.some((genre) => genre.name === "Adventure")) {
          this.adventureGames.push(game);
        }
        if (game.genres.some((genre) => genre.name === "RPG")) {
          this.rpgGames.push(game);
        }
      });
    }
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
    <h1>Featured Games</h1>
    <FeaturedGames :games="games" :currGame="currGame" @set-idx="setIdx" />
    <h2>Games Genres</h2>
    <div class="genres-container">
     <dynamic-cmp :games="actionGames.slice(0,3)" :type="'Action'" />
     <dynamic-cmp :games="adventureGames.slice(3,6)" :type="'Adventure'" />
     <dynamic-cmp :games="rpgGames.slice(0,3)" :type="'RPG'" />
    </div>
  </section>
</template>

<style lang="scss">
.home {
  h2,
  h1 {
    font-family: monts-thin;
    margin-bottom: 20px;
    font-size: 35px;
  }

  h2 {
    margin-top: 45px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--clr-gray);
    width: fit-content;
  }

  .genres-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;

    h3 {
      font-family: monts-light;
      margin-bottom: 10px;
      font-size: 20px;
      border-bottom: 1px solid var(--clr-gray);
      padding-block: 10px;
      text-align: center;
      border-top-right-radius: 0.3em;
      border-top-left-radius: 0.3em;
    }
  }
}
</style>