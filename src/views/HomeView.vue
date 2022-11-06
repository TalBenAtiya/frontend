<script>
export default {
  data() {},
  created() {
    this.$store.dispatch({ type: "loadGames" });
  },
  computed: {
    games() {
      return this.$store.getters.games;
    },
    currGame() {
      return this.games[18];
    },
  },
};
</script>

<template>
  <section class="home main-layout">
    <div class="featured-container">
      <div v-if="currGame" class="game-display">
        <img :src="`${currGame.imgUrl}`" alt="Game Image" />
        <div class="darker-img"></div>
        <div class="game-info">
          <h1>{{ currGame.title }}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            odit illum, amet maiores esse nostrum enim praesentium provident
            laboriosam nobis! Minus dignissimos amet quam excepturi laboriosam
            quibusdam, doloremque ex beatae?
          </p>
          <h4>Get for $80</h4>
          <button>Buy Now</button>
        </div>
      </div>
      <div class="featured-games">
        <div v-for="game in games.slice(0, 5)" :key="game._id" class="card">
          <img :src="`${game.imgUrl}`">
          <h4>{{ game.title }}</h4>
        </div>
      </div>
    </div>
    <article class="sales-container">
  </section>
</template>

<style lang="scss">
.home {
  .featured-container {
    display: grid;
    grid-template-columns: repeat(5, minmax(150px, 350px));
    grid-template-rows: repeat(5, 120px);
    column-gap: 20px;
  }

  .featured-games {
    display: flex;
    flex-direction: column;
    grid-row: 1/-1;


    .card {
      display: flex;
      padding: 10px;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      border-radius: 0.4em;
      transition: 0.3s;

      &:hover {
        background-color: rgb(54, 54, 54);
      }

      img {
        height: 100px;
        width: 80px;
        object-fit: cover;
        border-radius: 0.3em;
      }
    }
  }

  .game-display {
    display: flex;
    grid-column: 1/5;
    grid-row: 1/-1;
    position: relative;
    overflow: hidden;
    align-items: flex-end;
    border-radius: 0.5em;

    .game-info {
      padding: 15px;
      display: flex;
      flex-direction: column;
      color: rgb(255, 255, 255);
      gap: 20px;

      h1 {
        font-size: 38px;
        margin-block-end: 25px;
        font-family: monts-semibold;
      }

      p {
        max-width: 350px;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0.4em;
        padding: 15px;
        cursor: pointer;
        width: fit-content;
      }
    }

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: -2;
      object-fit: cover;
    }

    .darker-img {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.103);
      z-index: -1;
    }
  }
}
</style>