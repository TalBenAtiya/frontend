<script>
import CheckSvg from "./svgs/CheckSvg.vue";
export default {
  components: { CheckSvg },
  data() {
    return {
      critirea: {
        name: "",
        price: "",
        genres: this.$route.query.genres ? this.$route.query.genres.split(" ") : []
      },
    };
  },
  methods: {
    setCritireaName() {
      this.$emit("filter-games", this.critirea);
    },
    setCritireaPrice(str) {
      if (this.critirea.price === str || this.$route.query.price === str) this.critirea.price = "";
      else this.critirea.price = str;
      this.$emit("filter-games", this.critirea);
    },
    setCritireaGenres(str) {
      if (this.critirea.genres.includes(str)) {
        this.critirea.genres = this.critirea.genres.filter(
          (genre) => genre !== str
        );
      } else {
        this.critirea.genres.push(str);
      }
      this.$emit("filter-games", this.critirea);
    },
    getPriceClass(str) {
      if (this.$route.query.price === str) return "active";
    },
    getGenreClass(str) {
      if (this.$route.query.genres && this.$route.query.genres[0])
      if (this.$route.query.genres.includes(str)) return "active";
    },
  },
  computed: {},
};
</script>

<template>
  <section class="filter-container">
    <h4>Filters</h4>
    <input
      v-model="critirea.name"
      @input="setCritireaName()"
      type="text"
      placeholder="Search by name"
    />
    <h4>Price</h4>
    <span :class="getPriceClass('40')" @click="setCritireaPrice('40')"
      >Under $40 <CheckSvg class="checked"
    /></span>
    <span :class="getPriceClass('75')" @click="setCritireaPrice('75')"
      >Under $75 <CheckSvg class="checked"
    /></span>
    <span :class="getPriceClass('100')" @click="setCritireaPrice('100')"
      >Under $100 <CheckSvg class="checked"
    /></span>
    <span :class="getPriceClass('100+')" @click="setCritireaPrice('100+')"
      >Above $100 <CheckSvg class="checked"
    /></span>
    <h4>Genres</h4>
    <span :class="getGenreClass('action')" @click="setCritireaGenres('action')"
      >Action <CheckSvg class="checked"
    /></span>
    <span
      :class="getGenreClass('adventure')"
      @click="setCritireaGenres('adventure')"
      >Adventure <CheckSvg class="checked"
    /></span>
    <span :class="getGenreClass('indie')" @click="setCritireaGenres('indie')"
      >Indie <CheckSvg class="checked"
    /></span>
    <span :class="getGenreClass('puzzle')" @click="setCritireaGenres('puzzle')"
      >Puzzle <CheckSvg class="checked"
    /></span>
    <span :class="getGenreClass('rpg')" @click="setCritireaGenres('rpg')"
      >RPG <CheckSvg class="checked"
    /></span>
    <span
      :class="getGenreClass('shooter')"
      @click="setCritireaGenres('shooter')"
      >Shooter <CheckSvg class="checked"
    /></span>
  </section>
</template>


<style lang="scss">
.filter-container {
  border: 1px solid var(--clr-gray);
  display: flex;
  flex-direction: column;
  border-radius: 0.4em;

  @media (max-width: 560px) {
    border: none;
  }

  label {
    display: flex;
    padding-inline: 6px;
    padding-block: 10px;
  }

  input {
    padding: 8px;
    background-color: var(--clr-gray);
    margin-block: 10px;
    color: var(--clr-white);
  }

  h4 {
    font-family: monts-medium;
    border-block-end: 3px solid var(--clr-gray);
    text-align: center;
    padding-block-end: 5px;
    margin-top: 15px;

    &:first-child {
      border: none;
    }
  }

  span {
    display: flex;
    padding-block: 10px;
    padding-inline: 6px;
    transition: 0.3s;
    cursor: pointer;
    position: relative;

    .checked {
      position: absolute;
      right: 10px;
      display: none;
      width: 15px;
      height: 15px;

      svg {
        fill: var(--clr-white);
      }
    }

    &.active {
      .checked {
        display: flex;
      }
    }

    &:not(:last-child) {
      border-block-end: 1px solid var(--clr-gray);
    }

    &:hover {
      background-color: var(--clr-gray);
    }
  }
}
</style>