import axios from 'axios';

export const allGamesInfoGet = async () => {
    return axios.get(
        'http://localhost:3600/games/info/getAllGameInfo',
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
};

export const allGameOptonsPost = async (nameGame: string) => {
    return axios.post(
        'http://localhost:3600/games/info/getGameInfo',
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

export const setGameDiscriptionPost = async (id: number, nameGame: string, discription: string) => {
    return axios.post(
        'http://localhost:3600/games/info/setGameInfo',
        {id, nameGame, discription},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}