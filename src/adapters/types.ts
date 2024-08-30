export type IPostRequestParams = {
    url: string;
    data: unknown;
    headers?: unknown;
};

export type IGetRequestParams = {
    url: string;
    headers?: unknown;
};

export type ICustomizedErrorResponse = {
    status: number;
    message?: string;
    error?: string;
};
