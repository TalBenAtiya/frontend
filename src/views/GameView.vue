<script>
import Filter from "../components/Filter.vue";
import GamePreview from "../components/GamePreview.vue";
export default {
  components: { GamePreview, Filter },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "loadGames" });
  },
  computed: {
    games() {
      return this.$store.getters.games;
    },
  },
  methods: {
    addToCart(game) {
      this.$store.dispatch({ type: "addToCart", game });
    },
    filterGames(critirea) {
      this.$router.push({
        path: "/games",
        query: {
          price: critirea.price,
          genres: critirea.genres.length ? critirea.genres.join(" ") : null,
          name: critirea.name,
        },
      });
    },
  },
  unmounted() {
    this.$store.dispatch({ type: "loadGames" });
  },
  updated() {
    if (this.$route.query !== this.query) {
      this.query = this.$route.query;
      const critirea = {
        price: this.$route.query.price,
        genres: this.$route.query.genres
          ? this.$route.query.genres.split(" ")
          : [],
        name: this.$route.query.name,
      };
      this.$store.dispatch({ type: "loadGames", critirea });
    }
  },
};
</script>

<template>
  <section v-if="games" class="game-view main-layout">
    <div class="filter">
      <Filter @filter-games="filterGames" />
    </div>
    <div class="game-list">
      <GamePreview
        @add-to-cart="addToCart"
        v-for="game in games"
        :key="game._id"
        :game="game"
      />
    </div>
  </section>
</template>
    
<style lang="scss">
.game-view {
  display: flex;
  gap: 20px;
  flex: 1;
}

.filter {
  flex: 1;
  height: fit-content;
  font-size: 14px;
  position: sticky;
  top: 110px;
}

.game-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: 230px;
  column-gap: 15px;
  row-gap: 10px;
  flex: 5;
}
</style>