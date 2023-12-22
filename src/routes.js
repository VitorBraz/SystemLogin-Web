import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Erro from "./pages/Error";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard"  element={<Dashboard />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
