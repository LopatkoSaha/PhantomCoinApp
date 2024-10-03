import { TApiParams } from "./types";
import {
  getUser,
  createUser,
  deleteUser,
  getAllUsers,
} from "./controllers/users";

export const apiFakeServ = (params: TApiParams) => {
  const { method, path, body, headers } = params;

  const url = new URL(path);
  const pathname = url.pathname;
  const query = Object.fromEntries(url.searchParams);

  switch (pathname) {
    case "/api/user":
      switch (method) {
        case "GET":
          return getUser(query, body || {});
        case "POST":
          return createUser(query, body || {});
        case "DELETE":
          return deleteUser(query, body || {});
        default:
          throw new Error(`Unsupported method for ${pathname}: ${method}`);
      }
    case "/api/users":
      switch (method) {
        case "POST":
          return getAllUsers();
        default:
          throw new Error(`Unsupported method for ${pathname}: ${method}`);
      }
    default:
      throw new Error(`Invalid pathname: ${pathname}`);
  }
};
