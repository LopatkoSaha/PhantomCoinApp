import axios from 'axios';

export const startGamePost = async (complexity: string, payoutValue: number, payoutCurrency: string) => {
    return axios.post(
        'http://localhost:3600/games/minesweeper/start',
        {complexity, payoutValue, payoutCurrency},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}