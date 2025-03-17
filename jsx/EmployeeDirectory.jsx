class EmployeeSearch extends React.Component {
    render() {
        return (
            <div className="container my-3">
                <h2 className="mb-3">Employee Filter</h2>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Filter by First Name" />
                    <button className="btn btn-primary">Filter</button>
                </div>
            </div>
        );
    }
}

class EmployeeTable extends React.Component {
    render() {
        console.log("Rendering employeeTable with employees:", this.props.employees);
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
            </tr>
        );
    }
}

class EmployeeCreate extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.EmployeeCreate;
        const age = parseInt(form.age.value, 10);

        if (age < 20 || age > 70) {
            alert("Age must be between 20 and 70.");
            return;
        }
        const employee = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            age: parseInt(form.age.value, 10),
            dateOfJoining: form.dateOfJoining.value,
            title: form.title.value,
            department: form.department.value,
            employeeType: form.employeeType.value,
            currentStatus: form.currentStatus.value === "true",
        };
        this.props.insertEmployee(employee);
        form.reset();
    };

    render() {
        return (
            <div className="container my-4">
                <h3 className="mb-3">Create New Employee</h3>
                <form name="EmployeeCreate" onSubmit={this.handleSubmit} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstName" className="form-control" placeholder="First Name" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" className="form-control" placeholder="Last Name" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" className="form-control" placeholder="Age" min="20" max="70" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Date Of Joining</label>
                        <input type="date" name="dateOfJoining" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <select name="title" className="form-select" required>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Department</label>
                        <select name="department" className="form-select" required>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Type</label>
                        <select name="employeeType" className="form-select" required>
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Current Status</label>
                        <select name="currentStatus" className="form-select" required>
                            <option value="true">Working</option>
                            <option value="false">Retired</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Create Employee</button>
                    </div>
                </form>
            </div>
        );
    }
}

class EmployeeList extends React.Component {
    constructor() {
        super();
        this.state = { employees: [] };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query { employeeList { id firstName lastName age dateOfJoining title department employeeType currentStatus } }`;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        console.log("GraphQL Response:", result);
        this.setState({ employees: result.data?.employeeList || [] });
    }

    async insertEmployee(employee) {
        const query = `mutation addEmployee($employee: EmployeeInputs!) { addEmployee(employee: $employee) { id } }`;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { employee } }),
        });
        const result = await response.json();
        console.log("Employee added:", result);

        if (result.data && result.data.addEmployee) {
            this.loadData();  // 确保数据刷新
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="text-center text-primary">Employee Management System</h1>
                <EmployeeSearch />
                <EmployeeTable employees={this.state.employees || []} />
                <EmployeeCreate insertEmployee={this.insertEmployee.bind(this)} />
            </div>
        );
    }
}

class EmployeeDirectory extends React.Component {
    render() {
        return (
            <div className="container">
                <EmployeeList />
            </div>
        );
    }
}

ReactDOM.render(<EmployeeDirectory />, document.getElementById('root'));
