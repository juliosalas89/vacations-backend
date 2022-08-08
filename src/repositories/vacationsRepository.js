
const _vacationsQuery = ()=> {
    return `
        SELECT vacations.*, persons.*
        FROM vacations.vacations
        LEFT JOIN vacations.persons ON persons.id = vacations.persons_id;
    `
}

const getVacationsQuery = ()=> _vacationsQuery();

export {getVacationsQuery};