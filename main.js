const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const {connectToDb, getDbEmployees, insertDBEmployee} = require('./db.js');
const app = express();
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('App started on port 3000');
});

app.get("/", (req, res) => { res.sendFile(Path.resolve(__dirname, "index.html")) });

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

    type Mutation{
      setAboutMessage(message: String!): String
      addEmployee(employee: EmployeeInputs!): Employee
    }

    type Query {
      about: String!
      employeeList: [Employee!]!
    }
`;

let msg = 'Employee Management System API v1.0';
const resolvers = {
    Query: {
        about: getAboutMessage,
        employeeList: getEmployees,
    },
    Mutation: {
        setAboutMessage,
        addEmployee,
    },
};

function getAboutMessage() {
    return msg;
}

async function getEmployees() {
    return await getDbEmployees();
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

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    connectToDb();
}

startServer();
