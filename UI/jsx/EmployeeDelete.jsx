import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function withRouter(Component) {
    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

class EmployeeDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
            error: null,
        };
    }

    async componentDidMount() {
        const { id } = this.props.params;
        console.log(`Fetching employee with ID: ${id}`);

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
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { id } }),
        });

        const result = await response.json();
        if (result.data && result.data.employee) {
            this.setState({ employee: result.data.employee, loading: false });
        } else {
            this.setState({ error: "Employee not found", loading: false });
        }
    }

    handleDelete = async () => {
        const { id } = this.props.params;
        console.log(`Deleting employee with ID: ${id}`);

        const mutation = `
            mutation deleteEmployee($id: ID!) {
                deleteEmployee(id: $id)
            }
        `;

        const response = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: mutation, variables: { id } }),
        });

        const result = await response.json();
        if (result.data && result.data.deleteEmployee) {
            alert("Employee deleted successfully.");
            this.props.navigate("/employee/list"); // 删除后跳转回列表
        } else {
            alert("Failed to delete employee.");
        }
    };

    render() {
        const { employee, loading, error } = this.state;

        if (loading) return <p className="text-center mt-3">Loading...</p>;
        if (error) return <p className="text-center text-danger mt-3">{error}</p>;

        return (
            <div className="container my-4">
                <h3 className="mb-3 text-center text-danger">Delete Employee</h3>
                <div className="row g-3">
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
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" value={employee.title} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Department</label>
                        <input type="text" className="form-control" value={employee.department} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Type</label>
                        <input type="text" className="form-control" value={employee.employeeType} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Status</label>
                        <span
                            className={`form-control ${employee.currentStatus ? "text-success" : "text-danger"
                                }`}
                        >
                            {employee.currentStatus ? "Working" : "Retired"}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-danger" onClick={this.handleDelete}>Confirm Delete</button>
                        <Link to="/employee/list" className="btn btn-secondary">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EmployeeDelete);