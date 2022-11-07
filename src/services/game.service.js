import axios from "axios"
import { storageService } from "./async-storage.service";
import { getRandomIntInclusive, makeLorem } from "./util.service";

export const gameService = {
    getGames,
    getGameById,
}

const STORAGE_KEY = 'gamesDB'

async function getGames() {
    let games = await storageService.query(STORAGE_KEY)
    if (games && games.length > 0) {
        return games
    } else {
        const gamesData = await axios.get(`https://api.rawg.io/api/games?key=2f92ea3ac3a7410d8ab2914254d3d4cf&page=1`)
        games = gamesData.data.results
        games = games.map(game => {
            return {
                _id: game.id.toString(),
                title: game.name,
                genres: game.genres,
                description: makeLorem(50),
                imgUrl: game.background_image,
                screenshots: game.short_screenshots,
                released: game.released,
                price: getRandomIntInclusive(25, 150)
            }
        })
        storageService.postMany(STORAGE_KEY, games)
    }
        return games
}

async function getGameById(id) {
    const game = await storageService.get(STORAGE_KEY, id)
    return game
}



