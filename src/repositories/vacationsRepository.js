const getVacationsQuery = ({ person, vacation }) => {
    const personFilter = person ? ` AND persons.name = :person` : '';
    const vacationFilter = vacation ? ` AND vacations.place = :vacation` : '';
    return `
        SELECT vacations.*, persons.*
        FROM vacations.vacations
        LEFT JOIN vacations.persons ON persons.id = vacations.persons_id
        WHERE
        true
        ${personFilter}
        ${vacationFilter};`
}

const insertVacationQuery = ({ name, new_uuid }) => {
    return `
        INSERT INTO vacations.vacations (uuid, persons_id, place, date_start, date_end, rating, all_inclusive, created) 
        VALUES (
            :new_uuid, 
            (SELECT vacations.persons.id
                FROM vacations.persons
                WHERE uuid = :uuid), 
            :place, 
            :dateStart, 
            :dateEnd,
            :rating, 
            :allInclusive,
            :created);`
}

const deleteVacationQuery = ({ uuid }) => {
    console.log(uuid)
    return `
        UPDATE 
        vacations.vacations
        SET 
        vacations.deleted = :deleted
        WHERE 
        vacations.uuid = :uuid;
    `
}

const updateVacationQuery = ({ place, dateStart, dateEnd, rating, allInclusive, uuid }) => {

    const placeUpdate = place ? `vacations.place = :place` : '',
        dateStartUpdate = dateStart ? `vacations.date_start = :dateStart` : '',
        dateEndUpdate = dateEnd ? `vacations.date_end = :dateEnd` : '',
        ratingUpdate = rating ? `vacations.rating = :rating` : '',
        allInclusiveUpdate = allInclusive < 2 ? `vacations.all_inclusive = :allInclusive` : '';

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
    `
}

export {
    getVacationsQuery,
    insertVacationQuery,
    deleteVacationQuery,
    updateVacationQuery
};