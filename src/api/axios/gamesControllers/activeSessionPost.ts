import axios from 'axios';

export const activeSessionPost = async (nameGame: string) => {
    return axios.get(
        `http://localhost:3600/games/${nameGame}/check`,
        { withCredentials: true }
    )
    .then(response => {
        
        console.log("response: ", response);
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}