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
    }
  },
  methods: {
    goToRoute() {
        this.$router.push(`/games?price=&genres=${this.type.toLowerCase()}`)
    }
  }
};
</script>


<template>
  <div class="box">
    <h3>{{type}}</h3>
    <div
      v-for="game in games"
      :key="game._id"
      class="card"
      @click="this.$router.push(`/games/${game._id}`)"
    >
      <div class="hover-box"></div>
      <img :src="`${game.imgUrl}`" alt="" />
      <h4>{{ game.title }}</h4>
    </div>
    <button @click="goToRoute" class="btn see-more">See More...</button>
  </div>
</template>


<style lang="scss">
.box {
  border: 1px solid var(--clr-gray);
  border-radius: 0.4em;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 10px;

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

  &:hover {
    .hover-box {
      translate: 0;
    }
  }

  .hover-box {
    background-color: var(--clr-gray);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    translate: -100%;
    transition: 0.6s;
  }

  img {
    height: 70px;
    width: 50px;
    object-fit: cover;
  }
}
</style>