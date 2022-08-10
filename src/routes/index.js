import { Router } from "express";
import { indexController } from "../controllers/indexController";
import { sendCreatedReponse, sendOkResponse, sendResponseNoContent } from "../utils/responses";
import { payloadExpressValidator } from "../validators/payloadExpressValidator";
import { isValidDate, isValidDeleted, isValidRating } from "../validators/customValidators";
import { check, param, query } from "express-validator";
import {
    getVacationsController,
    getUuidController,
    postVacationsController,
    deleteVacationController,
    putVacationController
} from "../controllers/vacationsController";

export default (config) => {
    const routes = Router();

    //GET "SERVER UP" RESPONSE
    routes.get('/',
        indexController,
        (result, req, res, next) => sendOkResponse(result, req, res),
    );

    //GET ALL VACATIONS OR GET VACATIONS BY PLACE OR PERSON
    routes.get('/vacation',
        [
            query('limit').optional().isInt(),
            query('page').optional().isInt(),
            query('person').optional().isString(),
            query('vacation').optional().isString(),
        ],
        (req, res, next) => payloadExpressValidator(req, res, next, config),
        (req, res, next) => getVacationsController(req, res, next, config),
        (result, req, res, next) => sendOkResponse(result, req, res),

        );

    routes.get('/vacation/:uuid',
        [
            param('uuid').isString()
        ],
        (req, res, next) => payloadExpressValidator(req, res, next, config),
        (req, res, next) => getUuidController(req, res, next, config),
        (result, req, res, next) => sendOkResponse(result, req, res)
    )

    //SAVE NEW VACATION ASOCIATED TO A PERSON
    routes.post('/vacation',
        [
            check('personsUuid').notEmpty().isString(),
            check('place').notEmpty().isString(),
            check('dateStart').notEmpty().custom(isValidDate),
            check('dateEnd').notEmpty().custom(isValidDate),
            check('rating').notEmpty().isInt().custom(isValidRating),
            check('allInclusive').notEmpty().isBoolean()
        ],
        (req, res, next) => payloadExpressValidator(req, res, next, config),
        (req, res, next) => postVacationsController(req, res, next, config),
        (result, req, res, next) => sendCreatedReponse(result, req, res)
    );

    //DELETE VACATION BY uuid
    routes.delete('/vacation/:uuid',
        [
            param('uuid').isString(),
            check('deleted').optional().custom(isValidDeleted)
        ],
        (req, res, next) => payloadExpressValidator(req, res, next, config),
        (req, res, next) => deleteVacationController(req, res, next, config),
        (result, req, res, next) => sendResponseNoContent(result, req, res)
    );

    //MODIFY EXISTING VACATION REGISTER
    routes.put('/vacation/:uuid',
        [
            check('uuid').optional().notEmpty().isString(),
            check('place').optional().notEmpty().isString(),
            check('dateStart').optional().notEmpty().custom(isValidDate),
            check('dateEnd').optional().notEmpty().custom(isValidDate),
            check('rating').optional().notEmpty().isInt().custom(isValidRating),
            check('allInclusive').optional().notEmpty().isBoolean()
        ],
        (req, res, next) => payloadExpressValidator(req, res, next, config),
        (req, res, next) => putVacationController(req, res, next, config),
        (result, req, res, next) => sendCreatedReponse(result, req, res)
    );

    return routes
}