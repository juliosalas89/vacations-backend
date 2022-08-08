import mysql from 'mysql';

const mysqlAdapter = () => {
    const start = config => mysql.createConnection(Object.assign({}, config.db, {multipleStatements: true}));
    const end   = conn => conn.end();

    const execute = (query, conn, params) => {
        conn.config.queryFormat = function (query2, values) {
            if (!values) return query2;
            return query2.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        return new Promise(function (resolve, reject) {
            if (!query || 0 === query.trim().length) {
                reject('No query provided');
            } else {
                conn.query(query, params, function (err, result) {
                    if (err) reject(err);
                    else resolve(result);
                });
            }
        });
    };

    return {start, end, execute}
};

export default mysqlAdapter();