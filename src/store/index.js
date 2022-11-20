import { createStore } from 'vuex'
import { gameService } from '../services/game.service'
import cart from './modules/cart'
import user from './modules/user'

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
        cart,
        user
    }
}

const store = createStore(storeOptions)
export default store