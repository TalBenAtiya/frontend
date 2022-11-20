<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadCart" });
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    getCartTotalPrice() {
      if (!this.cart) return;
      const sum = this.cart.reduce((acc, game) => {
        return acc + game.price;
      }, 0);
      return sum;
    },
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch({ type: "removeFromCart", id });
    },
  },
};
</script>

<template>
  <section class="cart main-layout">
    <h2>My Cart</h2>
    <div v-if="cart?.length > 0" class="container">
      <div class="my-cart">
        <div v-for="game in cart" :key="game._id" class="game-container">
          <div class="img-container">
            <img :src="`${game.imgUrl}`" alt="Game Image" />
          </div>
          <div class="info">
            <h3>{{ game.title }}</h3>
            <div class="description">
              <p>{{ game.description }}</p>
            </div>
          </div>
          <div class="options">
            <h5>${{ game.price }}</h5>
            <button @click="removeFromCart(game._id)">Remove</button>
          </div>
        </div>
      </div>
      <section class="cart-total">
        <div v-if="cart?.length > 0">
          <h3 class="games-title">Summary :</h3>
          <section class="list">
          <div class="game-total" v-for="game in cart" :key="game._id">
            <span class="title">{{ game.title }}</span>
            <span>${{ game.price }}</span>
          </div>
          </section>
        </div>
        <div class="total-sum">
          <h3>Total :</h3>
          <span> ${{ getCartTotalPrice }} </span>
          <button class="checkout">Checkout</button>
        </div>
      </section>
    </div>
    <div v-else>Cart Is Empty</div>
  </section>
</template>

<style lang="scss">
.cart {
  position: relative;
  h2 {
    font-size: 40px;
    margin-bottom: 40px;
  }

  .container {
    display: flex;
  }

  .my-cart {
    flex: 3;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-inline-start: 0;
    gap: 25px;

    .game-container {
      display: flex;
      gap: 30px;
      border: 1px solid var(--clr-gray);
      border-radius: 0.5em;
      overflow: hidden;

      .img-container {
        height: 170px;
        width: 120px;
        min-height: 170px;
        min-width: 120px;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .info {
      padding: 15px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      .description {
        max-width: 350px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
        max-height: 3.5em;
      }
    }

    .options {
      display: flex;
      padding: 15px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      button {
        background-color: transparent;
        border-radius: 0;
        color: var(--clr-white);
        transition: 0.2s;

        &:hover {
          color: var(--clr-main-red);
          box-shadow: 0px 2px 0px 0px var(--clr-main-red);
        }
      }

      h5 {
        font-weight: 100;
        font-size: 15px;
      }
    }
  }

  .cart-total {
    padding-block: 20px;
    padding-inline: 10px;
    flex: 1;
    position: sticky;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--clr-gray);
    border-radius: 0.4em;
    margin-block: 20px;
    height: fit-content;

    .list {
      max-height: 300px;
      overflow: scroll;
    }

    .games-title {
      border-block-end: 2px solid var(--clr-black);
      padding-block-end: 10px;
      margin-bottom: 20px;
      width: 100%;
    }

    .game-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-block: 10px;
      margin-bottom: 5px;
      border-block-end: 1px solid var(--clr-black);
      margin-inline-end: 25px;

      &:last-child {
        border: none;
      }

      .title {
        max-width: 70%;
      }
    }

    .total-sum {
      display: flex;
      width: 100%;
      border-top: 2px solid var(--clr-black);
      padding-top: 10px;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      flex-wrap: wrap;
    }

    .checkout {
      width: 100%;
      font-size: 25px;
      transition: 0.2s;
      margin-top: 15px;

      &:hover {
        background-color: var(--clr-highlight);
        color: var(--clr-white);
      }
    }
  }
}
</style>