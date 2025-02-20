import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";
import { setPreorderStore } from "app/store/slices/preorderSlice";

export const preordersGet = async (dispatch: Dispatch) => {
    await axios.get(
        'http://localhost:3600/preorders/get',
        { withCredentials: true }
    )
    .then(response => { 
        dispatch(setPreorderStore(response.data));  
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"}));
    });
}