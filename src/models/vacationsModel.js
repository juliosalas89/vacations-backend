import mysql from "../adapters/mysql";
import { v4 } from "uuid";
import moment from "moment";
import {
    getVacationsQuery,
    getUuidQuery,
    insertVacationQuery,
    deleteVacationQuery,
    updateVacationQuery,
    countVacationsQuery
} from "../repositories/vacationsRepository";



const getVacationsModel = ({ conn, ...rest }) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(getVacationsQuery(paramsToSearch), conn, paramsToSearch)
        .then(queryResult => queryResult.map(({ id, persons_id, deleted, created, ...resultFiltered }) => resultFiltered));
};

const countVacationsModel = ({ conn, ...rest }) => {
    return mysql
    .execute(countVacationsQuery(rest), conn, rest)
    .then(results => results[0].count);
}

const getUuidModel = ({ conn, ...rest }) => {
    return mysql
        .execute(getUuidQuery({ ...rest }), conn, { ...rest })
        .then(queryResult => queryResult.map(({ id, persons_id, deleted, created, ...resultFiltered }) => resultFiltered));
};

const postVacationModel = ({ conn, ...rest }) => {
    const created = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const new_uuid = v4();
    return mysql
        .execute(insertVacationQuery({ ...rest, created, new_uuid }), conn, { ...rest, created, new_uuid })
        .then(queryResult => queryResult.map(({ id, persons_id, deleted, created, ...resultFiltered }) => resultFiltered));
};

const deleteVacationModel = ({ conn, deleted, ...rest }) => {
    const deletedData = deleted === null ? null : moment.utc().format("YYYY-MM-DD HH:mm:ss");
    return mysql
        .execute(deleteVacationQuery({ ...rest, deletedData }), conn, { ...rest, deletedData });
};

const updateVacationModel = ({ conn, ...rest }) => {
    return mysql
        .execute(updateVacationQuery({ ...rest }), conn, { ...rest })
        .then(queryResult => queryResult[1].map(({ id, persons_id, deleted, created, ...resultFiltered }) => resultFiltered));
};

export {
    getVacationsModel,
    countVacationsModel,
    getUuidModel,
    postVacationModel,
    deleteVacationModel,
    updateVacationModel
};