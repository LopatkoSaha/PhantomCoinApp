import axios from 'axios';

export const allGamesOptionsPost = async (gameId: number) => {
    return axios.post(
        'http://localhost:3600/games/options/allGamesOptions',
        {gameId},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}