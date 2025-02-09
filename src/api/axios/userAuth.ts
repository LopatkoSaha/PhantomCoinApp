import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";

// Использование экземпляра Axios для отправки запросов
type TDataLog = {
    email: string, 
    password: string,
}
export const axiosLogin = async (data: TDataLog, dispatch: Dispatch) => {
    await axios.post('http://localhost:3600/auth/login', {
        email: data.email,
        password: data.password,
    }, { withCredentials: true })
    .then(response => {
        dispatch(showMessage({msgType: "info", msgText:response.data.message}));
    })
    .catch(error => {
        console.log("error: ", error);
        dispatch(showMessage({msgType: "error", msgText: "Login error"}));
    }); 
}

export const axiosLogout = async (dispatch: Dispatch) => {
    await axios.post('http://localhost:3600/auth/logout', {}, { withCredentials: true })
    .then(response => {
        dispatch(showMessage({msgType: "info", msgText:response.data.message}));
    })
    .catch(error => {
        console.log("error: ", error);
        dispatch(showMessage({msgType: "error", msgText: "Logout error"}));
    }); 
};

type TDataReg = {
    name: string, 
    email: string, 
    password: string,
}
export const axiosRegistration = async (data: TDataReg, dispatch: Dispatch) => {
    await axios.post('http://localhost:3600/auth/registration', {
        name: data.name,
        email: data.email,
        password: data.password,
    })
    .then(response => {
        dispatch(showMessage({msgText: `User ${data.name} is created`}));
    })
    .catch(error => {
        dispatch(showMessage( error.errName ));
    });
}