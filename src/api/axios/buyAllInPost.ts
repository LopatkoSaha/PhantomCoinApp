import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";


export const buyAllInPost = async (dispatch: Dispatch, saleName: string, buyName: string) => {
    await axios.post('http://localhost:3600/wallet/buyAllIn', {saleName, buyName}, { withCredentials: true })
    .then(response => {
        dispatch(showMessage({msgType: "info", msgText: response.data.message}));  
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"}));
    });
}