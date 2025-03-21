import React from "react";
import { Link, useParams } from "react-router-dom";

function withRouter(Component) {
    return (props) => {
        const params = useParams();
        return <Component {...props} params={params} />;
    };
}

class EmployeeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
        };
    }

    async componentDidMount() {
        const { id } = this.props.params; // ✅ 获取 URL 传递的 `id` 参数
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
            this.setState({ employee: result.data.employee, loading: false });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        const { employee, loading } = this.state;

        if (loading) return <p className="text-center mt-3">Loading...</p>;
        if (!employee) return <p className="text-center text-danger mt-3">Employee not found</p>;

        return (
            <div className="container my-4">
                <h3 className="mb-3 text-primary text-center">Employee Details</h3>
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
                                }`}>
                            {employee.currentStatus ? "Working" : "Retired"}
                        </span>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <Link to="/employee/list" className="btn btn-primary">Back</Link>
                        <Link to={`/employee/detail/${employee.id}/edit`} className="btn btn-warning">Edit</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EmployeeDetail);