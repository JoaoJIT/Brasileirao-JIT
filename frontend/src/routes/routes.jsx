import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import NewTeam from "../pages/NewTeam";

export default function AppRoutes() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" exact element={<Home />} /> 
                <Route path="/teams" element={<Teams />} /> 
                <Route path="/team/new" element={<NewTeam />} /> 
                <Route path="/team/edit/:teamId" element={<NewTeam />} /> 
            </Routes>
        </BrowserRouter>
    );
}