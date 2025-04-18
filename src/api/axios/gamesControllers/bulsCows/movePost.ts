import axios from 'axios';

export const movePost = async (moveData: string[]) => {
    return axios.post(
        'http://localhost:3600/games/bullsCows/move',
        {moveData},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}