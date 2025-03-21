const express = require('express');
require("dotenv").config({ path: "api.env" });
const { ApolloServer, gql } = require('apollo-server-express');
const { connectToDb, getDBEmployees, insertDBEmployee, updateDBEmployee, getDBEmployeeById, deleteDBEmployee } = require('./db.js');
const path = require("path");

const app = express();

app.use(express.static('public'));
app.get("/", (req, res) => { res.sendFile(path.resolve(__dirname, "index.html")) });

const mySchema = gql`
    scalar GraphQLDate
    type Employee {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int!
        dateOfJoining: String!
        title: String!
        department: String!
        employeeType: String!
        currentStatus: Boolean!
    }

    input EmployeeInputs {
        firstName: String
        lastName: String
        age: Int
        dateOfJoining: String
        title: String
        department: String
        employeeType: String
        currentStatus: Boolean
    }

    type Mutation {
        setAboutMessage(message: String!): String
        addEmployee(employee: EmployeeInputs!): Employee
        updateEmployee(id: ID!, employee: EmployeeInputs!): Employee
        deleteEmployee(id: ID!): Boolean
    }

    type Query {
        about: String!
        employeeList: [Employee!]!
        employee(id: ID!): Employee
    }
`;

let msg = 'Employee Management System API v1.0';
const resolvers = {
    Query: {
        about: getAboutMessage,
        employeeList: getEmployees,
        employee: getEmployeeById,
    },
    Mutation: {
        setAboutMessage,
        addEmployee,
        updateEmployee,
        deleteEmployee,
    },
};

function getAboutMessage() {
    return msg;
}

async function getEmployees() {
    return await getDBEmployees();
}

async function getEmployeeById(_, { id }) {
    console.log(`Looking for Employee with ID: ${id}`);
    return await getDBEmployeeById(id);
}

async function updateEmployee(_, { id, employee }) {
    console.log(`Update Employee with ID: ${id} - ${JSON.stringify(employee)}`);
    return await updateDBEmployee(id, employee);
}

async function deleteEmployee(_, { id }) {
    console.log(`Deleting Employee with ID: ${id}`);
    return await deleteDBEmployee(id);
}

function setAboutMessage(_, { message }) {
    msg = message;
    return msg;
}

async function addEmployee(_, { employee }) {
    const newEmployee = await insertDBEmployee(employee);
    return newEmployee;
}

const server = new ApolloServer({
    typeDefs: mySchema,
    resolvers,
});

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);

const port = process.env.API_PORT || 4000;

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
    connectToDb();
    app.listen(port, function () {
        console.log(`Server running at http://localhost:${port}/graphql`);
    });
});