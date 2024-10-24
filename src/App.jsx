import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import { AuthProvider } from "./components/AuthProvider";
import UserProfile from "./pages/UserProfile";
import UserBookingsPage from "./pages/UserBookingPage";
import FooterComponent from "./components/FooterComponent";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/mybookings" element={<UserBookingsPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}