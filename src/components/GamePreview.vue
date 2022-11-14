<script>
import CartSvg from './svgs/CartSvg.vue';
import PlusSvg from "./svgs/PlusSvg.vue";
export default {
  components: { PlusSvg, CartSvg },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.game)
    }
  }
};
</script>

<template>
  <RouterLink :to="`/games/${game._id}`" class="game-preview">
    <div class="dark-hover"></div>
    <img :src="`${game.imgUrl}`" />
    <div class="info">
      <h4>{{ game.title }}</h4>
      <span>${{ game.price }}</span>
    </div>
    <p class="description">{{ game.description }}</p>
    <div class="btns">
      <button title="Add To Cart" @click.prevent="addToCart"><cart-svg class="svg svg-cart" /></button>
      <button>{{ game.genres[0].name }}</button>
    </div>
  </RouterLink>
</template>

<style lang="scss">
.game-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--clr-gray);
  border-radius: 0.4em;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  z-index: 0;
  padding-bottom: 5px;

  .description {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    max-height: 3em;
  }

  .dark-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    translate: 0% 100%;
    background-color: rgba(255, 255, 255, 0.25);
    transition: 0.5s;
    z-index: -1;
  }

  &:hover {
    .dark-hover {
      translate: 0% 0%;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding: 5px;

    span {
      font-size: 13px;
      padding: 4px;
      border-radius: 0.3em;
      background-color: var(--clr-highlight);
      height: fit-content;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    padding: 5px;

    button:first-child {
      background-color: var(--clr-white);
      color: var(--clr-black);
      transition: 0.3s;
      border-radius: 50%;

      &:hover {
        background-color: var(--clr-highlight);
        color: var(--clr-white);

        svg {
          fill: var(--clr-white);
        }
      }
    }

    button:last-child {
      background-color: var(--clr-black);
      color: var(--clr-white);
      font-size: 11px;
      padding: 5px;
    }

    .svg-cart {
      width: 13px;
      height: 13px;
      fill: var(--clr-black);
      transition: 0.3s;
    }
  }

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: 100% 0;
    z-index: -2;
  }

  .description {
    font-size: 13px;
    padding: 5px;
  }
}
</style>