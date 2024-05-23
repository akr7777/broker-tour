import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL as string,
    // withCredentials: true,
});

export type ReqBodyType = {
    name: string | undefined,
    email: string | undefined,
    phone: string | undefined,
    title: string | undefined,
    content: string | undefined,
    origin: string | undefined,
}
export const feedbackAPI = {
    sendFeedbackMsg: (data: ReqBodyType): Promise<AxiosResponse> => {
      return instance.post('/contact_form', data)
    },
}