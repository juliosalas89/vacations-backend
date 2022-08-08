import { getVacationsQuery } from "../repositories/vacationsRepository";
import mysql from "../adapters/mysql";

const getVacationsModel = ({conn, ...rest})=> {
    return mysql
        .execute(getVacationsQuery(), conn)
}

export {getVacationsModel};