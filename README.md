### This is the backend of a vacations-review application.
# This simple project was developed for practicing relational DB in MySQL without ORM.
Some technologies used:
1- Express
2- Babel
3- Nodemon
4- mysql
5- express-validator
6- supertest
7- tape


### index controller
# Method: GET -- Route: /
GET: response "Server up!"

### Vacations
# Method: GET/POST -- Route: /vacation - /vacation?person=<int:person.name>&vacation=<int:vacation.place>

GET: get all vacations - get vacations by place - get vacations by person

POST: Set new vacation. 
model: 
{
    persons_id: BIGINT(19) - NN,
    place: VARCHAR(255) - NN,
    date_start: DATETIME (string "YYYY-MM-DD") - NN,
    date_end: DATETIME (string "YYYY-MM-DD") - NN,
    rating: INT(11) - NN,
    all_inclusive: TINYINT(4) (Boolean) - NN
}

# Method: DELETE/PUT -- Route: /vacation/uuid

DELETE: 
1- With no body changes "deleted" value to the current date, when the query is sent. ("deleted" default value is "null").
2- With object { delted: null } in the body  changes "deleted" value to null, so the information is no longer deleted.

PUT: Change atributes on an existing object.
options:
{
    place, 
    date_start, 
    date_end,
    rating, 
    all_inclusive
}