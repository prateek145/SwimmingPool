import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BillCreate() {

    const [username, set_username] = useState('');
    const [phone, set_phone] = useState('');
    const [email, set_email] = useState('');
    const [date, set_date] = useState('');
    const [bill_id, set_bill_id] = useState('');
    const [amount, set_amount] = useState('');
    const [description, set_description] = useState('');

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/placcount';
    const params = useParams();

    useEffect(() => {
        showTransaction();
    }, []);

    async function showTransaction() {
        var transactions = await axios.get(baseURL + '/' + params.id);
        // console.log(transactions);
        if (transactions.data.responseCode == 200) {
            set_username(transactions.data.data.pl_account.name);
            set_phone(transactions.data.data.pl_account.phone);
            set_email(transactions.data.data.pl_account.email);
            set_amount(transactions.data.data.pl_account.amount);
            set_date(transactions.data.data.pl_account.date);
            set_description(transactions.data.data.pl_account.description);
            set_bill_id(transactions.data.data.pl_account.id);
            // console.log(bill_id);
        } else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });
        }

    }

    return (
        <>
            <div className="container mt-6 mb-7">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-xl-7">
                        <div className="card">
                            <div className="card-body p-5">
                                <h2>{username ?? 'Expense'},</h2>
                                <p className="fs-sm">
                                    This is the receipt for a payment of <strong>₹{amount}</strong> (Rupee)
                                </p>
                                <div className="border-top border-gray-200 pt-4 mt-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="text-muted mb-2">Payment No.</div>
                                            <strong>#POOL{bill_id}</strong>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <div className="text-muted mb-2">Payment Date</div>
                                            <strong>{date}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-top border-gray-200 mt-4 py-4">
                                    <div className="row">
                                        {username != null ?
                                            <div className="col-md-6">
                                                <div className="text-muted mb-2">Client</div>
                                                <strong>Name : {username}</strong>
                                                <p className="fs-sm">
                                                    Phone : {phone}
                                                    <br />
                                                    <a href="#!" className="text-purple">
                                                        Email : {email}
                                                    </a>
                                                </p>
                                            </div>
                                            : <div className="col-md-6">
                                                <div className="text-muted mb-2">Expense</div>
                                            </div>
                                        }
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

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {description}

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-5">
                                    <div className="d-flex justify-content-end mt-3">
                                        <h5 className="me-3">Total:</h5>
                                        <h5 className="text-success">₹{amount} Rupee</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default BillCreate