import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";

export const buyCurrencyPost = async (dispatch: Dispatch, saleName: string, buyName: string, quantity: number) => {
    await axios.post('http://localhost:3600/wallet/buyCurrency', {saleName, buyName, quantity}, { withCredentials: true })
    .then(response => {
        dispatch(showMessage({msgType: "info", msgText: response.data.message}));  
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"}));
    });
}