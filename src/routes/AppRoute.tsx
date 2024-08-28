import { NotFound } from "@/components/Error";
import ScrollToTop from "@/components/ScrollToTop";
import { CenterDetailPage } from "@/features/centers/components/routes";
import SearchLocation from "@/features/map/routes/SearchLocation";
import { HomePage } from "@/features/users";
import BookingHistoryPage from "@/features/users/routes/BookingHistoryPage";
import WithAuthencation from "@/hocs/withAuthencation";
import { DefaultLayout } from "@/layouts/DefaultLayout";
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
            <Route path="/history" element={<BookingHistoryPage />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
