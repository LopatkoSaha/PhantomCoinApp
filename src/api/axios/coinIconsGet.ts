import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { showMessage } from "app/store/slices/messageSlice";
import { setCoinIcons } from "app/store/slices/coinIconsSlice";


export const coinIconsGet = async (dispatch: Dispatch) => {
    await axios.get('http://localhost:3600/coinIcons/get')
    .then(response => {
        dispatch(setCoinIcons(response.data));   
    })
    .catch(error => {
        dispatch(showMessage({msgType: "warning", msgText: error.errName}));
    });
}