import axios from "axios";


const BASE_URL = process.env.REACT_APP_API;
const TOKEN = localStorage.getItem("auth");
const REFRESH=localStorage.getItem("refresh")


export const tokenExpiry = axios.create({
  baseURL: BASE_URL,
  headers:{ Authorization: "Bearer" + " " + REFRESH },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers:{ Authorization: "Bearer" + " " + TOKEN },
});
