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
    width: 46px;
    height: 46px;
    border-radius: 50%;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--clr-highlight);
    }
    .container {
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            padding-right: 3px;
            width: 27px;
            height: 27px;
            fill: var(--clr-white);
        }
    }

    &:hover {


    }
}
</style>