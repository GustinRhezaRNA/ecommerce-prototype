import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoginPage,
  DashboardPage,
  ProductsPage,
  CustomerPage,
  TransactionPage,
  CustomerDetailPage,
  ProductDetailPage,
  TransactionDetailPage,
  CustomerActionPage,
  ProductActionPage,
  TransactionActionPage,
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
          <Route path="/customers/create" element={<CustomerActionPage />} />
          <Route path="/customers/:id/edit" element={<CustomerActionPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />


          <Route path="/products/create" element={<ProductActionPage />} />
          <Route path="/products/:id/edit" element={<ProductActionPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transactions/create" element={<TransactionActionPage />} />
          <Route path="/transactions/:id/edit" element={<TransactionActionPage />} />
          <Route path="/transactions/:id" element={<TransactionDetailPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<AppNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
