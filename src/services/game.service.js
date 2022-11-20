import axios from "axios"
import { storageService } from "./async-storage.service";
import { httpService } from './http.service.js'
import { getRandomIntInclusive, makeLorem } from "./util.service";

export const gameService = {
    getGames,
    getGameById,
}

const STORAGE_KEY = 'gamesDB'
const BASE_URL = 'game/'

async function getGames(critirea = false) {
    let games = await httpService.get(BASE_URL)
   
    if (critirea && critirea.name) {
        games = games.filter(game =>  {
           return game.title.toLowerCase().includes(critirea.name.toLowerCase())})
    }

    if (critirea && critirea.price) {
        switch (critirea.price) {
            case '40':
                games = games.filter(game => game.price <= 40)
                break;
            case '75':
                games = games.filter(game => game.price <= 75)
                break;
            case '100':
                games = games.filter(game => game.price <= 100)
                break;
            case '100+':
                games = games.filter(game => game.price >= 100)
                break;

            default:
                break;
        }
    }

    if (critirea && critirea.genres.length > 0) {
        games = games.filter(game => {
            return game.genres.some(genre => {
                return critirea.genres.includes(genre.name.toLowerCase())
            })
        })
    }
    return games
}

async function getGameById(id) {
    return httpService.get(BASE_URL + id)
}



