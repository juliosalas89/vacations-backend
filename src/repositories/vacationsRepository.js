import { pagination } from "../utils/pagination";

const _vacationsQuery = (_pagination = '') => ({ count }) => ({ person, vacation, uuid  }) => {
    const uuidFilter = uuid ? ` AND vacations.uuid = :uuid` : '';
    const personFilter = person ? ` AND persons.name LIKE CONCAT('%',:person,'%')` : '';
    const vacationFilter = vacation ? ` AND vacations.place LIKE CONCAT('%',:vacation,'%')` : '';
    return `
        SELECT 
            ${count || "vacations.*, persons.name AS persons_name, persons.uuid AS persons_uuid"} 
        FROM 
            vacations.vacations
        LEFT JOIN 
            vacations.persons 
        ON 
            persons.id = vacations.persons_id
        WHERE
            vacations.deleted IS NULL
        AND
            true
            ${personFilter}
            ${vacationFilter}
            ${uuidFilter}
            ${_pagination}
        ;
    `
};

const getVacationsQuery = ({limit, page, person, vacation, uuid }) => _vacationsQuery(pagination({limit, page}))({count: false})({ person, vacation, uuid });

const countVacationsQuery = (rest) => _vacationsQuery()({ count: 'COUNT(*) AS count' })(rest);

const insertVacationQuery = () => {
    return `
        INSERT INTO vacations.vacations (uuid, persons_id, place, date_start, date_end, rating, all_inclusive, created) 
        VALUES (
            :uuid, 
            (SELECT id
                FROM vacations.persons
                WHERE uuid = :personsUuid), 
            :place, 
            :dateStart, 
            :dateEnd,
            :rating, 
            :allInclusive,
            :created);
        
        SELECT *
        FROM vacations.vacations
        WHERE uuid = :uuid
        `
};

const deleteVacationQuery = () => {
    return `
        UPDATE 
        vacations.vacations
        SET 
        vacations.deleted = :deletedData
        WHERE 
        vacations.uuid = :uuid;
    `
};

const updateVacationQuery = ({ place, dateStart, dateEnd, rating, allInclusive }) => {

    const placeUpdate = place ? `vacations.place = :place` : '';
    const dateStartUpdate = dateStart ? `vacations.date_start = :dateStart` : '';
    const dateEndUpdate = dateEnd ? `vacations.date_end = :dateEnd` : '';
    const ratingUpdate = rating ? `vacations.rating = :rating` : '';
    const allInclusiveUpdate = allInclusive < 2 ? `vacations.all_inclusive = :allInclusive` : '';

    const querySetString = [placeUpdate, dateStartUpdate, dateEndUpdate, ratingUpdate, allInclusiveUpdate].reduce((acc, item) => {
        return (item !== '' && acc !== '') ? (acc + ', ' + item) : (acc + item);
    }, '');

    return `
        UPDATE 
            vacations.vacations
        SET 
            ${querySetString}
        WHERE 
            vacations.uuid = :uuid;
        
        SELECT *
        FROM vacations.vacations
        WHERE uuid = :uuid
    `
};

export {
    getVacationsQuery,
    countVacationsQuery,
    insertVacationQuery,
    deleteVacationQuery,
    updateVacationQuery
};