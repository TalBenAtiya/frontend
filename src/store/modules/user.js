// import { userService } from "../../services/user.service"

// export default {
//     state: {
//         user: userService.getUser()
//     },
//     mutations: {
//         setUser(state, { user }) {
//             state.user = user
//         },
//     },
//     actions: {
//         loadUser({ commit }, { username }) {
//             const user = userService.login(username)
//             commit({ type: 'setUser', user })
//         },
//         setTransaction({ commit }, { transaction }) {
//             const user = userService.handleTransaction(transaction)
//             commit({ type: 'setUser', user })
//         },
//     },
//     getters: {
//         user(state) { return state.user }
//     }
// }