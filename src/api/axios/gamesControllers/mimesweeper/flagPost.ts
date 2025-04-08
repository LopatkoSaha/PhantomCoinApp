import axios from 'axios';

export const flagPost = async (clickId: number) => {
    return axios.post(
        'http://localhost:3600/games/minesweeper/setFlag',
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