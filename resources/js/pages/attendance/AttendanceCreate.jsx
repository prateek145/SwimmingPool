import React from "react";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AttendanceCreate() {
    const [search, set_search] = useState('');
    const [filtermembers, set_filtermembers] = useState([]);
    const [members, set_members] = useState([]);
    const [attendance, set_attendance] = useState([]);
    const [member_id_error, set_member_id_error] = useState('');
    const [attendance_val, set_attendance_val_error] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (id, status) => {
        setCheckedItems.push(id);
        console.log(checkedItems);
    };

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/attendance';

    async function submitForm(member_id, attendance) {
        // console.log(member_id, attendance);
        var result = await axios.post(baseURL, {
            member_id: member_id,
            attendance: attendance
        });

        if (result.data.responseCode == 200) {
            toast.success("Success!! Attendance has been Updated.", { position: "bottom-right" });
            getAttendance();

        } else if (result.data.responseCode == 403) {
            console.log(result.data.responseCode);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });
        }

    }

    async function submitComment(member_id, input) {
        console.log(member_id, input);
        // var result = await axios.post(baseURL, {
        //     member_id: member_id,
        //     attendance: attendance
        // });

        // if (result.data.responseCode == 200) {
        //     toast.success("Success!! Attendance has been Updated.", { position: "bottom-right" });
        //     getAttendance();

        // } else if (result.data.responseCode == 403) {
        //     console.log(result.data.responseCode);
        // }
        // else {
        //     toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });
        // }

    }

    async function getAttendance() {
        var attendance = await axios.get(baseURL);
        // console.log(attendance.data.data.attendance);
        if (attendance.data.responseCode == 200) {
            set_members(attendance.data.data.members);
            set_filtermembers(attendance.data.data.members);
            set_attendance(attendance.data.data.attendance);
        }
    }

    useEffect(() => {
        getAttendance();
    }, []);

    useEffect(() => {
        const result = members.filter(item => {
            return item.name.toLowerCase().match(search.toLowerCase());
        })
        set_filtermembers(result);
    }, [search]);

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1,
            width: "4rem",
        },

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true

        },

        {
            name: 'Email',
            selector: row => row.email,
            // sortable:true

        },

        {
            name: 'Absent',
            selector: row =>

                <div>

                    <input
                        type="checkbox"
                        name="absent"
                        onChange={() => handleCheckboxChange(row.id, 0)}
                    />

                </div>

        },


        {
            name: 'Present',
            selector: row =>

                <div>

                    <input
                        type="checkbox"
                        name="present"
                        onChange={() => handleCheckboxChange(row.id, 1)}
                    />

                </div>

        },


        {
            name: 'Comment',
            selector: row =>
                <input type="text" className="form-control" />

            // sortable:true

        }
    ];

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1> Attendance</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active"> Attendance</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <CustomDatatable columns={columns} data={filtermembers} title="Packages Logs"
                                searchdata={<input type='text' placeholder='Search Keyword'
                                    className='w-25 form-control' value={search}
                                    onChange={(e) => set_search(e.target.value)}
                                />} />
                        </div>

                    </div>
                </section>

            </main>
            <ToastContainer />

        </>
    )
}

export default AttendanceCreate;