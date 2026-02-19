import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoginPage,
  DashboardPage,
  ProductsPage,
  CustomerPage,
  TransactionPage,
} from "@/features";

import AppLayout from "@/app/layout/AppLayout";
import AppNotFound from "@/404";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Area */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
