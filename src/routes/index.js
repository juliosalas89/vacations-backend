import { Router } from "express";
import { indexController } from "../controllers/indexController";
import { getVacationsController } from "../controllers/vacationsController";
import { sendOkResponse } from "../utils/responses";

export default (config) => {
    const routes = Router();

    routes.get('/', 
    // indexController,
    // (result, req,res, next) => sendOkResponse(result, req, res),
    (req, res, next) => getVacationsController(req, res, next, config)
    )

    return routes
}