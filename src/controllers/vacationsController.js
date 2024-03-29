import mysql from '../adapters/mysql';
import { error404, errorHandler } from '../utils/errors';
import { noResults } from '../validators/resultsValidator';
import {
    getVacationsModel,
    countVacationsModel,
    postVacationModel,
    deleteVacationModel,
    updateVacationModel
} from "../models/vacationsModel";
import { sendResponseNotFound } from '../utils/responses';

//GET CONTROLLER
const getVacationsController = (req, res, next, config) => {
    const conn = mysql.start(config);
    Promise.all([
        getVacationsModel({ ...req.query, conn }),
        countVacationsModel({ ...req.query, conn })
    ])
        .then(([getResults, countResults]) => {
            next({
                _data: {vacations: getResults},
                _page: {
                    totalElements: countResults,
                    limit: req.query.limit || 100,
                    page: req.params.page || (countResults && 1) || 0 
                }
            })
        })
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

//GET by UUID CONTROLER TERMINAR
const getUuidController = (req, res, next, config) => {
    const conn = mysql.start(config);

    getVacationsModel({ ...req.params, conn })
    .then(vacations => {
            if (noResults(vacations)) {
                const err = error404();
                const error = errorHandler(err, config.enviroment);
                return sendResponseNotFound(res, error);
            }
            const result = {
                _data: { vacations }
            }
            next(result);

        })
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

//POST CONTROLLER
const postVacationsController = (req, res, next, config) => {
    const conn = mysql.start(config);
    postVacationModel({ ...req.body, conn })
        .then(vacations => {
            const result = {
                _data: { vacations }
            }
            next(result);
        })
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

//DELETE CONTROLLER
const deleteVacationController = (req, res, next, config) => {
    const conn = mysql.start(config)
    deleteVacationModel({ ...req.params, ...req.body, conn })
        .then(() => {
            const result = {};
            next(result);
        })
        .catch((err) => {
            console.log('desde DELETE error')
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

//PUT CONTROLLER
const putVacationController = (req, res, next, config) => {
    const conn = mysql.start(config)
    updateVacationModel({ ...req.params, ...req.body, conn })
        .then(vacations => {
            if (noResults(vacations)) {
                const err = error404();
                const error = errorHandler(err, config.enviroment);
                return sendResponseNotFound(res, error);
            }
            const result = {
                _data: { vacations }
            }
            next(result);
        })
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

export {
    getVacationsController,
    postVacationsController,
    deleteVacationController,
    putVacationController,
    getUuidController
};