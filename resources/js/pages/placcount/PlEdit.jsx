import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import CustomDatatable from '../../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlEdit() {

  const [amount, set_amount] = useState('')
  const [date, set_date] = useState('')
  const [user_id, set_user_id] = useState('')
  const [start_date, set_start_date] = useState('')
  const [end_date, set_end_date] = useState('')
  const [users, set_users] = useState([])
  const [transactions, set_transactions] = useState([])
  const [amount_error, set_amount_error] = useState([])
  const [date_error, set_date_error] = useState([])
  const [user_error, set_user_error] = useState([])
  const [export_user_id, set_export_user_id] = useState('')

  var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/placcount';
  const params = useParams();

  async function submitForm(e) {
    e.preventDefault();
    set_amount_error([]);
    set_date_error([]);
    set_user_error([]);

    var result = await axios.put(baseURL + '/' + params.id, {
      user_id: user_id,
      amount: amount,
      date: date
    });

    // console.log(result);
    if (result.data.responseCode == 200) {
      // console.log('prateek');
      toast.success("Success!! Transaction has been Updated.", { position: "bottom-right" });
      set_amount('');
      set_date('');
      showTransaction();

    } else if (result.data.responseCode == 403) {
      set_amount_error(result.data.error.amount);
      set_date_error(result.data.error.date);
      set_user_error(result.data.error.user_id);
    }
    else {
      toast.error("Error!! Something Went Wrong.", { position: "bottom-right" });
    }
  }

  useEffect(() => {
    showTransaction();
  }, []);

  async function showTransaction() {
    var transactions = await axios.get(baseURL + '/' + params.id);
    console.log(transactions);
    if (transactions.data.responseCode == 200) {
      set_transactions(transactions.data.data.pl_accounts);
      set_user_id(transactions.data.data.pl_account.user_id);
      set_amount(transactions.data.data.pl_account.amount);
      set_date(transactions.data.data.pl_account.date);
      set_users(transactions.data.data.users);
      // console.log(users, user_id, amount, date);
    } else {
      set_transactions([]);
    }

  }

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Edit Transactions</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to=''>Dashboard</Link></li>
              <li className="breadcrumb-item active">Edit Transactions</li>

              {/* <a href="url"> Download</a> */}
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Edit Transactions</h5>

                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">User</label>
                    <div className="col-sm-10">
                      <select id="" className="form-control" value={user_id} onChange={(e) => { set_user_id(e.target.value) }}>
                        <option value="">Select User</option>
                        {users.map((item, key) => {
                          return <option value={item.id} key={key}>{item.name}</option>
                        })}

                      </select>

                      {user_error ? (
                        user_error.map((item, key) => {
                          // console.log(item);
                          return <li className="text-danger fw-bold" key={key}>{item}</li>
                        })
                      ) : ""}


                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" placeholder="Amount" value={amount} onChange={(e) => { set_amount(e.target.value) }} />
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
                      <input type="date" className="form-control" placeholder="Price" value={date} onChange={(e) => { set_date(e.target.value) }} />
                      {date_error ? (
                        date_error.map((item, key) => {
                          // console.log(item);
                          return <li className="text-danger fw-bold" key={key}>{item}</li>
                        })
                      ) : ""}
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

          </div>
        </section>

      </main >
      <ToastContainer />

    </>
  )
}

export default PlEdit