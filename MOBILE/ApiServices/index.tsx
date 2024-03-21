import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse } from "axios";
import { APITOKEN, SERVER_URL } from "../src/AppConstants/AppConstants";

export const authRequest = async (url: string, body: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(SERVER_URL + url, body);
    console.log("_________ response?.data?.token ______",response?.data?.token);
    await AsyncStorage.setItem('token', response?.data?.token);
    return processResponse(response);
  } catch (error: any) {
    return processResponse(error.response);
  }
};
// Function to make POST requests with authentication
export const otpPostRequest = async (
  url: string,
  token: string,
  body: any
): Promise<any> => {
  let header = {
    headers: {
      token: token,
    },
  };

  try {
    const response: AxiosResponse = await axios.post(
      SERVER_URL + url,
      body,
      header
    );

    return processResponse(response); // Handle the response using processResponse function
  } catch (error: any) {
    return processResponse(error.response); // Handle the error response using processResponse function
  }
};

// Function to make GET requests with authentication
export const getRequest = async (url: any, params: any = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(SERVER_URL + url, {
      params,
    });
    // console.log(">>>>>>>>response>>>>>>>>..",response.data)
    return processResponse(response); // Handle the response using processResponse function
  } catch (error: any) {
    return processResponse(error.response); // Handle the error response using processResponse function
  }
};

export const postRequest = async (
  url: string,
  body: any
): Promise<any> => {
  let header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response: AxiosResponse = await axios.post(
      SERVER_URL + url,
      body,
      header
    );
    console.log("________ response ________",response)
    return processResponse(response); // Handle the response using processResponse function
  } catch (error: any) {
    return processResponse(error.response); // Handle the error response using processResponse function
  }
};
export const putRequest = async (
  url: any,
  body: any
): Promise<any> => {
  let header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response: AxiosResponse = await axios.put(
      SERVER_URL + url,
      body,
      header
    );

    return processResponse(response); // Handle the response using processResponse function
  } catch (error: any) {
    throw processResponse(error.response); // Handle the error response using processResponse function
  }
};
export const processResponse = async (response: any) => {
  const { status, data } = response ?? {};

  return { data, status };
};
