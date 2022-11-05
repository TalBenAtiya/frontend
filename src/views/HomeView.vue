<script>
export default {
  data() {
    games: null
  },
  created() {
    this.$store.dispatch({ type: 'loadGames' })
  },
  computed: {
    games() {
      return this.$store.getters.games
    }

  }
}
</script>

<template>
  <section class="home">
    <div class="games-container">
    </div>
  </section>
</template>
