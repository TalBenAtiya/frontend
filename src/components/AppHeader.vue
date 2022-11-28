<script>
import CartBtn from "./CartBtn.vue";
import AboutSvg from "./svgs/AboutSvg.vue";
import HomeSvg from "./svgs/HomeSvg.vue";
import LogoSvg from "./svgs/LogoSvg.vue";
import MenuSvg from "./svgs/MenuSvg.vue";
import RubikWhiteSvg from "./svgs/RubikWhiteSvg.vue";
import UserMsg from "./UserMsg.vue";
export default {
  components: {
    LogoSvg,
    RubikWhiteSvg,
    HomeSvg,
    AboutSvg,
    CartBtn,
    UserMsg,
    MenuSvg,
  },
  data() {
    return {
      isScrolled: false,
      isUserModalOpen: false,
      isMenuOpen: false,
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
    toggleMenu(toggleStatus) {
      this.isMenuOpen = toggleStatus;
    },
    closeMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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
      <nav :class="isMenuOpen ? 'open' : ''">
        <RouterLink @click="closeMenu" to="/">
          <home-svg class="svg home-svg" />
          <h3 class="nav-title">Home Page</h3>
        </RouterLink>
        <RouterLink @click="closeMenu" to="/games">
          <rubik-white-svg class="svg rubik-svg" />
          <h3 class="nav-title">Games Collection</h3>
        </RouterLink>
        <RouterLink @click="closeMenu" to="/about">
          <about-svg class="svg about-svg" />
          <h3 class="nav-title">About Us</h3>
        </RouterLink>
      </nav>
      <menu-svg
        :isMenuOpen="isMenuOpen"
        @toggle-menu="toggleMenu"
        class="btn-menu"
      />
      <router-link v-if="!loggedInUser" to="/signup" class="user">
        <span>LOGIN</span>
      </router-link>
      <div v-if="loggedInUser" @click="toggleUserModal" class="user logged">
        <div class="logged-in">
          <span class="user-box">{{
            loggedInUser.username.slice(0, 2).toUpperCase()
          }}</span>
          <div @click="onLogout" class="user-modal" v-if="isUserModalOpen">
            <span>Logout</span>
          </div>
        </div>
      </div>
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

    @media (min-width: 501px) {
      .main-header {
        padding-inline-end: 95px;
        padding-inline-start: 20px;
      }
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

    @media (max-width: 500px) {
      padding-inline-end: 80px;
    }

    .btn-menu {
      display: none;

      @media (max-width: 500px) {
        display: flex;
      }
    }

    nav {
      display: flex;
      gap: 15px;
      align-items: center;
      transition: 0.5s;

      .nav-title {
        display: none;
      }
      a {
        display: flex;
        gap: 20px;
        align-items: center;
      }

      a.router-link-active {
        color: var(--clr-main-red);
        svg {
          scale: 1.3;
          path {
            fill: var(--clr-main-red);
          }
        }
      }
      @media (max-width: 500px) {
        position: fixed;
        top: -110%;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--clr-black);
        align-items: center;
        padding-block-start: 60px;
        flex-direction: column;
        z-index: 0;

        .nav-title {
          display: flex;
        }

        a {
          justify-content: center;
          width: 100%;
          height: 80px;
          box-shadow: 1px -2px 0px 0px var(--clr-gray) inset;
        }

        &.open {
          top: 70px;
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
      background-color: var(--clr-gray);
      &:hover {
        background-color: var(--clr-gray);
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

    @media (max-width: 500px) {
      width: 135px;
    }
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