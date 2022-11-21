<script>
import Loader from '../components/Loader.vue';
import ArrowSvg from "../components/svgs/ArrowSvg.vue";
import BackArrowSvg from "../components/svgs/BackArrowSvg.vue";
import CartSvg from "../components/svgs/CartSvg.vue";

export default {
  components: { ArrowSvg, CartSvg, BackArrowSvg, Loader },
  data() {
    return {
      imgUrl: null,
      imgInterval: null,
    };
  },
  created() {
    const id = this.$route.params.gameId;
    this.$store.dispatch({ type: "loadGame", id });
  },
  mounted() {
    this.setInterval();
  },
  unmounted() {
    clearInterval(this.imgInterval);
    this.$store.commit({ type: "setGame", game: null });
  },
  computed: {
    game() {
      return this.$store.getters.game;
    },
  },
  methods: {
    setImg(idx) {
      clearInterval(this.imgInterval);
      this.imgUrl = {
        idx,
        url: this.game.screenshots[idx].image,
      };
      this.setInterval();
    },
    setInterval() {
      this.imgInterval = setInterval(() => {
        this.changeImg("front");
      }, 8000);
    },
    changeImg(str) {
      if (!this.game) return;
      let idx = this.imgUrl?.idx || 0;
      if (str === "front") {
        if (idx >= this.game.screenshots.length - 1) idx = 0;
        else idx++;
        this.setImg(idx);
      } else {
        if (idx <= 0) idx = this.game.screenshots.length - 1;
        else idx--;
        this.setImg(idx);
      }
    },
    goBack() {
      this.$router.push('/games')
    }
  },
};
</script>

<template>
  <section v-if="game" class="game-details main-layout">
    <button @click="goBack()" class="btn back">
      <BackArrowSvg />
    </button>
    <article class="game-container">
      <h2>{{ game.title }}</h2>
      <div class="img-container">
        <button @click="changeImg('back')" class="btn arrow-back">
          <arrow-svg />
        </button>
        <img v-if="imgUrl" :src="`${imgUrl.url}`" />
        <img v-else :src="`${game.imgUrl}`" />
        <button @click="changeImg('front')" class="btn arrow-front">
          <arrow-svg />
        </button>
      </div>
      <div class="screenshots-container">
        <div v-for="(img, idx) in game.screenshots" :key="img._id" class="card" @click="setImg(idx)">
          <img :src="`${img.image}`" />
        </div>
      </div>
      <div class="info"></div>
    </article>
    <div class="side-container">
      <h3>Game Info :</h3>
      <p>{{ game.description }}</p>
      <button class="add-to-cart">
        <cart-svg /> <span>Add To Cart</span>
      </button>
      <span class="date">Release Date: <span>{{ game.released }}</span></span>
      <div class="genres">
        <span v-for="genre in game.genres" :key="genre" class="label">
          {{ genre.name }}
        </span>
      </div>
    </div>
  </section>
  <section v-else><loader /></section>
</template>

<style lang="scss">
.game-details {
  display: flex;
  gap: 30px;
  justify-content: space-between;

  .back {
    @keyframes arrow-translate {
      0% {
        padding-right: 0px;
        translate: 0 0;
      }
      
      50% {
        padding-right: 15px;
        translate: -15px 0;
      }

      100% {
        padding-right: 0px;
        translate: 0px 0;
      }
    }

    position: absolute;
    top: 130px;
    left: 60px;
    border-radius: 50%;
    background-color: transparent;
    transition: 0.4s;

    &:hover {
      animation: arrow-translate 0.8s linear infinite;
      svg {
        fill: var(--clr-main-red);
      }
    }

    svg {
      width: 30px;
      height: 30px;
      fill: white;
    }
  }

  h2 {
    margin-bottom: 20px;
    font-family: monts-bold;
    font-size: 35px;
  }

  .game-container {
    flex: 8;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .img-container {
      position: relative;

      &:hover {
        .btn {
          box-shadow: 0px 0px 50px -4px rgba(0, 0, 0, 0.5);

          svg {
            opacity: 1;
          }
        }
      }

      img {
        width: 100%;
        margin-bottom: 20px;
        border-radius: 0.5em;
        height: 600px;
        object-fit: cover;
        object-position: 100% 0;
      }

      .btn {
        position: absolute;
        height: 50px;
        width: 50px;
        top: 50%;
        translate: 0% -50%;
        border-radius: 50%;
        display: flex;
        padding-right: 10px;
        background-color: transparent;
        transition: 0.3s;

        svg {
          width: 35px;
          height: 35px;
          opacity: 0;
          transition: 0.3s;

          path {
            fill: var(--clr-white);
          }
        }

        &:hover {
          scale: 1.3;
        }
      }

      .arrow-front {
        right: 15px;
        rotate: 180deg;
      }

      .arrow-back {
        left: 15px;
      }
    }

    .screenshots-container {
      display: flex;
      gap: 5px;
      margin-inline: auto;

      .card {
        border-radius: 0.3em;
        overflow: hidden;
        background-color: var(--clr-white);
        height: 60px;
        cursor: pointer;

        img {
          height: 100%;
        }

        &:hover {
          img {
            opacity: 0.7;
          }
        }
      }
    }

    .info {
      padding: 10px;
    }
  }

  .side-container {
    display: flex;
    flex: 2;
    flex-direction: column;
    gap: 20px;
    height: 600px;
    margin-top: 65px;
    color: var(--clr-lightgray);
    background-color: #3535352e;
    padding: 15px;
    border-radius: 0.4em;

    h3 {
      color: var(--clr-white);
      border-bottom: 1px solid var(--clr-gray);
      padding-bottom: 10px;
    }

    .date {
      font-family: monts-medium;
      color: var(--clr-white);

      span {
        font-family: monts-light;
        color: var(--clr-lightgray);
      }
    }

    p {
      font-family: monts;
      flex: 1;
    }

    .label {
      background-color: var(--clr-gray);
      padding: 4px;
      padding-inline: 7px;
      border-radius: 2em;
      margin-inline-end: 5px;
      font-size: 14px;
    }

    .add-to-cart {
      width: 100%;
      gap: 10px;
      font-size: 16px;
      font-family: monts-medium;
      box-shadow: 0px 0px 0px 1px var(--clr-gray);
      background-color: transparent;
      padding-block: 10px;
      color: var(--clr-white);
      transition: 0.3s;

      &:hover {
        background-color: var(--clr-highlight);
        border: none;
      }

      svg {
        width: 20px;
        height: 20px;
        fill: var(--clr-white);
      }
    }
  }
}
</style>