import axios from 'axios';

export const finishGamePost = async (nameGame: string,) => {
    await axios.post(
        `http://localhost:3600/games/${nameGame}/stop`,
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