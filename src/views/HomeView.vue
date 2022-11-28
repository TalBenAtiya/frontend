<script>
import DynamicCmp from "../components/DynamicCmp.vue";
import FeaturedGames from "../components/FeaturedGames.vue";
import Loader from '../components/Loader.vue';
export default {
  components: { FeaturedGames, DynamicCmp, Loader },
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
    // this.startInterval();
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
    gamesOnSale() {
      return this.$store.getters.games.filter((game) => game.price <= 100);
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
    goToRoute() {
      this.$router.push(`/games?price=100&genres&name=`);
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
      <dynamic-cmp :games="actionGames.slice(0, 3)" :type="'Action'" />
      <dynamic-cmp :games="adventureGames.slice(3, 6)" :type="'Adventure'" />
      <dynamic-cmp :games="rpgGames.slice(0, 3)" :type="'RPG'" />
    </div>
    <div class="games-on-sale">
      <h2>Games Under $100</h2>
      <div class="sale-container">
        <div
          v-for="game in gamesOnSale.slice(
            gamesOnSale.length - 4,
            gamesOnSale.length
          )"
          :key="game._id"
          class="sale-card"
          @click="this.$router.push(`/games/${game._id}`)"
        >
          <img :src="`${game.imgUrl}`" alt="" />
          <div class="info">
            <h4>{{ game.title }}</h4>
            <p class="description">{{ game.description }}</p>
            <span>${{ game.price }}</span>
          </div>
        </div>
      </div>
      <button @click="goToRoute" class="btn show-all">Show All</button>
    </div>
  </section>
  <section v-else class="main-layout">
    <loader />
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
    margin-top: 120px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--clr-gray);
    width: fit-content;
  }

  .genres-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 50px;
  }

  .games-on-sale {
    display: flex;
    flex-direction: column;

    .show-all {
      align-self: flex-end;
      background-color: transparent;
      color: var(--clr-white);
      margin-top: 20px;
      padding-inline-end: 20px;

      &:hover {
        color: var(--clr-main-red);
      }
    }
    .sale-container {
      margin-top: 25px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding-inline: 20px;
    }

    .sale-card {
      overflow: hidden;
      display: flex;
      gap: 10px;
      justify-content: space-between;
      padding-inline-end: 10px;
      background-color: var(--clr-gray);
      border-radius: 0.5em;
      transition: 0.4s;
      cursor: pointer;

      &:hover {
        background-color: var(--clr-highlight);
      }

      img {
        height: 100px;
        width: 80px;
        object-fit: cover;
        object-position: top;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .description {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          max-height: 3em;
          font-size: 13px;
        }
      }

      span {
        align-self: flex-end;
        background-color: var(--clr-black);
        padding: 5px;
        border-radius: 0.4em;
      }
    }
  }
}
</style>