import React from "react";
import { Link, useNavigate } from "react-router-dom";

function withRouter(Component) {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

class EmployeeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            age: "",
            dateOfJoining: "",
            title: "Employee",
            department: "IT",
            employeeType: "FullTime",
            currentStatus: "true",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { navigate } = this.props;

        const age = parseInt(this.state.age, 10);
        if (age < 20 || age > 70) {
            alert("Age must be between 20 and 70.");
            return;
        }

        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: age,
            dateOfJoining: this.state.dateOfJoining,
            title: this.state.title,
            department: this.state.department,
            employeeType: this.state.employeeType,
            currentStatus: this.state.currentStatus === "true",
        };

        // 发送数据到 GraphQL API
        fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `mutation addEmployee($employee: EmployeeInputs!) {
                    addEmployee(employee: $employee) { id }
                }`,
                variables: { employee },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Employee added:", data);
                navigate("/employee/list"); // 创建成功后跳转回列表页
            })
            .catch((error) => console.error("Error adding employee:", error));

        this.setState({
            firstName: "",
            lastName: "",
            age: "",
            dateOfJoining: "",
            title: "Employee",
            department: "IT",
            employeeType: "FullTime",
            currentStatus: "true",
        });
    };

    render() {
        return (
            <div className="container my-4">
                <h3 className="mb-3">Create New Employee</h3>
                <form onSubmit={this.handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" className="form-control" value={this.state.age} onChange={this.handleChange} min="20" max="70" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Date Of Joining</label>
                        <input type="date" name="dateOfJoining" className="form-control" value={this.state.dateOfJoining} onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <select name="title" className="form-select" value={this.state.title} onChange={this.handleChange} required>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Department</label>
                        <select name="department" className="form-select" value={this.state.department} onChange={this.handleChange} required>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Type</label>
                        <select name="employeeType" className="form-select" value={this.state.employeeType} onChange={this.handleChange} required>
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Status</label>
                        <select name="currentStatus" className="form-select" value={this.state.currentStatus} onChange={this.handleChange} required>
                            <option value="true">Working</option>
                            <option value="false">Retired</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-success">Create</button>
                        <Link to="/employee/list" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EmployeeCreate);