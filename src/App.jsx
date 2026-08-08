import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./i18n";
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import News from "./pages/News";
import RoutesPage from "./pages/RoutesPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/news" element={<News />} />
              <Route path="/routes" element={<RoutesPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  );
}