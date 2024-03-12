import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link to="" className="nav-link">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>

                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-menu-button-wide"></i><span>Setup</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/memberCreate">
                                    <i className="bi bi-circle"></i><span>Members</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/packageCreate">
                                    <i className="bi bi-circle"></i><span>Package</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/slotCreate">
                                    <i className="bi bi-circle"></i><span>Slot</span>
                                </Link>
                            </li>

                            {/* <li>
                                <a href="project.html">
                                    <i className="bi bi-circle"></i><span>Groups</span>
                                </a>
                            </li> */}
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text"></i><span>Management</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>

                               <Link to="/attendanceCreate">
                                    <i className="bi bi-circle"></i><span>Mark Attendance</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Reports</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                            <Link to="/plCreate">
                                    <i className="bi bi-circle"></i><span>P&L Filter Export</span>
                                </Link>
                            </li>
                            <li>
                            <Link to="/slotCreate">
                                    <i className="bi bi-circle"></i><span>Attendance Filter Export</span>
                                </Link>
                            </li>

                            {/* <li>
                            <Link to="/slotCreate">
                                    <i className="bi bi-circle"></i><span>Invoice Filter Export</span>
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                </ul>

            </aside>
        </>
    );
}

export default Sidebar;