import React from "react";
import { useEffect, useState } from 'react'
import { Link, useHref } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbEdit } from "react-icons/tb";
import { MdOutlineQrCodeScanner } from "react-icons/md";

function MemberCreate() {
    const [search, set_search] = useState('');
    const [filtermembers, set_filtermembers] = useState([]);
    const [members, set_members] = useState([]);
    const [slots, set_slots] = useState([]);
    const [packages, set_packages] = useState([]);
    const [name, set_name] = useState('');
    const [email, set_email] = useState('');
    const [phone, set_phone] = useState('');
    const [image, set_image] = useState('');
    const [package_id, set_package_id] = useState('');
    const [status, set_status] = useState('');
    const [slot_id, set_slot_id] = useState('');
    const [address, set_address] = useState('');
    const [name_error, set_name_error] = useState([]);
    const [email_error, set_email_error] = useState([]);
    const [package_id_error, set_package_id_error] = useState([]);
    const [slot_id_error, set_slot_id_error] = useState([]);
    const [phone_error, set_phone_error] = useState([]);
    const [status_error, set_status_error] = useState([]);
    const [address_error, set_address_error] = useState([]);


    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/members';
    const heads = ['Name', 'Price', 'Status', 'Description', 'Action'];

    useEffect(() => {
        getMembers();
    }, []);


    useEffect(() => {
        const result = members.filter(item => {
            // console.log(item.name);
            return item.name.toLowerCase().match(search.toLowerCase());
        })
        set_filtermembers(result);
    }, [search]);

    async function submitForm(e) {
        e.preventDefault();
        set_name_error([]);
        set_phone_error([]);
        set_email_error([]);
        set_status_error([]);
        set_package_id_error([]);
        set_slot_id_error([]);
        set_address_error([]);

        var result = await axios.post(baseURL, {
            name: name,
            phone: phone,
            email: email,
            image, image,
            status: status,
            package_id: package_id,
            slot_id: slot_id,
            address: address
        });

        // console.log(result);

        if (result.data.responseCode == 200) {
            toast.success("Success!! Package has been Created.", { position: "bottom-right" });
            set_name("");
            set_phone("");
            set_email("");
            set_status("");
            set_address("");
            set_package_id("");
            set_slot_id("");
            getMembers();

        } else if (result.data.responseCode == 403) {
            set_name_error(result.data.error.name);
            set_phone_error(result.data.error.phone);
            set_email_error(result.data.error.email);
            set_status_error(result.data.error.status);
            set_address_error(result.data.error.address);
            set_package_id_error(result.data.error.package_id);
            set_slot_id_error(result.data.error.slot_id);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });

        }
    }

    async function getMembers() {
        var result = await axios.get(baseURL);
        // console.log(result.data);
        if (result.data.responseCode == 200) {
            set_members(result.data.data.members);
            set_packages(result.data.data.packages);
            set_slots(result.data.data.slots);
            set_filtermembers(result.data.data.members);
        } else {
            set_packages([]);
        }
    }

    function onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createImage(files[0]);
    }

    function createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        // var vm = this;

        reader.onload = (e) => {
            set_image(e.target.result);
            console.log(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    function removeImage(e) {
        this.image = '';
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
            name: 'phone',
            selector: row => row.phone,
            sortable: true

        },

        {
            name: 'email',
            selector: row => row.email,
            sortable: true

        },

        {
            name: 'Status',
            selector: row => row.status == 1 ? 'Active' : 'Inactive',
            // sortable:true

        },

        {
            name: 'Action',
            selector: row =>
                <div>
                    <Link to={'/memberEdit/' + row.id}>
                        <button className='btn'><TbEdit /></button>
                    </Link>

                    <a href={"http://127.0.0.1:8000/qrcode/" + row.id} target="_blank">
                        <button className='btn'><MdOutlineQrCodeScanner /></button>
                    </a>

                    <a href={"http://127.0.0.1:8000/generateId/" + row.id} target="_blank">
                        <button className='btn'><MdOutlineQrCodeScanner /></button>
                    </a>
                </div>




            // sortable:true

        },
        // {
        //     name: 'Action Edit',
        //     selector: row =>
        //     <a href={('generateId/' + row.id)}>
        //         <button className="btn btn-primary btn-sm">Generate ID</button>
        //     </a>
        //     // sortable:true

        // }
    ];

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Members Create</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active">Members Create</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="card info-card sales-card">
                                <div className="card-body">
                                    <h5 className="card-title">Add Members Create</h5>
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="inputNanme4" className="form-label">Name</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => { set_name(e.target.value) }} id="inputNanme4" />
                                            {name_error ? (
                                                name_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}

                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => { set_email(e.target.value) }} id="inputEmail4" />
                                            {email_error ? (
                                                email_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input type="text" className="form-control" value={phone} id="phone" onChange={(e) => { set_phone(e.target.value) }} />
                                            {phone_error ? (
                                                phone_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Status</label>
                                            <select className="form-control form-select" value={status} onChange={(e) => { set_status(e.target.value) }}>
                                                <option value="">Select</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                            {status_error ? (
                                                status_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Image</label>
                                            <input type="file" onChange={onFileChange} className="form-control" name="image" id="phone" />

                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Slot</label>
                                            <select name="slot_id" className="form-control" value={slot_id} onChange={(e) => { set_slot_id(e.target.value) }}>
                                                <option value="">Select</option>
                                                {slots.map((item, key) => {
                                                    return <option value={item.id} key={key}>{item.name}</option>
                                                })}

                                            </select>
                                            {slot_id_error ? (
                                                slot_id_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Package</label>
                                            <select name="package_id" className="form-control" value={package_id} onChange={(e) => { set_package_id(e.target.value) }}>
                                                <option value="">Select</option>
                                                {packages.map((item, key) => {
                                                    return <option value={item.id} key={key}>{item.name}</option>
                                                })}

                                            </select>
                                            {package_id_error ? (
                                                package_id_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="phone" className="form-label">Address</label>
                                            <textarea name="address" className="form-control" value={address} onChange={(e) => { set_address(e.target.value) }} id="" cols="30" rows="10"></textarea>
                                            {address_error ? (
                                                address_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" onClick={submitForm} className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <CustomDatatable columns={columns} data={filtermembers} title="Members Logs"
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

export default MemberCreate;