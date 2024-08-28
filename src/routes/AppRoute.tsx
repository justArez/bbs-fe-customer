import { NotFound } from "@/components/Error";
import ScrollToTop from "@/components/ScrollToTop";
import { CenterDetailPage } from "@/features/centers/components/routes";
import Dashboard from "@/features/dashboard/components/Dashboard";
import SearchLocation from "@/features/map/routes/SearchLocation";
import { HomePage } from "@/features/users";
import WithAuthencation from "@/hocs/withAuthencation";
import DashboardLayout from "@/layouts/DashboardLayout";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import ManageLayout from "@/layouts/ManageLayout";
import { Route, Routes } from "react-router-dom";

export default function AppRoute() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search-location" element={<SearchLocation />} />
          <Route path="/center/:centerName/:centerId" element={<CenterDetailPage />}></Route>
          <Route element={<WithAuthencation />}>
            <Route path="manage" element={<ManageLayout />}></Route>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
