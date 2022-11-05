export const gameService = {

} 

async function getGames() {
    const games = await axios.get('https://www.freetogame.com/api/games?platform=pc')
    console.log('games:', games)
}