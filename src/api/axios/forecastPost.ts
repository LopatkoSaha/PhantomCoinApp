import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { showMessage } from "app/store/slices/messageSlice";



export const forecastPost = async (dispatch: Dispatch, nameCoin: string, period: string): Promise<string> => {
    try {
        const response = await axios.post("http://localhost:3600/chat",
            { nameCoin, period },
            {withCredentials: true});

        return response.data.response;
    } catch (error: any) {
        dispatch(showMessage({ 
            msgType: "warning", 
            msgText: error.response?.data?.message || "Произошла ошибка" 
        }));

        return "Ошибка запроса";
    }
}