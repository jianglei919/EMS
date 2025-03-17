const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb+srv://<userName>:<password>@cluster0.3vvnl.mongodb.net/EmployeeManagement';

let db;
async function connectToDb() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB at', dbUrl);
};

async function getDbEmployees() {
    const employees = await db.collection('employees2').find({}).toArray();
    return employees || [];
}

async function insertDBEmployee(employee) {
    employee.id = await getNextSequence('Employees');
    console.log('insertDBEmployee employee:', employee);

    const result = await db.collection('employees2').insertOne(employee);
    
    if (!result.acknowledged) {
        throw new Error('Failed to insert employee');
    }

    return await db.collection('employees2').findOne({ _id: result.insertedId });
}

async function getNextSequence(filedname) {
    const result = await db.collection('counters').findOneAndUpdate(
        { name: filedname },
        { $inc: { counter: 1 } },
        { returnOriginal: false },
    );

    console.log('result:', result);

    return result.counter;
}

module.exports = { connectToDb, getDbEmployees, insertDBEmployee };