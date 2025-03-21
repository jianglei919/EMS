import React from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        return <Component {...props} location={location} navigate={navigate} />;
    };
}

class EmployeeList extends React.Component {
    constructor() {
        super();
        this.state = { employees: [], filteredEmployees: [] };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query { employeeList { id firstName lastName age dateOfJoining title department employeeType currentStatus } }`;
        const response = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });
        const result = await response.json();
        console.log(`GraphQL loadData Response: ${JSON.stringify(result, null, 2)}\n`);

        this.setState({ employees: result.data?.employeeList || [] }, () => {
            this.filterEmployees();
        });
    }

    filterEmployees() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const searchQuery = searchParams.get("search") || "";
        const typeFilter = searchParams.get("type") || "";

        let filteredEmployees = this.state.employees;

        // 先按 employeeType 过滤
        if (typeFilter) {
            filteredEmployees = filteredEmployees.filter((e) => e.employeeType === typeFilter);
        }

        // 再按 firstName 过滤
        if (searchQuery) {
            filteredEmployees = filteredEmployees.filter((e) =>
                e.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        this.setState({ filteredEmployees });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.filterEmployees();
        }
    }

    render() {
        // console.log("EmployeeList state:", this.state.filteredEmployees);
        return (
            <div className="container mt-4">
                <EmployeeTable employees={this.state.filteredEmployees} />
            </div>
        );
    }
}

export default withRouter(EmployeeList);