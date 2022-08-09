import { Router } from "express";
import { indexController } from "../controllers/indexController";
import { check } from "express-validator";
import { 
    getVacationsController, 
    postVacationsController, 
    deleteVacationController, 
    updateVacationController 
} from "../controllers/vacationsController";
import { sendOkResponse } from "../utils/responses";

export default (config) => {
    const routes = Router();

    routes.get('/', 
    indexController,
    (result, req,res, next) => sendOkResponse(result, req, res),
    )

    routes.get('/vacation',
    //query check
    (req, res, next) => getVacationsController(req, res, next, config)
    )

    routes.post('/vacation',
    [
        check('uuid', 'Validation error: uuid is required').notEmpty(),
        check('place', 'Validation error: place is required').notEmpty(),
        check('dateStart', 'Validation error: date_start is required').notEmpty(),
        check('dateEnd', 'Validation error: date_end is required').notEmpty(),
        check('rating', 'Validation error: rating is required').notEmpty(),
        check('allInclusive', 'Validation error: all_inclusive is required').notEmpty()
    ],
    (req, res, next) => postVacationsController(req, res, next, config)
    )

    routes.delete('/vacation/:uuid',
    (req, res, next) => deleteVacationController(req, res, next, config)
    )

    routes.put('/vacation/:uuid',
    (req, res, next) => updateVacationController(req, res, next, config)
    )

    return routes
}