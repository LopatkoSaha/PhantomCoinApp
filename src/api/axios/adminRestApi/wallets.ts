import axios from 'axios';

export const updataWalletPost = async (id: number, coins: Record<string, any>) => {
    return axios.post(
        'http://localhost:3600/wallet/updataAdmin',
        {id, coins},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}