import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, HotelENtry, Login, SignUp, Index, UserForm, AccountDetail, Table } from ".";


export default function AppRouter() {
    return (
        <Router >
            <div>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/form" element={<Dashboard />} />
                    <Route path="/UserForm" element={<UserForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/accdet" element={<AccountDetail />} />
                    <Route path="/entry" element={<HotelENtry />} />
                    <Route path="/table" element={<Table />} />
                    {/* <Route path="/header" element={<Header />} /> */}
                </Routes>
            </div>
        </Router>
    )
}