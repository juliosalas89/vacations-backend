const errorHandler = (err, environment) => {
    const responseJson = {}

    switch (err.code) {
        case "BAD_REQUEST":
            responseJson.message = "Bad Request";
            responseJson.code = 400;
            break;
        case "UNPROCESABLE_ENTITY":
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