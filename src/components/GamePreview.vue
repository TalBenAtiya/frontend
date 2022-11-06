<script>
export default {
    props: {
        game: {
            type: Object,
            required: true,
        }
    }
}
</script>

<template>
  <section class="game-preview">
        <div class="dark-hover"></div>
        <img :src="`${game.imgUrl}`" />
        <div class="info">
          <h4>{{ game.title }}</h4>
          <span>${{ game.price }}</span>
        </div>
        <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        <div class="btns">
          <button>+</button>
          <button>{{ game.genres[0].name }}</button>
        </div>
      </section>
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
  }

  .btns {
    display: flex;
    justify-content: space-between;
    padding: 5px;
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