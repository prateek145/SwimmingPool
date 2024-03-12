import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa";

function PlCreate() {
    const [search, set_search] = useState('');
    const [filtertransactions, set_filtertransactions] = useState([]);
    const [amount, set_amount] = useState('')
    const [date, set_date] = useState('')
    const [user_id, set_user_id] = useState('')
    const [start_date, set_start_date] = useState(null)
    const [end_date, set_end_date] = useState(null)
    const [users, set_users] = useState([])
    const [transactions, set_transactions] = useState([])
    const [transaction_type, set_transaction_type] = useState('')
    const [transaction_type_error, set_transaction_type_error] = useState('')
    const [amount_error, set_amount_error] = useState([])
    const [date_error, set_date_error] = useState([])
    const [user_error, set_user_error] = useState([])
    const [description, set_description] = useState([])
    const [export_user_id, set_export_user_id] = useState(null)

    var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/placcount';

    async function submitForm(e) {
        e.preventDefault();
        set_amount_error([]);
        set_date_error([]);
        set_transaction_type_error([]);
        console.log(transaction_type, user_id, amount, date, description);
        var result = await axios.post(baseURL, {
            transaction_type: transaction_type,
            user_id: user_id,
            amount: amount,
            date: date,
            description: description
        });

        console.log(result);
        if (result.data.responseCode == 200) {
            // console.log('prateek');
            toast.success("Success!! Transaction has been Created.", { position: "bottom-right" });
            set_amount('');
            set_date('');
            getTransactions();

        } else if (result.data.responseCode == 403) {
            // console.log(result.data.error);
            set_amount_error(result.data.error.amount);
            set_date_error(result.data.error.date);
            set_transaction_type_error(result.data.error.transaction_type);
        }
        else {
            toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });
        }

    }

    async function Transaction_Delete(id) {
        // confirm("Want to delete?");
        if (confirm("Want to delete?") == true) {
            var transactions = await axios.delete(baseURL + '/' + id);
            // console.log(transactions);
            if (transactions.data.responseCode == 200) {
                toast.success("Success!! Transaction has been Deleted.", { position: "bottom-right" });
                getTransactions();
            } else {
                transactions = [];
            }

        }
    }

    async function getTransactions() {
        var transactions = await axios.get(baseURL);
        // console.log(transactions);
        if (transactions.data.responseCode == 200) {
            set_transactions(transactions.data.data.pl_accounts);
            set_filtertransactions(transactions.data.data.pl_accounts);
            set_users(transactions.data.data.users);
        } else {
            set_transactions([]);
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        const result = transactions.filter(item => {
            return item.transaction_type.toLowerCase().match(search.toLowerCase());
        })
        set_filtertransactions(result);
    }, [search]);

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1,
            width: "4rem",
        },

        {
            name: 'Transaction Type',
            selector: row => row.transaction_type,
            sortable: true
        },

        {
            name: 'User Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'User Phone',
            selector: row => row.phone,
            sortable: true

        },

        {
            name: 'User Email',
            selector: row => row.email,
            // sortable:true

        },

        {
            name: 'Amount',
            selector: row => row.amount,
            // sortable:true

        },

        {
            name: 'Date',
            selector: row => row.date,
            // sortable:true

        },

        {
            name: 'Invoice',
            selector: row => <div>
                <a href={"http://127.0.0.1:8000/BillCreate/" + row.id} target='_blank'>
                    <button className='btn'><FaFileInvoice /></button>

                </a>
            </div>
            // sortable:true

        },

        {
            name: 'Action',
            selector: row =>

                <div>
                    <Link to={'/plEdit/' + row.id}>
                        <button className='btn'><TbEdit /></button>,
                    </Link>
                    <button className='btn' onClick={() => { Transaction_Delete(row.id) }}><MdDelete /></button>
                </div>

        },
    ];

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Add Transactions</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
                            <li className="breadcrumb-item active">Add Transactions</li>

                            {/* <a href="url"> Download</a> */}
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Add Transactions</h5>
                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Transaction Type</label>
                                        <div className="col-sm-10">
                                            <select id="" className="form-control" onChange={(e) => { set_transaction_type(e.target.value) }}>
                                                <option value="">Select Transaction</option>
                                                <option value="earning">Earning</option>
                                                <option value="expense">Expense</option>
                                            </select>

                                            {transaction_type_error ? (
                                                transaction_type_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                    </div>

                                    {transaction_type == 'earning' ?
                                        <div className="row col-md-12 mb-3">
                                            <div className="col-md-2">
                                                <label htmlFor="inputText" className="form-label">User</label>
                                            </div>
                                            <div className="col-sm-10">
                                                <select id="" className="form-control" onChange={(e) => { set_user_id(e.target.value) }}>
                                                    <option value="">Select User</option>
                                                    {users.map((item, key) => {
                                                        return <option value={item.id} key={key}>Name: {item.name}   (package:{item.package_name}/amount:{item.price} /{item.package_start_date + ' : ' + item.package_end_date}) </option>
                                                    })}

                                                </select>


                                            </div>

                                        </div>

                                        : ''}

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Amount</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" placeholder="Amount" onChange={(e) => { set_amount(e.target.value) }} />
                                            {amount_error ? (
                                                amount_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Date</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control" placeholder="Price" onChange={(e) => { set_date(e.target.value) }} />
                                            {date_error ? (
                                                date_error.map((item, key) => {
                                                    // console.log(item);
                                                    return <li className="text-danger fw-bold" key={key}>{item}</li>
                                                })
                                            ) : ""}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea id="editor" className='form-control' cols="30" rows="10" onChange={(e) => { set_description(e.target.value) }}></textarea>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Submit Button</label>
                                        <div className="col-sm-10">
                                            <button className="btn btn-primary" onClick={submitForm}>Submit Form</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-12 mb-4">
                            <CustomDatatable columns={columns} data={filtertransactions} title="Transactions Logs"
                                searchdata={<input type='text' placeholder='Search Keyword'
                                    className='w-25 form-control' value={search}
                                    onChange={(e) => set_search(e.target.value)}
                                />} />
                        </div>

                    </div>
                </section>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Export Transactions</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">User</label>
                                        <div className="col-sm-10">
                                            <select id="" className="form-control" onChange={(e) => { set_export_user_id(e.target.value) }}>
                                                <option value="">Select User</option>
                                                {users.map((item, key) => {
                                                    return <option value={item.id} key={key}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">Start Date</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control" placeholder="Start Date" onChange={(e) => { set_start_date(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">End Date</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control" placeholder="End Date" onChange={(e) => { set_end_date(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Export Button</label>
                                        <div className="col-sm-10">

                                            <a href={"http://127.0.0.1/Swimmingpoolreact/public/api/v1/plAccount/export?export_user_id=" + export_user_id + "&start_date=" + start_date + "&end_date=" + end_date}>
                                                <button className="btn btn-primary">Export</button>
                                            </a>
                                            {/* <a href={ baseURL + '/export?user_id=' + export_user_id + '&start_date=' + start_date + '&end_date=' + end_date}>
                                                <button className="btn btn-primary">Export</button>
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

            </main >
            <ToastContainer />

        </>
    )
}

export default PlCreate;