<script>
import CartSvg from './svgs/CartSvg.vue';
export default {
  components: { CartSvg },};
</script>

<template>
<RouterLink to="/cart" class="cart-btn">
    <div class="container"><cart-svg /></div>
</RouterLink>
</template>

<style lang="scss">
.cart-btn {
    position: fixed;
    bottom: 80px;
    right: 30px;
    background-color: var(--clr-main-red);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
        background: var(--clr-highlight);
    }
    .container {
        position: relative;
        transition: 0.2s;
        display: flex;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -55% 40%;
            width: 27px;
            height: 27px;
            fill: var(--clr-white);
        }
    }

    &:hover {


    }
}
</style>