import axios from "axios"

export const gameService = {
    getGames,
}

const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    params: { tag: '3d.mmorpg.fantasy.pvp', platform: 'pc' },
    headers: {
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

async function getGames() {
    const gamesData = await axios.get('https://api.rawg.io/api/games?key=2f92ea3ac3a7410d8ab2914254d3d4cf')
    let games = gamesData.data.results
    games = games.map(game => {
        return {
            _id: game.id,
            title: game.name,
            genres: game.genres,
            imgUrl: game.background_image, 
            screenshots: game.short_screenshots,
            released: game.released
        }
    })
    return games
}




