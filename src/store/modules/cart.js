import { cartService } from "../../services/cart.service"
import { showSuccessMsg } from "../../services/event-bus.service"

export default {
    state: {
        cart: null
    },
    mutations: {
        setCart(state, { cart }) {
            state.cart = cart
        },
        addGame(state, { newGame }) {
            state.cart.unshift(newGame)
            
        },
        removeGame(state, { id }) {
            state.cart = state.cart.filter(game => game._id !== id)
        }
    },
    actions: {
        async loadCart({ commit }) {
            const cart = await cartService.getCart()
            commit({ type: 'setCart', cart })
        },
        async addToCart({ commit }, { game }) {
            const newGame = await cartService.addToCart(game)
            if (!newGame) return
            commit({ type: 'addGame', newGame })
        },
        async removeFromCart({ commit }, { id }) {
           await cartService.removeFromCart(id)
            commit({ type: 'removeGame', id })
        },
    },
    getters: {
        cart(state) { return state.cart }
    }
}