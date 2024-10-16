import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import { AuthProvider } from "./components/AuthProvider";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}