import axios from 'axios';

export const gameInfoPost = async (nameGame: string) => {
    return axios.post(
        'http://localhost:3600/games/admin/getGameInfo',
        {nameGame},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}