import axios from 'axios';

export const activeSessionGet = async (nameGame: string) => {
    return axios.get(
        `http://localhost:3600/games/${nameGame}/check`,
        { withCredentials: true }
    )
    .then(response => {
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}