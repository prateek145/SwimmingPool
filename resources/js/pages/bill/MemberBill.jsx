import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const MemberBill = () => {
    const [username, set_username] = useState('');
    const [phone, set_phone] = useState('');
    const [email, set_email] = useState('');
    const [date, set_date] = useState('');
    const [unique_id, set_unique_id] = useState('');
    const [array, set_array] = useState([]);
    const [address, set_address] = useState('');
    const [total_amount, set_total_amount] = useState(0);

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/memberBill';
    const params = useParams();

    console.log(baseURL);
    async function getBills() {
        var result = await axios.get(baseURL + '/' + params.id);
        console.log(result);
        set_array(result.data.data.bills);
        set_username(result.data.data.name);
        set_phone(result.data.data.phone);
        set_email(result.data.data.email);
        set_unique_id(result.data.data.unique_id);
        set_date(result.data.data.date);
        set_address(result.data.data.address);
        set_date(result.data.data.date);
    }

    useEffect(() => {
        getBills();
    }, []);

    return (
        <>
            <div className="container mt-6 mb-7">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-xl-7">
                        <div className="card">
                            <div className="card-body p-5">
                                <h2>{username ?? ''},</h2>
                                <p className="fs-sm">
                                    payment receipt
                                </p>
                                <div className="border-top border-gray-200 pt-4 mt-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="text-muted mb-2">Payment No.</div>
                                            <strong>{unique_id ?? ''}</strong>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <div className="text-muted mb-2">Payment Date</div>
                                            <strong>{date ?? ''}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-top border-gray-200 mt-4 py-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="text-muted mb-2">Payment To</div>
                                            <strong>{username ?? ''}</strong>
                                            <p className="fs-sm">
                                                {address ?? ''}
                                                <br />
                                                {/* <a href="#!" className="text-purple">
                                                </a> */}
                                                {email ?? ''}
                                            </p>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <div className="text-muted mb-2">Payment From</div>
                                            <strong>Swimming Pool </strong>
                                        </div>
                                    </div>
                                </div>
                                <table className="table border-bottom border-gray-200 mt-3">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="fs-sm text-dark text-uppercase-bold-sm px-0"
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                className="fs-sm text-dark text-uppercase-bold-sm px-0"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="fs-sm text-dark text-uppercase-bold-sm text-end px-0"
                                            >
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   
                                        {array.map(function (item, key) {
                                            // set_total_amount().add(item.amount)
                                            return (
                                            <tr key={key}>
                                                <td className="px-0">{item.description}</td>
                                                <td className="px-0">{item.date}</td>
                                                <td className="px-0 text-end px-0">{item.amount}</td>
                                            </tr>

                                            )

                                            
                                       
                                        })}

                                    </tbody>
                                </table>
                                <div className="mt-5">
                                    <div className="d-flex justify-content-end mt-3">
                                        <h5 className="me-3">Total:</h5>
                                        <h5 className="text-success">₹{total_amount ?? ''} Rupee</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberBill