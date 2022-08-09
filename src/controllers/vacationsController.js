import mysql from '../adapters/mysql';
import { validationResult } from 'express-validator';
import { 
    getVacationsModel, 
    postVacationModel, 
    deleteVacationModel, 
    updateVacationModel 
} from "../models/vacationsModel";

const getVacationsController = (req, res, next, config) => {
    const conn = mysql.start(config);

    getVacationsModel({...req.query, conn})
    .then(response => {
        res.status(200).send(response);
    })
    .catch((error) => {
        console.log(error);
    })
}

const postVacationsController = (req, res, next, config) => {
    //VALIDATION
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
    }
    //-------
    const conn = mysql.start(config);
    postVacationModel({...req.body, conn})
    .then(() => {
        res.status(201).send({message: 'Vacation saved'});
    })
    .catch((error)=> {
        console.log(error);
    })
}

const deleteVacationController = (req, res, next, config)=> {
    const conn = mysql.start(config)
    deleteVacationModel({...req.params, conn})
    .then(response => {
        res.status(204).send(response);
    })
    .catch((error)=> {
        console.log(error);
    })
}

const updateVacationController = (req, res, next, config) => {
    const conn = mysql.start(config)
    console.log(req.body)
    updateVacationModel({...req.params, ...req.body, conn})
    .then(response => {
        res.status(200).send(response)
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