import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FinanceProvider } from "@/context/FinanceContext";
import { AppLayout } from "@/components/finance/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import TransactionsPage from "@/pages/TransactionsPage";
import InsightsPage from "@/pages/InsightsPage";
import NotFound from "@/pages/NotFound";

const App = () => (
  <FinanceProvider>
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  </FinanceProvider>
);

export default App;
