import axios from 'axios';

export const finishGamePost = async () => {
    await axios.post(
        'http://localhost:3600/games/minesweeper/stop',
        {},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}