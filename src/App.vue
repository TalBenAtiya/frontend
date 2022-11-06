<script>
import AppHeader from '@/components/AppHeader.vue';
import { gameService } from './services/game.service.js';

export default {
  data() {
    return
  },
  components: { AppHeader, }
}

</script>
    AppHeader


<template>
    <AppHeader />
    <RouterView />
</template>


<style>

</style>