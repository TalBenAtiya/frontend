<script>
export default {
  props: {
    games: {
      type: Array,
      requierd: true,
    },
    type: {
      type: String,
      requierd: true,
    },
  },
  methods: {
    goToRoute() {
      this.$router.push(`/games?price=&genres=${this.type.toLowerCase()}&name=`);
    },
  },
};
</script>


<template>
  <div :class="`box ${type} `">
    <h3>{{ type }}</h3>
    <div
      v-for="game in games"
      :key="game._id"
      class="card"
      @click="this.$router.push(`/games/${game._id}`)"
    >
      <div class="hover-box">
        <span>${{game.price}}</span>
      </div>
      <img :src="`${game.imgUrl}`" alt="" />
      <h4>{{ game.title }}</h4>
    </div>
    <button @click="goToRoute" class="btn see-more">Show All</button>
  </div>
</template>


<style lang="scss">
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border: 1px solid var(--clr-gray);
  padding-inline: 20px;
  border-radius: 0.3em;

  h3 {
    font-family: monts-light;
    margin-bottom: 10px;
    font-size: 20px;
    border-bottom: 1px solid var(--clr-gray);
    padding-block: 10px;
    width: fit-content;
    border-top-right-radius: 0.3em;
    border-top-left-radius: 0.3em;
  }

  button {
    align-self: flex-end;
    background-color: transparent;
    padding-block-end: 8px;
    color: var(--clr-white);

    &:hover {
      color: var(--clr-main-red);
    }
  }
}

.card {
  display: flex;
  margin-inline: 8px;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 0.5em;

  &:hover {
    .hover-box {
      translate: 0;
    }
  }

  .hover-box {
    background-color: var(--clr-highlight);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    translate: -100%;
    transition: 0.6s;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-inline-end: 20px;
  }

  h4 {
    max-width: 60%;
  }

  img {
    height: 70px;
    width: 50px;
    object-fit: cover;
  }
}
</style>