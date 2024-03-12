import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure();

function PackageEdit() {
    const [package1, set_package1] = useState("");
    const [name, set_name] = useState('');
    const [price, set_price] = useState('');
    const [status, set_status] = useState('');
    const [description, set_description] = useState('');
    const [name_error, set_name_error] = useState([]);
    const [price_error, set_price_error] = useState([]);
    const [status_error, set_status_error] = useState([]);
    const [description_error, set_description_error] = useState([]);

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/packages';
    const params = useParams();

    useEffect(() => {
        showPackage();
    }, []);


    async function submitForm(e) {
        e.preventDefault();
        set_name_error([]);
        set_price_error([]);
        set_status_error([]);
        set_description_error([]);

        var result = await axios.put(baseURL + '/' + params.id, {
            name: name,
            price: price,
            status: status,
            description: description
        });

        console.log(result);

        if (result.data.responseCode == 200) {
            toast.success("Success!! Package has been Updated.", { position: "bottom-right" });
            set_name("");
            set_price("");
            set_status("");
            set_description("");
            showPackage();

        } else if (result.data.responseCode == 403) {
            set_name_error(result.data.error.name);
            set_price_error(result.data.error.price);
            set_status_error(result.data.error.status);
            set_description_error(result.data.error.description);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });

        }
    }

    async function showPackage() {
        var package1 = await axios.get(baseURL + '/' + params.id);
        console.log(package1.data.data);
        if (package1.data.responseCode == 200) {
            set_package1(package1.data.data);
            set_name(package1.data.data.name);
            set_price(package1.data.data.price);
            set_status(package1.data.data.status);
            set_description(package1.data.data.description);
        } else {
            set_package1('');
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
                                            <label htmlFor="inputEmail4" className="form-label">Price</label>
                                            <input type="number" className="form-control" id="inputEmail4" value={price ?? ""} onChange={(e) => { set_price(e.target.value) }} />
                                            <ul>
                                                {price_error ? (
                                                    price_error.map((item, key) => {
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

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Descripton</label>
                                            <textarea name="description" className='form-control' cols="30" value={description ?? ""} rows="10" onChange={(e) => { set_description(e.target.value) }}>
                                                
                                            </textarea>
                                            <ul>
                                                {description_error ? (
                                                    description_error.map((item, key) => {
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

export default PackageEdit;