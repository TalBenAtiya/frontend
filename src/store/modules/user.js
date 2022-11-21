import { userService } from "../../services/user.service"

export default {
    state: {
        user: userService.getLoggedinUser()
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
    },
    actions: {
        async loadUser({ commit }, { username }) {
            const user = await userService.login(username)
            commit({ type: 'setUser', user })
        },
        async signup({commit}, {creds}) {
            const user = await userService.signup(creds)
            commit({type: 'setUser', user})
            return user
        },
        async logout({commit}) {
            const user = await userService.logout()
            commit({type: 'setUser', user})
        },
        async login({commit}, {creds}) {
            const user = await userService.login(creds)
            commit({type: 'setUser', user})
            return user
        }

    },
    getters: {
        user(state) { return state.user }
    }
}