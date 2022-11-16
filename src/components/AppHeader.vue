<script>
import CartBtn from "./CartBtn.vue";
import AboutSvg from "./svgs/AboutSvg.vue";
import HomeSvg from "./svgs/HomeSvg.vue";
import LogoSvg from "./svgs/LogoSvg.vue";
import RubikWhiteSvg from "./svgs/RubikWhiteSvg.vue";
export default {
  components: { LogoSvg, RubikWhiteSvg, HomeSvg, AboutSvg, CartBtn },
  data() {
    return {
      isScrolled: false
    }
  },
  computed: {
    isCartPage() {
      const url = this.$route.path
      if (url === '/cart') return true
      else return false
    }
  },
  methods: {
    setIsScrolled() {
      if (window.scrollY > 30 && !this.isScrolled) this.isScrolled = true
      if (window.scrollY < 30 && this.isScrolled) this.isScrolled = false
    }
  },
  mounted() {
        window.addEventListener('scroll', this.setIsScrolled)
  },
  unmounted() {
            window.removeEventListener('scroll', this.setIsScrolled)
  },
};
</script>

<template>
  <header :class="`header-container ${isScrolled ? 'scrolled' : ''}`">
    <div class="main-header">
      <logo-svg class="svg logo-svg" />
      <nav>
        <RouterLink to="/">
          <home-svg class="svg home-svg" />
        </RouterLink>
        <RouterLink to="/games">
          <rubik-white-svg class="svg rubik-svg" />
        </RouterLink>
        <RouterLink to="/about">
          <about-svg class="svg about-svg" />
        </RouterLink>
      </nav>
    </div>
    <cart-btn v-if="!isCartPage" class="my-cart" />
  </header>
</template>


<style lang="scss">
@keyframes breathing {
  0% {
    box-shadow: 0px -4px 30px -5px #ed00003a;
  }

  50% {
    box-shadow: 0px 0px 30px -5px #ed0000a7;
  }

  100% {
    box-shadow: 0px -4px 30px -5px #ed00003a;
  }
}

.header-container {
  margin-bottom: 35px;
  padding-block: 7px;
  position: sticky;
  top: 0px;
  transition: 0.5s;
  z-index: 10;

  &.scrolled {
    background: var(--clr-black);
    animation: breathing 3s linear infinite;

    .main-header {
      padding-inline-end: 45px;
      padding-inline-start: 20px;
    }
  }

  .main-header {
    display: flex;
    padding-block: 10px;
    align-items: center;
    justify-content: space-between;
    padding-inline-end: 30px;
    padding-inline-start: 6px;
    transition: 0.5s;

    nav {
      display: flex;
      gap: 15px;
      align-items: center;

      a.router-link-active {
        svg {
          scale: 1.3;
          path {
            fill: var(--clr-main-red);
          }
        }
      }
    }
  }

  .logo-svg {
    height: 80px;
    width: 225px;
  }

  .rubik-svg,
  .home-svg,
  .about-svg {
    width: 25px;
    height: 25px;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.3;

      path {
        transition: 0.5s;
        fill: var(--clr-main-red);
      }
    }
  }

  .my-cart {
    z-index: 1;
  }
}
</style>