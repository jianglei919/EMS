import React from 'react';
import { Link } from 'react-router-dom';

class EmployeeTable extends React.Component {
    render() {
        // console.log("Rendering EmployeeTable with employees:", this.props.employees);
        const { employees = [] } = this.props;
        const rows = employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
        ));
        return (
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date Of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

class EmployeeRow extends React.Component {
    render() {
        const { employee } = this.props;
        return (
            <tr>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{employee.dateOfJoining}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>
                    <span className={`badge ${employee.currentStatus ? "bg-success" : "bg-danger"}`}>
                        {employee.currentStatus ? "Working" : "Retired"}
                    </span>
                </td>
                <td>
                    <div className="btn-group" role="group" aria-label="Employee Actions">
                        <Link to={`/employee/detail/${this.props.employee.id}`} className="btn btn-primary btn-sm">
                            <i className="bi bi-eye"></i> View
                        </Link>
                        <Link to={`/employee/delete/${this.props.employee.id}`} className="btn btn-danger btn-sm">
                            <i className="bi bi-trash"></i> Delete
                        </Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default EmployeeTable;