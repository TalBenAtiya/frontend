import { storageService } from "./async-storage.service";
import { showErrorMsg, showSuccessMsg } from "./event-bus.service";

export const cartService = {
    addToCart,
    getCart,
    removeFromCart,
}

const STORAGE_KEY = 'cartDB'


async function getCart() {
    let cart = await storageService.query(STORAGE_KEY)
    if (cart && cart.length > 0) return cart
    else return []
}

async function addToCart(game) {
    let cart = await storageService.query(STORAGE_KEY)
    if (cart.some(cartGame => cartGame.title === game.title)){
        showErrorMsg('Game Already In Cart')
        return
    }
    let newGame = await storageService.post(STORAGE_KEY, game)
    showSuccessMsg('Game Added To Cart')
    return newGame
}

async function removeFromCart(id) {
    await storageService.remove(STORAGE_KEY, id)
}