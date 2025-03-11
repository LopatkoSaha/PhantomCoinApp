import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

import { showMessage } from "app/store/slices/messageSlice";


export class ForecastToken {
    static async get (dispatch: Dispatch) {
        try {
            const response = await axios.get("http://localhost:3600/tokenForecast/get",
                {withCredentials: true});
                
            return response.data;
        } catch (error: any) {
            dispatch(showMessage({ 
                msgType: "warning", 
                msgText: error.response?.data?.message || "Произошла ошибка" 
            }));
        }
    }

    static async set (dispatch: Dispatch, value: number) {
        try {
        const response = await axios.post("http://localhost:3600/tokenForecast/set",
            { value },
            {withCredentials: true});

            dispatch(showMessage({ 
                msgType: "info", 
                msgText: `Куплено ${value} токенов`, 
            }));
    } catch (error: any) {
            dispatch(showMessage({ 
                msgType: "warning", 
                msgText: error.response?.data?.message || "Произошла ошибка" 
            }));
        }
    }
}