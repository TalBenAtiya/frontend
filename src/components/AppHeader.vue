<script>
import CartBtn from "./CartBtn.vue";
import AboutSvg from "./svgs/AboutSvg.vue";
import HomeSvg from "./svgs/HomeSvg.vue";
import LogoSvg from "./svgs/LogoSvg.vue";
import RubikWhiteSvg from "./svgs/RubikWhiteSvg.vue";
import UserMsg from './UserMsg.vue';
export default {
  components: { LogoSvg, RubikWhiteSvg, HomeSvg, AboutSvg, CartBtn, UserMsg },
  data() {
    return {
      isScrolled: false,
      isUserModalOpen: false,
    };
  },
  computed: {
    isCartPage() {
      const url = this.$route.path;
      if (url === "/cart") return true;
      else return false;
    },
    loggedInUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setIsScrolled() {
      if (window.scrollY > 30 && !this.isScrolled) this.isScrolled = true;
      if (window.scrollY < 30 && this.isScrolled) this.isScrolled = false;
    },
    toggleUserModal() {
      this.isUserModalOpen = !this.isUserModalOpen;
    },
    onLogout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.setIsScrolled);
  },
  unmounted() {
    window.removeEventListener("scroll", this.setIsScrolled);
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
        <router-link v-if="!loggedInUser" to="/signup" class="user">
          <span>LOGIN</span>
        </router-link>
        <div v-if="loggedInUser" @click="toggleUserModal()" class="user logged">
          <div class="logged-in">
            <span class="user-box">{{
              loggedInUser.username.slice(0, 2).toUpperCase()
            }}</span>
            <div @click="onLogout" class="user-modal" v-if="isUserModalOpen">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <cart-btn v-if="!isCartPage" class="my-cart" />
    <user-msg />
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
  position: sticky;
  top: 0px;
  transition: 0.5s;
  z-index: 10;

  &.scrolled {
    background: var(--clr-header);
    animation: breathing 3s linear infinite;

    .main-header {
      padding-inline-end: 95px;
      padding-inline-start: 20px;
    }
  }

  .main-header {
    display: flex;
    padding-block: 5px;
    align-items: center;
    justify-content: space-between;
    padding-inline-end: 80px;
    padding-inline-start: 6px;
    transition: 0.5s;
    position: relative;

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

  .user {
    position: absolute;
    top: 0;
    background-color: var(--clr-main-red);
    right: 0;
    border-radius: 0;
    height: 70px;
    aspect-ratio: 1/1;
    color: var(--clr-white);
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    padding-inline: 3px;

    &.logged {
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
    }

    .logged-in {
      position: relative;
    }

    .user-modal {
      position: absolute;
      bottom: 0;
      background-color: var(--clr-white);
      color: var(--clr-black);
      padding-inline: 15px;
      padding-block: 5px;
      border-radius: 0.5em;
      translate: -50% 100%;

      &:hover {
        background-color: var(--clr-highlight);
      }
    }

    .user-box {
      background-color: var(--clr-gray);
      display: flex;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 3px solid var(--clr-black);
      font-size: 18px;

      &:hover {
        background-color: var(--clr-highlight);
      }
    }

    &.router-link-active {
      background-color: var(--clr-highlight);
    }

    &:hover {
      background-color: var(--clr-highlight);
    }
  }

  .logo-svg {
    height: 60px;
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