import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";

export const preorderDelete = async (dispatch: Dispatch, id: number) => {
    await axios.delete('http://localhost:3600/preorders/delete', { 
        withCredentials: true,
        data: { id }
    })
    .then(response => { 
        dispatch(showMessage(response.data));  
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"}));
    });
}