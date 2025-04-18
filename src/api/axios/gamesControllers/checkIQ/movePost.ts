import axios from 'axios';

export const movePost = async (moveData: number) => {
    return axios.post(
        'http://localhost:3600/games/checkIQ/move',
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