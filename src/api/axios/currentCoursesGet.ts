import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { setCurrencyCourses } from "app/store/slices/coursesSlice";
import { showMessage } from "app/store/slices/messageSlice";
import { coursesUpdateInterval } from "shared/config/config";

export const currentCoursesGet = (dispatch: Dispatch) => {
    setInterval(() => {
        axios.get('http://localhost:3600/courses/get', {})
            .then(response => {
                dispatch(setCurrencyCourses(response.data));   
            })
            .catch(error => {
                console.log("warning: ", error);     
                dispatch(showMessage({msgType: "warning", msgText: "Getting courses Error"}));
        });
    }, coursesUpdateInterval);
}