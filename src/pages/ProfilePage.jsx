import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import NavbarComponent from "../components/NavbarComponent";
import "./ProfilePage.css";
import { Button, Container } from "react-bootstrap";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        navigate("/login");
    }

    return (
        <>
            <NavbarComponent />

            <div className="profile-page-background">
                <Container className="mt-4 text-white text-center">
                    <h1>Find your perfect office space today!</h1>
                    <p>Whether you’re just starting your own business or an established enterprise, we’ve got the workspace for your exact business needs.</p>
                    <p>Here you can manage your bookings and explore your favorite co-working spots.</p>
                    <Button as={Link} to="/bookings" variant="light" className="mt-3">
                        Go to Bookings
                    </Button>
                </Container>
            </div>
        </>
    );
}
