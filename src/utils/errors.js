const errorHandler = (err, environment) => {
    const responseJson = {}

    switch (err.code) {
        case "ER_DUP_ENTRY":
            responseJson.message = "Conflict";
            responseJson.code = 409;
            break;
        case "BAD_REQUEST":
            responseJson.message = "Bad Request";
            responseJson.code = 400;
            break;
        case "UNPROCESSABLE_ENTITY":
            responseJson.message = "Unprocesable Entity";
            responseJson.code = 422;
            break;
        case "NOT_FOUND":
            responseJson.message = "Not Found";
            responseJson.code = 404;
            break;
        default:
            responseJson.message = "Server Error";
            responseJson.code = 500;
            break;
    };

    if ('development' === environment || 'test' === environment) {
        responseJson.error = err;
    };

    return responseJson;
}

const error404 = () => {
    const err = Error('Not Found');
    err.code = 'NOT_FOUND';
    return err;
}

export { errorHandler, error404 };