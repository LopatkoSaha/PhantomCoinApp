import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";
import { setWallet } from "app/store/slices/walletSlice";

export const walletGet = async (dispatch: Dispatch) => {
    await axios.get('http://localhost:3600/wallet/get', { withCredentials: true })
    .then(response => {
        dispatch(setWallet(response.data));   
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.errName}));
    });
}

export const allWallesInfotGet = async () => {
    return axios.get(
        'http://localhost:3600/wallet/getAllInfo',
        { withCredentials: true }
    )
    .then(response => { 
        return response.data;  
    })
    .catch(error => {
        console.error(error.response?.data?.message || "Произошла ошибка");
    });
}