<script>
import GamePreview from "../components/GamePreview.vue";
export default {
  components: { GamePreview },
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
      this.$store.dispatch({type:'addToCart' , game})
    },
  },
};
</script>

<template>
  <section v-if="games" class="game-view main-layout">
    <div class="filter">
      <h4>Filters</h4>
      <input type="text" placeholder="Search by name" />
      <label for="max-price">Max Price</label>
      <input type="range" id="max-price" />
      <label for="min-price">Min Price</label>
      <input type="range" id="min-price" />
      <h4>Genres</h4>
      <span>Action</span>
      <span>Adventure</span>
      <span>Indie</span>
      <span>Puzzle</span>
      <span>RPG</span>
      <span>Shooter</span>
    </div>
    <div class="game-list">
      <game-preview
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
}

.filter {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--clr-gray);
  flex: 1;
  border-radius: 0.4em;
  padding-block: 10px;
  height: fit-content;
  font-size: 14px;

  label {
    display: flex;
    padding-inline: 6px;
    padding-block: 10px;
  }

  input {
    padding: 5px;
    border: none;
    background-color: var(--clr-gray);
  }

  h4 {
    font-family: monts-medium;
    border-block-end: 3px solid var(--clr-gray);
    text-align: center;
    padding-block-end: 5px;
  }

  span {
    display: flex;
    padding-block: 10px;
    border-block-end: 1px solid var(--clr-gray);
    padding-inline: 6px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: var(--clr-gray);
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