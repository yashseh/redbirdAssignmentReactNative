import axios from 'axios';
import { ICustomizedErrorResponse, IGetRequestParams, IPostRequestParams } from './types';

//post request api base class
export const postApiCall = async (params: IPostRequestParams) => {
    let url = params.url;
    let headers = params.headers ?? {};
    let config = { headers };
    let data = params.data;
    try {
        const response = await axios.post(url, data, config);
        return Promise.resolve(response.data);
    } catch (error) {
        const customizedError = error as ICustomizedErrorResponse;
        return Promise.reject({
            statusCode: customizedError?.status,
            message: customizedError?.message ?? customizedError?.error ?? 'Something went wrongS'
        });
    }
};

//get request api base class
export const getApiCall = async (params: IGetRequestParams) => {
    let url = params.url;
    let headers = params.headers ?? {};
    let config = { headers };
    try {
        const response = await axios.get(url, config);
        console.log(response, 'api eror');
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(JSON.stringify(error), 'api eror');
        const customizedError = error as ICustomizedErrorResponse;
        return Promise.reject({
            statusCode: customizedError?.status,
            message: customizedError?.message ?? customizedError?.error ?? 'Something went wrongS'
        });
    }
};
