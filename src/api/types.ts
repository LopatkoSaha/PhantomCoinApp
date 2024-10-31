export type TApiParams = {
  path: string;
  method: "GET" | "POST" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, any>;
  query?: Record<string, any>;
};
