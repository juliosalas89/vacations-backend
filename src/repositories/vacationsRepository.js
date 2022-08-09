const getVacationsQuery = ({ person, vacation }) => {
    console.log(person)
    console.log(vacation)
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
        INSERT INTO vacations.vacations (uuid, persons_id, place, date_start, date_end, rating, all_inclusive) 
        VALUES (
            :new_uuid, 
            (SELECT vacations.persons.id
                FROM vacations.persons
                WHERE uuid = :uuid), 
            :place, 
            :dateStart, 
            :dateEnd, 
            :rating, 
            :allInclusive);`
}

const deleteVacationQuery = ({ uuid }) => {
    console.log(uuid)
    return `
        UPDATE 
        vacations.vacations
        SET 
        vacations.deleted = '2022-08-08'
        WHERE 
        vacations.uuid = :uuid;
    `
}

const updateVacationQuery = ({ place, date_start, date_end, rating, all_inclusive, uuid }) => {

    const placeUpdate = place ? `vacations.place = :place` : '',
        dateStartUpdate = date_start ? `vacations.date_start = :date_start` : '',
        dateEndUpdate = date_end ? `vacations.date_end = :date_end` : '',
        ratingUpdate = rating ? `vacations.rating = :rating` : '',
        allInclusiveUpdate = all_inclusive ? `vacations.all_inclusive = :all_inclusive` : '';

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