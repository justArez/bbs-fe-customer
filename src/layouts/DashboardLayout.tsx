import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Manage Dashboard</h1>
      <Outlet></Outlet>
    </div>
  )
}