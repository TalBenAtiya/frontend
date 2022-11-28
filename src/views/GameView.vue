<script>
import Filter from "../components/Filter.vue";
import GamePreview from "../components/GamePreview.vue";
import FilterSvg from '../components/svgs/FilterSvg.vue';
export default {
  components: { GamePreview, Filter, FilterSvg },
  data() {
    return {
      isFilterOpen: false,
    };
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
    toggleFilterMenu() {
      this.isFilterOpen = !this.isFilterOpen;
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
    <div :class="isFilterOpen ? 'filter open' : 'filter'">
      <Filter @filter-games="filterGames" />
      <button title="Filters" class="btn btn-open-filter" @click="toggleFilterMenu">
        <filter-svg class="filter-svg" />
      </button>
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

  

  @media (max-width: 560px) {
    position: fixed;
    top: 70px;
    padding-block-start: 35px;
    z-index: 5;
    background-color: var(--clr-black);
    height: 100%;
    padding-inline-end: 20px;
    left: -170px;
    transition: 0.5s;

    &.open {
    left: 0px;
    padding-inline: 15px;
    width: 50%;

    .btn-open-filter {
      right: -13px;
    }
  }
  }

  .btn-open-filter {
    position: absolute;
    right: -20px;
    background-color: var(--clr-black);
    border: 1px solid var(--clr-white);
    top: 45px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: none;
    transition: 0.5s;

    @media (max-width: 560px) {
      display: flex;
    }

    .filter-svg {
      rotate: 180deg;
      path {
        fill: var(--clr-main-red);
      }
    }
  }
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