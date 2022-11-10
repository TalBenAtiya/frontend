<script>
import CartSvg from './svgs/CartSvg.vue';
export default {
  components: { CartSvg },};
</script>

<template>
<RouterLink to="/cart" class="cart-btn">
    <div class="container"><cart-svg /> My-Cart</div>
</RouterLink>
</template>

<style lang="scss">
.cart-btn {
    position: fixed;
    top: 135px;
    right: 25px;
    background-color: var(--clr-main-red);
    padding: 15px;
    border-radius: 0.5em;
    transition: 0.3s;

    &:hover {
        background: var(--clr-highlight);
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        font-size: 16px;
        transition: 0.2s;

        svg {
            width: 20px;
            height: 20px;
            fill: var(--clr-white);
        }
    }

    &:hover {


    }
}
</style>