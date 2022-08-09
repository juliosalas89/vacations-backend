import mysql from "../adapters/mysql";
import { v4 } from "uuid";
import { 
    getVacationsQuery, 
    insertVacationQuery, 
    deleteVacationQuery,
    updateVacationQuery
} from "../repositories/vacationsRepository";



const getVacationsModel = ({conn, ...rest})=> {
    const paramsToSearch = { ...rest};

    return mysql
        .execute(getVacationsQuery(paramsToSearch), conn, paramsToSearch)
        .then(queryResult => queryResult.map(({id, persons_id, deleted, created, ...resultFiltered}) => resultFiltered));
}

const postVacationModel = ({conn, ...rest})=> {
    const new_uuid = v4();
    return mysql
        .execute(insertVacationQuery({...rest, new_uuid}), conn, {...rest, new_uuid});
}

const deleteVacationModel = ({conn, ...rest}) => {
    return mysql
    .execute(deleteVacationQuery({...rest}), conn, {...rest})
}

const updateVacationModel = ({conn, ...rest}) => {
    return mysql
    .execute(updateVacationQuery({...rest}), conn, {...rest})
}

export {
    getVacationsModel, 
    postVacationModel, 
    deleteVacationModel,
    updateVacationModel
};