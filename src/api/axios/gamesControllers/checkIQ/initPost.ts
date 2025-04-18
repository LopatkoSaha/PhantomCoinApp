import axios from 'axios';

export const initPost = async () => {
    return axios.post(
        'http://localhost:3600/games/checkIQ/init',
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