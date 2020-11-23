const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://feeliks:kilpi@cluster0.ew8ka.mongodb.net/microservice?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database to use
const dbName = "usersdatabase";

// Function to insert some data into users collection
async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to cloud DB");
        const db = client.db(dbName);
        const col = db.collection("users");
        // Document to save into collection
        let userDocuments = [
            { "username": "Felix", "password": "admin", "role": "admin"},
            { "username": "user", "password": "user", "role": "user"},
            { "username": "Joe", "password": "abcd", "role": "user"},
            { "username": "Kamala", "password": "hijk", "role": "user"},
        ]
        const ud = await col.insertMany(userDocuments);
        console.dir(ud.insertedCount);
    } catch (err) {
            console.log(err.stack);
        }
    finally {
        // Close connection to client
        await client.close();
    }

}

// Function to find user from DB by searching match with username and password
async function find(uname, upass) {
    let loginStatus = false;
    try {
        await client.connect();
        console.log("Connected...");
        const db = client.db(dbName);
        const col = db.collection("users");
        console.log("searching for user...");
        // Cursor is the data that is found, it needs to be looped through with forEach
        const cursor = col.find({});
        await cursor.forEach(doc => {
            if (doc.username === uname && doc.password === upass) {
                console.log("Username is: " + doc.username + " and password is: " + doc.password);
                loginStatus = true;
                
            }
            return loginStatus;
        });

    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

// Function to read whole user documents list from DB
async function listAllUsers() {
    try {
        await client.connect();
        console.log("Connected...");
        const db = client.db(dbName);
        const col = db.collection("users");
        const cursor = await col.find({});
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

//run();
//let isLoggedIn = find("Joe", "abcd");
//console.log(isLoggedIn);
let list = listAllUsers();
console.log(list);

module.exports = { find, listAllUsers }
