const fs = require('fs').promises;
const path = require('path');

const db_path = path.join(__dirname, 'db.json');

const db = {};

async function getUser(userid) {
    let db_data = await fs.readFile(db_path);
    try {
        let db_json = JSON.parse(db_data, null, '\t');
        return db_json.users[userid];

    } catch (error) {
        console.warn('Error reading db info. Recreating... ',  error);
        await fs.writeFile(db_path, '{"users": {}}');
        return null;
    }
}

async function setUser(userid, info) {
    let db_data = await fs.readFile(db_path);
    try {
        let db_json = JSON.parse(db_data, null, '\t');
        db_json.users[userid] = info;

        await fs.writeFile(db_path, JSON.stringify(db_json));
    } catch (error) {
        console.warn('Error reading db info. Recreating... ',  error);
        await fs.writeFile(db_path, '{"users": {}}');
        return null;
    }
}

module.exports = {
    getUser,
    setUser
};