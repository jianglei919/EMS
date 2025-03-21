import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function withRouter(Component) {
    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

class EmployeeUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
            title: "",
            department: "",
            currentStatus: "",
        };
    }

    async componentDidMount() {
        const { id } = this.props.params;
        const query = `
            query getEmployeeById($id: ID!) {
                employee(id: $id) {
                    id
                    firstName
                    lastName
                    age
                    dateOfJoining
                    title
                    department
                    employeeType
                    currentStatus
                }
            }`;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { id } }),
        });

        const result = await response.json();
        if (result.data && result.data.employee) {
            const { title, department, currentStatus } = result.data.employee;
            this.setState({
                employee: result.data.employee,
                title,
                department,
                currentStatus: currentStatus ? "true" : "false",
                loading: false,
            });
        } else {
            this.setState({ loading: false });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { navigate } = this.props;
        const { id } = this.props.params;
        const { title, department, currentStatus } = this.state;

        const updatedEmployee = {
            title,
            department,
            currentStatus: currentStatus === "true",
        };

        fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    mutation updateEmployee($id: ID!, $employee: EmployeeInputs!) {
                        updateEmployee(id: $id, employee: $employee) {
                            id
                        }
                    }`,
                variables: { id, employee: updatedEmployee },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Employee updated:", data);
                navigate("/employee/list"); // 更新成功后跳转回列表页
            })
            .catch((error) => console.error("Error updating employee:", error));
    };

    render() {
        const { employee, loading, title, department, currentStatus } = this.state;

        if (loading) return <p className="text-center mt-3">Loading...</p>;
        if (!employee) return <p className="text-center text-danger mt-3">Employee not found</p>;

        return (
            <div className="container my-4">
                <h3 className="mb-3 text-primary text-center">Update Employee</h3>
                <form onSubmit={this.handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={employee.firstName} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value={employee.lastName} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" value={employee.age} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Date Of Joining</label>
                        <input type="date" className="form-control" value={employee.dateOfJoining} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Type</label>
                        <input type="text" className="form-control" value={employee.employeeType} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <select name="title" className="form-select" value={title} onChange={this.handleChange} required>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Department</label>
                        <select name="department" className="form-select" value={department} onChange={this.handleChange} required>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Status</label>
                        <select name="currentStatus" className="form-select" value={currentStatus} onChange={this.handleChange} required>
                            <option value="true">Working</option>
                            <option value="false">Retired</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <Link to="/employee/list" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EmployeeUpdate);