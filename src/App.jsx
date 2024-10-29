import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import { AuthProvider } from "./components/AuthProvider";
import UserProfile from "./pages/UserProfile";
import UserBookingsPage from "./pages/UserBookingPage";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/bookings" element={<PrivateRoute> <BookingPage /> </PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
          <Route path="/mybookings" element={<PrivateRoute> <UserBookingsPage /> </PrivateRoute>} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}