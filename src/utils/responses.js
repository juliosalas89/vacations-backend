

export const sendOkResponse = (result, req, res) => {
    res.status(200).json(result);
};

export const sendCreatedReponse = (result, req, res) => {
    res.status(201).json(result);
};

export const sendResponseNoContent = (result, req, res) => {
    res.status(204).json(result);
};

export const sendResponseServerError = (res, err) => {
    res.status(500).json(err);
};

export const sendResponseBadRequest = (res, err) => {
    res.status(400).json(err);
};
export const sendResponseNotFound = (res, err) => {
    res.status(404).json(err);
};
export const sendResponseUnprocessableEntity = (res, err) => {
    res.status(422).json(err);
};