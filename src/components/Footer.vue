<script>
import LogoSvg from "./svgs/LogoSvg.vue";
export default {
  components: { LogoSvg },
};
</script>

<template>
  <section class="footer">
    <div class="logo">
      <logo-svg />
    </div>
  </section>
</template>

<style lang="scss">
.footer {
  margin-top: 70px;
  width: 100%;
  padding: 10px;
  background-color: var(--clr-header);
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    svg {
      height: 50px;
      width: 100px;
    }
  }
}
</style>