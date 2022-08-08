import mysql from '../adapters/mysql'
import { getVacationsModel } from "../models/vacationsModel"

const getVacationsController = async (req, res, next, config) => {
    const conn = mysql.start(config);

    getVacationsModel({...req.query, conn})
    .then(response => {
        res.status(200).send(response)
    })
}

export {getVacationsController};