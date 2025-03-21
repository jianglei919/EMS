const { MongoClient } = require('mongodb');
const dbUrl = process.env.DB_URL;

let db;
async function connectToDb() {
    const client = new MongoClient(dbUrl);
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB at', dbUrl);
};

async function getDBEmployees() {
    const employees = await db.collection('employees2').find({}).toArray();
    return employees || [];
}

async function getDBEmployeeById(id) {
    return await db.collection('employees2').findOne({ id: parseInt(id, 10) });
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

async function updateDBEmployee(id, employee) {
    const updatedEmployee = await db.collection('employees2').findOneAndUpdate(
        { id: parseInt(id, 10) },
        { $set: employee },
        { returnDocument: "after" }
    );

    if (!updatedEmployee.value) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    return updatedEmployee.value;
}

async function deleteDBEmployee(id) {
    const result = await db.collection("employees2").deleteOne({ id: parseInt(id, 10) });
    return result.deletedCount > 0;
}

async function getNextSequence(filedname) {
    const result = await db.collection('counters').findOneAndUpdate(
        { name: filedname },
        { $inc: { counter: 1 } },
        { returnOriginal: false },
    );

    console.log(`getNextSequence result: ${result}`);

    return result.counter;
}

module.exports = { connectToDb, getDBEmployees, insertDBEmployee, updateDBEmployee, getDBEmployeeById, deleteDBEmployee };