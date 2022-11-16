import { createStore } from 'vuex'
import { gameService } from '../services/game.service'
import cart from './modules/cart'

const storeOptions = {
    strict: true,
    state() {
        return {
            games: [],
            game: null,
        }
    },
    mutations: {
        setGames(state, { games }) {
            state.games = games
        },
        setGame(state, { game }) {
            state.game = game
        },
        // remove(state, { contactId }) {
        //     const idx = state.contacts.findIndex(contact => contactId === contact._id)
        //     state.contacts.splice(idx, 1)
        // },
        // saveContact(state, { contact }) {
        //     const idx = state.contacts.findIndex(currContact => currContact._id === contact._id)
        //     state.contacts.splice(idx, 1, contact)
        // }
    },
    actions: {
        async loadGames({ commit }, { critirea = false }) {
            let games
            if (critirea) {
                games = await gameService.getGames(critirea)
            } else {
                games = await gameService.getGames()
            }
            commit({ type: 'setGames', games })
        },
        async loadGame({ commit }, { id }) {
            const game = await gameService.getGameById(id)
            commit({ type: 'setGame', game })
        },
        // async removeContact({ commit }, { contactId }) {
        //     await contactService.deleteContact(contactId)
        //     commit({ type: 'remove', contactId })
        // },
        // async saveContact({ commit }, { contact }) {
        //     await contactService.saveContact(contact)
        //     commit({ type: 'saveContact', contact })
        // }
    },
    getters: {
        games(state) {
            return state.games
        },
        game(state) {
            return state.game
        }
    },
    modules: {
        cart
    }
}

const store = createStore(storeOptions)
export default store