export const sendOkResponse = (result, req, res) => {
    res.status(200).json(result);
}