import mysql from 'mysql2/promise';
import config from './dbconfig.js';

let pool = mysql.createPool(config);

/*async function getConnectionForAdd(callback) {
    await pool.getConnection(async function (err, conn) {
        if (!err) {
            callback(conn);
        }
    });
}*/

async function getConnection(query, values){
    let result = [];
    try{
        let connection = await pool.getConnection(async conn => conn);
        try{
            result = await connection.query(query, values);
            connection.release();
        }catch(e){
            console.log(e);
        }
    } catch(e){
        console.log(e);
    }

    return result;
}

export {getConnection};