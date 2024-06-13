import axios from "axios";

if (!process.env.API_BASE_URL) {
  throw new Error("API_BASE_URL ortam değişkeni tanımlanmamış.");
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY ortam değişkeni tanımlanmamış.");
}

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export const get = async (url: string, params = {}) => {
  try {
    const response = await instance.get(process.env.API_BASE_URL + url, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("error.message");
  }
};

export const post = async (url: string, data = {}) => {
  try {
    const response = await instance.post(process.env.API_BASE_URL + url, data);
    return response.data;
  } catch (error) {
    throw new Error("error.message");
  }
};
