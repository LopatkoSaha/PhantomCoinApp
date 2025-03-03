import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";

export const setPreorderPost = async (
    dispatch: Dispatch,
    currency_sell: string,
    currency_buy: string,
    value_buy: number | null,
    is_all_in: 0 | 1,
    trigger_course: number
) => {
    await axios.post(
        'http://localhost:3600/preorders/set',
        {currency_sell, currency_buy, value_buy, is_all_in, trigger_course},
        { withCredentials: true }
    )
    .then(response => {
        dispatch(showMessage({msgType: "info", msgText: response.data}));  
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.response?.data?.message || "Произошла ошибка"}));
    });
}