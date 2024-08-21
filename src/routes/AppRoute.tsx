import ScrollToTop from "@/components/ScrollToTop";
import Login from "@/features/auth/components";
import Dashboard from "@/features/owner/components/Dashboard";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" index element={<Navigate to={'/login'} />}></Route>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}