import Database from 'better-sqlite3';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config()

const db = new Database('database.db', {verbose: console.log});
const saltRounds = 10;

const DEMO_USERS = [
    {username: 'washer', password: 'washer', type: 'washer'},
    {username: 'display', password: 'display', type: 'display'}
]

const DEMO_MACHINES = [
    {name: 'Wash1', status: 'ready'},
    {name: 'Wash2', status: 'running'},
    {name: 'Wash3', status: 'spinning'}
]

db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, password TEXT, type TEXT)");
db.exec("CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, status TEXT)");


const userInsert = db.prepare('INSERT INTO users (username, password, type) VALUES (?, ?, ?)');
const machineInsert = db.prepare('INSERT INTO machines (name, status) VALUES (?, ?)');

const userTransactions = db.transaction((users) => {
    for (const user of users) {
        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            userInsert.run(user.username, hash, user.type);
        });
    }
});

const machineTransactions = db.transaction((machines) => {
    for (const machine of machines) {
        machineInsert.run(machine.name, machine.status);
    }
});

if (process.env.DEMO_DATA === 'TRUE') {
    userTransactions(DEMO_USERS);
    machineTransactions(DEMO_MACHINES);
}

bcrypt.hash(process.env.API_PASSWORD, saltRounds, function (err, hash) {
    userInsert.run(process.env.API_ADMIN, hash, 'admin');
});


