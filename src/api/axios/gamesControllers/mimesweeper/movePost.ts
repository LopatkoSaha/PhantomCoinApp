import axios from 'axios';

export const movePost = async (clickId: number) => {

    return axios.post(
        'http://localhost:3600/games/minesweeper/move',
        {clickId},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}