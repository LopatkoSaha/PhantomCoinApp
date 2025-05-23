import axios from 'axios';

export const createGameOptionsPost = async (
    gameId: number, 
    nameComplexity: string, 
    bonusCoefficient: string, 
    discriptionComplexity: string, 
    sortOrder: string, 
    gameConfig: Record<string, number>
) => {
    return axios.post(
        'http://localhost:3600/games/options/createGameOptions',
        {gameId, nameComplexity, bonusCoefficient, discriptionComplexity, sortOrder, gameConfig},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}

export const updataGameOptionsPost = async (
    id: number, 
    nameComplexity: string, 
    bonusCoefficient: string, 
    discriptionComplexity: string, 
    sortOrder: string, 
    gameConfig: Record<string, number>
) => {
    return axios.post(
        'http://localhost:3600/games/options/updataGameOptions',
        {id, nameComplexity, bonusCoefficient, discriptionComplexity, sortOrder, gameConfig},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}

export const deleteGameOptionsPost = async (id: number) => {
    return axios.post(
        'http://localhost:3600/games/options/deleteOptions',
        {id},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}