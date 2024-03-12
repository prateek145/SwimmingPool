import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../pages/layouts/App';
import Home from '../pages/Home';
import Error from '../pages/Error';
import MemberCreate from '../pages/members/MemberCreate';
import MemberEdit from '../pages/members/MemberEdit';
import PackageCreate from '../pages/packages/PackageCreate';
import PackageEdit from '../pages/packages/PackageEdit';

import SlotCreate from '../pages/slot/CreateSlot';
import SlotEdit from '../pages/slot/EditSlot';

import AttendanceCreate from '../pages/attendance/AttendanceCreate';
import AttendanceExport from '../pages/attendance/AttendanceExport';

import PlCreate from '../pages/placcount/PlCreate';
import PlEdit from '../pages/placcount/PlEdit';
import BillCreate from '../pages/placcount/BillCreate';
import MemberBill from '../pages/bill/MemberBill';



function Example() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='memberCreate' element={<MemberCreate />} />
                    <Route path='memberEdit/:id?' element={<MemberEdit />} />

                    {/* for packages */}
                    <Route path='packageCreate' element={<PackageCreate />} />
                    <Route path='packageEdit/:id?' element={<PackageEdit />} />


                    {/* for packages */}
                    <Route path='slotCreate' element={<SlotCreate />} />
                    <Route path='slotEdit/:id?' element={<SlotEdit />} />

                    {/* for Attendance */}
                    <Route path='attendanceCreate' element={<AttendanceCreate />} />
                    <Route path='attendanceExport' element={<AttendanceExport />} />

                    {/* for Attendance */}
                    <Route path='plCreate' element={<PlCreate />} />
                    <Route path='plEdit/:id?' element={<PlEdit />} />


                </Route>
                
                <Route path='MemberBill/:id?' element={<MemberBill />} />
                <Route path='BillCreate/:id?' element={<BillCreate />} />
                <Route path='*' element={<Error />} />
            </Routes>

        </div>

    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <BrowserRouter>
                <Example />
            </BrowserRouter>
        </React.StrictMode>
    )
}
