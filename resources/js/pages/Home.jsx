import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CustomDatatable from '../FrontendComponents/CustomDatatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa";
import axios from 'axios';

function Home() {

  const [search, set_search] = useState('');
  const [filtermembers, set_filtermembers] = useState([]);
  const [members, set_members] = useState([]);
  const [total_members, set_total_members] = useState('')
  const [total_packages, set_total_packages] = useState('')
  const [total_slots, set_total_slots] = useState('')
  const [start_date, set_start_date] = useState(null)
  const [end_date, set_end_date] = useState(null)
  const [users, set_users] = useState([])
  const [transactions, set_transactions] = useState([])

  var baseURL = import.meta.env.VITE_API_ENDPOINT + 'public/api/v1/home';

  useEffect(() => {
    getHome();
  }, []);

  useEffect(() => {
    const result = transactions.filter(item => {
        return item.name.toLowerCase().match(search.toLowerCase());
    })
    set_filtermembers(result);
}, [search]);

  async function getHome() {
    var result = await axios.get(baseURL);
    set_members(result.data.data.members);
    set_filtermembers(result.data.data.members);
    set_total_members(result.data.data.total_members);
    set_total_packages(result.data.data.total_packages);
    set_total_slots(result.data.data.total_slots);
    console.log(result);
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
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },
    {
      name: 'Package',
      selector: row => row.package_name,
      sortable: true

    },

    {
      name: 'Package Start Date',
      selector: row => row.package_start_date,
      // sortable:true

    },

    {
      name: 'Package End Date',
      selector: row => row.package_end_date,
      // sortable:true

    },

    {
      name: 'Payment',
      selector: row => row.package_status == 1 ? 'Paid':'Pending',
      // sortable:true

    },


    {
      name: 'Timings',
      selector: row => row.slot_start_time + '-' + row.slot_end_time,
      // sortable:true

    },

    {
      name: 'Invoice',
      selector: row => <div>
        <a href={"http://127.0.0.1:8000/MemberBill/" + row.member_id} target='_blank'>
          <button className='btn'><FaFileInvoice /></button>

        </a>
      </div>
      // sortable:true

    }
  ];

  return (
    <>
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">

            <div className="col-lg-12">
              <div className="row">

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title">Total Members <span></span></h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-person"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{total_members ?? 0}</h6>


                        </div>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">

                    <div className="card-body">
                      <h5 className="card-title">Total Packages <span></span></h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-person"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{total_packages ?? 0}</h6>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-xxl-4 col-xl-12">

                  <div className="card info-card customers-card">

                    <div className="card-body">
                      <h5 className="card-title">Total Slots <span></span></h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{total_slots}</h6>

                        </div>
                      </div>

                    </div>
                  </div>

                </div>


              </div>
            </div>


          </div>
        </section>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <CustomDatatable columns={columns} data={filtermembers} title="Members Logs"
                searchdata={<input type='text' placeholder='Search Keyword'
                  className='w-25 form-control' value={search}
                  onChange={(e) => set_search(e.target.value)}
                />} />

            </div>

          </div>
        </section>
      </main >
    </>
  )
}

export default Home;