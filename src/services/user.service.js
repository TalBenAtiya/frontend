import { httpService } from './http.service'

export const userService = {
    getUsers,
    login,
    signup,
    logout,
    getLoggedinUser,
    saveLocalUser,
    getById,
    update,
}


const URL_USER = 'user/'
const URL_AUTH = 'auth/'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function login(creds) {
    try {
        const user = await httpService.post(URL_AUTH + 'login', creds)
        return saveLocalUser(user)
    } catch (err) {
        console.error('Faild To Login')
        // throw err
    }
}
async function logout() {
    console.log('hi')
    try {
        await httpService.post(URL_AUTH + 'logout')
        // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return null
    } catch {
        console.error('Logout Failed')
    }
}

async function signup(creds) {
    const user = await httpService.post(URL_AUTH + 'signup', creds)
    return saveLocalUser(user)
}

async function getUsers() {
    return httpService.get(URL_USER)
}

async function getById(userId) {
    return httpService.get(URL_USER + userId)
}


async function update(user) {
    //?- Dev:
    // Todo: update user info

    //?- Prod:
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}