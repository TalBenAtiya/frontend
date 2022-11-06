import axios from "axios"
import { storageService } from "./async-storage.service";

export const gameService = {
    getGames,
}

const STORAGE_KEY = 'gamesDB'

async function getGames(pageNumber = 1) {
    let games = await storageService.query(STORAGE_KEY+pageNumber)
    if (games && games.length > 0) {
        return games
    } else {
        const gamesData = await axios.get(`https://api.rawg.io/api/games?key=2f92ea3ac3a7410d8ab2914254d3d4cf&page=${pageNumber}`)
        games = gamesData.data.results
        games = games.map(game => {
            return {
                _id: game.id,
                title: game.name,
                genres: game.genres,
                imgUrl: game.background_image,
                screenshots: game.short_screenshots,
                released: game.released,
                price: getRandomIntInclusive(25, 150)
            }
        })
        storageService.postMany(STORAGE_KEY+pageNumber, games)
    }
        return games
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

