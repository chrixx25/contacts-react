export const getError = error => {
    if (error.response)
        return error.response.data.message
    if (error.request)
        return 'The request was made but no response was received';
    return 'Something happened in setting up the request that triggered an Error';
}