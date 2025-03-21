import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import EmployeeList from "./EmployeeList.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import EmployeeUpdate from "./EmployeeUpdate.jsx";
import EmployeeDelete from "./EmployeeDelete.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";

const NotFound = () => <h1>Page Not Found</h1>;

export default function NavPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 解析当前 URL，确保 `search` 和 `type` 不互相覆盖
    const currentParams = new URLSearchParams(location.search);
    
    const handleSearch = (searchQuery) => {
        if (searchQuery) {
            currentParams.set("search", searchQuery);
        } else {
            currentParams.delete("search");
        }
        navigate(`/employee/list?${currentParams.toString()}`);
    };

    const handleFilter = (type) => {
        if (type) {
            currentParams.set("type", type);
        } else {
            currentParams.delete("type");
        }
        navigate(`/employee/list?${currentParams.toString()}`);
    };

    return (
        <>
            <header className="p-3 mb-2 bg-primary text-white">
                <h1 className="text-center">Employee Management System</h1>
            </header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <Link className="navbar-brand" to="/">EMS</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee/list">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee/create">Create</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Filter Employees
                            </Link>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => handleFilter("")}>All</button></li>
                                <li><button className="dropdown-item" onClick={() => handleFilter("FullTime")}>Full-Time</button></li>
                                <li><button className="dropdown-item" onClick={() => handleFilter("PartTime")}>Part-Time</button></li>
                                <li><button className="dropdown-item" onClick={() => handleFilter("Contract")}>Contract</button></li>
                                <li><button className="dropdown-item" onClick={() => handleFilter("Seasonal")}>Seasonal</button></li>
                            </ul>
                        </li>
                    </ul>

                    {/* Navigation Buttons (Back & Forward) */}
                    <button className="btn btn-outline-primary mx-2" onClick={() => navigate(-1)}>← Back</button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate(1)}>Forward →</button>

                    <div className="ms-auto">
                        <EmployeeSearch onSearch={handleSearch} />
                    </div>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/employee/list" element={<EmployeeList />} />
                    <Route path="/employee/create" element={<EmployeeCreate />} />
                    <Route path="/employee/detail/:id" element={<EmployeeDetail />} />
                    <Route path="/employee/detail/:id/edit" element={<EmployeeUpdate />} />
                    <Route path="/employee/delete/:id" element={<EmployeeDelete />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}