import React from "react";

class EmployeeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearch() {
        if (typeof this.props.onSearch === "function") {
            this.props.onSearch(this.state.searchQuery.trim());
        }
    }

    render() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by First Name"
                    value={this.state.searchQuery}
                    onChange={this.handleInputChange}
                />
                <button className="btn btn-primary" onClick={this.handleSearch}>
                    Filter
                </button>
            </div>
        );
    }
}

export default EmployeeSearch;