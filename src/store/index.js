import { createStore } from 'vuex'
import { gameService } from '../services/game.service'
// import user from './modules/user'

const storeOptions = {
    strict: true,
    state() {
        return {
            games: [],
            // contact: null,
        }
    },
    mutations: {
        setGames(state, { games }) {
            state.games = games
        },
        // remove(state, { contactId }) {
        //     const idx = state.contacts.findIndex(contact => contactId === contact._id)
        //     state.contacts.splice(idx, 1)
        // },
        // setContact(state, { contact }) {
        //     state.contact = contact
        // },
        // saveContact(state, { contact }) {
        //     const idx = state.contacts.findIndex(currContact => currContact._id === contact._id)
        //     state.contacts.splice(idx, 1, contact)
        // }
    },
    actions: {
        async loadGames({ commit }) {
            const games = await gameService.getGames()
            commit({ type: 'setGames', games })
        },
        // async loadContact({ commit }, { id }) {
        //     const contact = await contactService.getContactById(id)
        //     commit({ type: 'setContact', contact })
        // },
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
        // contact(state) {
        //     return state.contact
        // }
    },
    // modules: {
    //     user,
    // }
}

const store = createStore(storeOptions)
export default store