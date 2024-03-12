import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbEdit } from "react-icons/tb";
// toast.configure();

function PackageCreate() {
    const [packages, set_packages] = useState([]);
    const [name, set_name] = useState('');
    const [search, set_search] = useState('');
    const [filterpackages, set_filterpackages] = useState([]);
    const [price, set_price] = useState('');
    const [status, set_status] = useState('');
    const [days, set_days] = useState('');
    const [description, set_description] = useState('');
    const [name_error, set_name_error] = useState([]);
    const [price_error, set_price_error] = useState([]);
    const [status_error, set_status_error] = useState([]);
    const [days_error, set_days_error] = useState([]);
    const [description_error, set_description_error] = useState([]);


    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/packages';
    const heads = ['Name', 'Price', 'Status', 'Description', 'Action'];

    useEffect(() => {
        getPackages();
    }, []);

    useEffect(() => {
        const result = packages.filter(item => {
            // console.log(item.name);
            return item.name.toLowerCase().match(search.toLowerCase());
        })
        set_filterpackages(result);
    }, [search]);

    async function submitForm(e) {
        e.preventDefault();
        set_name_error([]);
        set_price_error([]);
        set_status_error([]);
        set_description_error([]);

        var result = await axios.post(baseURL, {
            name: name,
            price: price,
            status: status,
            days: days,
            description: description
        });

        if (result.data.responseCode == 200) {
            toast.success("Success!! Package has been Created.", { position: "bottom-right" });
            set_name("");
            set_price("");
            set_status("");
            set_description("");
            getPackages();

        } else if (result.data.responseCode == 403) {
            set_name_error(result.data.error.name);
            set_price_error(result.data.error.price);
            set_status_error(result.data.error.status);
            set_description_error(result.data.error.description);
            set_days_error(result.data.error.days);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });

        }
    }

    async function getPackages() {
        var packages = await axios.get(baseURL);
        console.log(packages.data);
        if (packages.data.responseCode == 200) {
            set_packages(packages.data.data);
            set_filterpackages(packages.data.data);
        } else {
            set_packages([]);
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
            name: 'Price',
            selector: row => row.price,
            sortable: true

        },

        {
            name: 'Status',
            selector: row => row.status == 1 ? 'Active' : 'Inactive',
            // sortable:true

        },

        {
            name: 'Description',
            selector: row => row.description,
            // sortable:true

        },

        {
            name: 'Action',
            selector: row =>
                <Link to={'/packageEdit/' + row.id}>
                    <button className='btn'><TbEdit/></button>,
                </Link>
            // sortable:true

        }
    ];



    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Package Create</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active">Package Create</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card info-card sales-card">
                                <div className="card-body">
                                    <h5 className="card-title">Package Create</h5>
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
                                        <div className="col-4">
                                            <label htmlFor="inputEmail4" className="form-label">Price</label>
                                            <input type="number" className="form-control" id="inputEmail4" onChange={(e) => { set_price(e.target.value) }} />
                                            <ul>
                                                {price_error ? (
                                                    price_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}
                                            </ul>
                                        </div>

                                        <div className="col-4">
                                            <label htmlFor="inputEmail4" className="form-label">Days</label>
                                            <input type="number" className="form-control" id="inputEmail4" onChange={(e) => { set_days(e.target.value) }} />
                                            <ul>
                                                {days_error ? (
                                                    days_error.map((item, key) => {
                                                        // console.log(item);
                                                        return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                    })
                                                ) : ""}
                                            </ul>
                                        </div>

                                        <div className="col-4">
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

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Descripton</label>
                                            <textarea name="description" className='form-control' id="" cols="30" rows="10" onChange={(e) => { set_description(e.target.value) }}>

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

                        <div className="col-lg-12">
                            <CustomDatatable columns={columns} data={filterpackages} title="Packages Logs"
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

export default PackageCreate;