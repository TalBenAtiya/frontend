import { storageService } from "./async-storage.service";

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
    let newGame = await storageService.post(STORAGE_KEY, game)
    return newGame
}

async function removeFromCart(id) {
    await storageService.remove(STORAGE_KEY, id)
}