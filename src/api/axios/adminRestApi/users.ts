import axios from 'axios';

export const allUsersGet = async () => {
    return axios.get(
        'http://localhost:3600/user/getAll',
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
};

export const activationUserPost = async (userId: number) => {
    return axios.post(
        'http://localhost:3600/user/activation',
        {userId},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
};

export const deactivationUserPost = async (userId: number) => {
    return axios.post(
        'http://localhost:3600/user/deactivation',
        {userId},
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
};