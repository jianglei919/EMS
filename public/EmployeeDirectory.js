class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container my-3"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "mb-3"
    }, "Employee Filter"), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Filter by First Name"
    }), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary"
    }, "Filter")));
  }
}
class EmployeeTable extends React.Component {
  render() {
    console.log("Rendering employeeTable with employees:", this.props.employees);
    const {
      employees = []
    } = this.props;
    const rows = employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
      key: employee.id,
      employee: employee
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-bordered table-striped"
    }, /*#__PURE__*/React.createElement("thead", {
      className: "table-dark"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date Of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, rows)));
  }
}
class EmployeeRow extends React.Component {
  render() {
    const {
      employee
    } = this.props;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, employee.id), /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.age), /*#__PURE__*/React.createElement("td", null, employee.dateOfJoining), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${employee.currentStatus ? "bg-success" : "bg-danger"}`
    }, employee.currentStatus ? "Working" : "Retired")));
  }
}
class EmployeeCreate extends React.Component {
  handleSubmit = e => {
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
      currentStatus: form.currentStatus.value === "true"
    };
    this.props.insertEmployee(employee);
    form.reset();
  };
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container my-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "mb-3"
    }, "Create New Employee"), /*#__PURE__*/React.createElement("form", {
      name: "EmployeeCreate",
      onSubmit: this.handleSubmit,
      className: "row g-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "firstName",
      className: "form-control",
      placeholder: "First Name",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "lastName",
      className: "form-control",
      placeholder: "Last Name",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "age",
      className: "form-control",
      placeholder: "Age",
      min: "20",
      max: "70",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Date Of Joining"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "dateOfJoining",
      className: "form-control",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Title"), /*#__PURE__*/React.createElement("select", {
      name: "title",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Department"), /*#__PURE__*/React.createElement("select", {
      name: "department",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      name: "employeeType",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal"))), /*#__PURE__*/React.createElement("div", {
      className: "col-md-6"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Current Status"), /*#__PURE__*/React.createElement("select", {
      name: "currentStatus",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Working"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "Retired"))), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-success"
    }, "Create Employee"))));
  }
}
class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const query = `query { employeeList { id firstName lastName age dateOfJoining title department employeeType currentStatus } }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    console.log("GraphQL Response:", result);
    this.setState({
      employees: result.data?.employeeList || []
    });
  }
  async insertEmployee(employee) {
    const query = `mutation addEmployee($employee: EmployeeInputs!) { addEmployee(employee: $employee) { id } }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          employee
        }
      })
    });
    const result = await response.json();
    console.log("Employee added:", result);
    if (result.data && result.data.addEmployee) {
      this.loadData(); // 确保数据刷新
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container mt-4"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-center text-primary"
    }, "Employee Management System"), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees || []
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      insertEmployee: this.insertEmployee.bind(this)
    }));
  }
}
class EmployeeDirectory extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement(EmployeeList, null));
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById('root'));