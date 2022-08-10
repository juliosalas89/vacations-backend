import mysql from '../adapters/mysql';
import { error404, errorHandler } from '../utils/errors';
import { noResults } from '../validators/resultsValidator';
import {
    getVacationsModel,
    countVacationsModel,
    getUuidModel,
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
    .then(response => {
            if (noResults(response)) {
                const err = error404();
                const error = errorHandler(err, config.enviroment);
                return sendResponseNotFound(res, error);
            }
            const result = {
                _data: { response }
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
// const getUuidController = (req, res, next, config) => {
//     const conn = mysql.start(config);

//     getUuidModel({ ...req.params, conn })
//         .then(response => {
//             if (noResults(response)) {
//                 const err = error404();
//                 const error = errorHandler(err, config.enviroment);
//                 return sendResponseNotFound(res, error);
//             }
//             const result = {
//                 _data: { response }
//             }
//             next(result);

//         })
//         .catch((err) => {
//             const error = errorHandler(err, config.environment);
//             res.status(error.code).json(error);
//         })
//         .finally(() => {
//             mysql.end(conn);
//         })
// }

//POST CONTROLLER
const postVacationsController = (req, res, next, config) => {
    const conn = mysql.start(config);
    postVacationModel({ ...req.body, conn })
        .then(arrResponse => {
            const response = arrResponse[1][0]
            const result = {
                _data: { response }
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
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
}

//PUT CONTROLLER
const updateVacationController = (req, res, next, config) => {
    const conn = mysql.start(config)
    updateVacationModel({ ...req.params, ...req.body, conn })
        .then(arrResponse => {
            const response = arrResponse[0]
            const result = {
                _data: { response }
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
    updateVacationController,
    getUuidController
};