import mysql from '../adapters/mysql';
import { error404, errorHandler } from '../utils/errors';
import { noResults, noResultsGet, noResultsPut } from '../validators/resultsValidator';
import { 
    getVacationsModel, 
    postVacationModel, 
    deleteVacationModel, 
    updateVacationModel 
} from "../models/vacationsModel";
import { sendOkResponse, sendResponseNotFound } from '../utils/responses';

//GET CONTROLLER
const getVacationsController = (req, res, next, config) => {
    const conn = mysql.start(config);

    getVacationsModel({...req.query, conn})
    .then(response => {
        console.log(response)
        if(noResultsGet(response)) {
            const err = error404();
            const error = errorHandler(err, config.enviroment);
            return sendResponseNotFound(res, error);
        }
        return sendOkResponse(response, req , res)
    })
    .catch((error) => {
        console.log(error);
    })
}

//POST CONTROLLER
const postVacationsController = (req, res, next, config) => { 
    const conn = mysql.start(config);
    postVacationModel({...req.body, conn})
    .then(() => {
        res.status(201).send({message: 'Vacation saved'});
    })
    .catch((error)=> {
        console.log(error);
    })
}

//DELETE CONTROLLER
const deleteVacationController = (req, res, next, config)=> {
    const conn = mysql.start(config)
    deleteVacationModel({...req.params, conn})
    .then(response => {
        if(noResultsPut(response)) {
            console.log(response)
            const err = error404();
            const error = errorHandler(err, config.enviroment);
            return sendResponseNotFound(res, error);
        }
        return sendOkResponse(response, req , res)
    })
    .catch((error)=> {
        console.log(error);
    })
}

//PUT CONTROLLER
const updateVacationController = (req, res, next, config) => {
    const conn = mysql.start(config)
    console.log(req.body)
    updateVacationModel({...req.params, ...req.body, conn})
    .then(response => {
        if(noResultsPut(response)) {
            console.log(response)
            const err = error404();
            const error = errorHandler(err, config.enviroment);
            return sendResponseNotFound(res, error);
        }
        return sendOkResponse(response, req , res)
    })
    .catch((error)=> {
        console.log(error);
    })
}

export {
    getVacationsController, 
    postVacationsController, 
    deleteVacationController,
    updateVacationController
};