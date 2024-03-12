import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure();

function SlotEdit() {
    const [name, set_name] = useState('');
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const [status, set_status] = useState('');
    const [name_error, set_name_error] = useState([]);
    const [start_time_error, set_start_time_error] = useState([]);
    const [end_time_error, set_end_time_error] = useState([]);
    const [status_error, set_status_error] = useState([]);

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/slots';
    const params = useParams();

    useEffect(() => {
        showSlot();
    }, []);


    async function submitForm(e) {
        e.preventDefault();
        set_name_error([]);
        set_start_time_error([]);
        set_end_time_error([]);
        set_status_error([]);

        var result = await axios.put(baseURL + '/' + params.id, {
            name: name,
            start_time: start_time,
            end_time: end_time,
            status: status,
        });

        console.log(result);

        if (result.data.responseCode == 200) {
            toast.success("Success!! Slot has been Updated.", { position: "bottom-right" });
            set_name("");
            set_start_time("");
            set_end_time("");
            set_status("");
            showSlot();

        } else if (result.data.responseCode == 403) {
            set_name_error(result.data.error.name);
            set_start_time_error(result.data.error.start_time);
            set_end_time_error(result.data.error.end_time);
            set_status_error(result.data.error.status);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });

        }
    }

    async function showSlot() {
        var package1 = await axios.get(baseURL + '/' + params.id);
        if (package1.data.responseCode == 200) {
            // set_package1(package1.data.data);
            set_name(package1.data.data.name);
            set_start_time(package1.data.data.start_time);
            set_end_time(package1.data.data.end_time);
            set_status(package1.data.data.status);
        } else {
            // set_package1('');
        }
    }


    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Package Edit</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active">Package Edit</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card info-card sales-card">
                                <div className="card-body">
                                    <h5 className="card-title">Package Edit</h5>
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="inputNanme4" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="inputNanme4" value={name ?? ""} onChange={(e) => { set_name(e.target.value) }} />
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
                                            <input type="time" className="form-control" id="inputEmail4" value={start_time ?? ""} onChange={(e) => { set_start_time(e.target.value) }} />
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
                                            <input type="time" className="form-control" id="inputEmail4"  value={end_time ?? ""} onChange={(e) => { set_end_time(e.target.value) }} />
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
                                            <select className="form-control form-select" value={status ?? ""} onChange={(e) => { set_status(e.target.value) }}>
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

                    </div>
                </section>
            </main>
            <ToastContainer />
        </>
    )
}

export default SlotEdit;