import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SlotCreate() {
    const [search, set_search] = useState('');
    const [filterslots, set_filterslots] = useState([]);
    const [slots, set_slots] = useState([]);
    const [name, set_name] = useState('');
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const [status, set_status] = useState('');
    const [name_error, set_name_error] = useState([]);
    const [start_time_error, set_start_time_error] = useState([]);
    const [end_time_error, set_end_time_error] = useState([]);
    const [status_error, set_status_error] = useState([]);


    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/slots';
    const heads = ['Name', 'Start Date', 'End Date' ,'Status', 'Action'];

    useEffect(() => {
        getSlots();
    }, []);

    useEffect(() => {
        const result = slots.filter(item => {
            // console.log(item.name);
            return item.name.toLowerCase().match(search.toLowerCase());
        })
        set_filterslots(result);
    }, [search]);

    async function submitForm(e) {
        e.preventDefault();
        set_name_error([]);
        set_start_time_error([]);
        set_end_time_error([]);
        set_status_error([]);

        var result = await axios.post(baseURL, {
            name: name,
            start_time: start_time,
            end_time: end_time,
            status: status,
        });

        if (result.data.responseCode === 200) {
            toast.success("Success!! Slot has been Created.", { position: "bottom-right" });
            set_name("");
            set_start_time("");
            set_end_time("");
            set_status("");
            getSlots();

        } else if (result.data.responseCode === 403) {
            set_name_error(result.data.error.name);
            set_start_time_error(result.data.error.start_time);
            set_end_time_error(result.data.error.end_time);
            set_status_error(result.data.error.status);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });

        }
    }

    async function getSlots() {
        var slots = await axios.get(baseURL);
        console.log(slots.data);
        if (slots.data.responseCode == 200) {
            set_slots(slots.data.data);
            set_filterslots(slots.data.data);
        } else {
            set_slots([]);
        }
    }

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
            name: 'Start Time',
            selector: row => row.start_time,
            sortable: true

        },
        {
            name: 'End Time',
            selector: row => row.end_time,
            // sortable:true

        },

        {
            name: 'Status',
            selector: row => row.status == 1 ? 'Active' : 'Inactive',
            // sortable:true

        },

        {
            name: 'Action',
            selector: row =>
                <Link to={'/slotEdit/' + row.id}>
                    <button className='btn btn-primary btn-sm'>Edit</button>,
                </Link>
            // sortable:true

        }
    ];



    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Slot Create</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active">Slot Create</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card info-card sales-card">
                                <div className="card-body">
                                    <h5 className="card-title">Slot Create</h5>
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="inputNanme4" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="inputNanme4" onChange={(e) => { set_name(e.target.value) }} />
                                            <ul>
                                                {name_error ? (
                                                    name_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}

                                            </ul>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputEmail4" className="form-label">Start Time</label>
                                            <input type="time" className="form-control" id="inputEmail4" onChange={(e) => { set_start_time(e.target.value) }} />
                                            <ul>
                                                {start_time_error ? (
                                                    start_time_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}
                                            </ul>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="inputEmail4" className="form-label">End Time</label>
                                            <input type="time" className="form-control" id="inputEmail4" onChange={(e) => { set_end_time(e.target.value) }} />
                                            <ul>
                                                {end_time_error ? (
                                                    end_time_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}
                                            </ul>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Status</label>
                                            <select className="form-control form-select" onChange={(e) => { set_status(e.target.value) }}>
                                                <option name="" >Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                            <ul>
                                                {status_error ? (
                                                    status_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}
                                            </ul>
                                        </div>


                                        <div className="text-center">
                                            <button className="btn btn-primary" onClick={submitForm}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <CustomDatatable columns={columns} data={filterslots} title="Slot Logs"
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

export default SlotCreate;