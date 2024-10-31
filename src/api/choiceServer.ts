import { apiFakeServ } from "./apiFakeServ";
import { apiRealServ } from "./apiRealServ";
import { TApiParams } from "./types";

export const choiceServer = (params: TApiParams) => {
  if (process.env.REACT_APP_SERVER?.trim() === "fake") {
    return apiFakeServ(params);
  }
  if (process.env.REACT_APP_SERVER?.trim() === "real") {
    return apiRealServ(params);
  }
};
