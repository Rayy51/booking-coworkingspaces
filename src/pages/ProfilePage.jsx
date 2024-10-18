import { useContext } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import "./ProfilePage.css";

export default function ProfilePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut()
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <i
                            className="bi bi-buildings"
                            style={{ fontSize: 30, color: "dodgerblue" }}
                        ></i>{" "}
                        Co-Working Space
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Button variant="primary" onClick={handleLogout} className="me-2">
                                Logout
                            </Button>
                            <Button as={Link} to="/bookings" variant="secondary">
                                Manage Bookings
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="profile-page-background">
                <Container className="mt-4 text-white text-center">
                    <h2>Your Profile</h2>
                    <p>Welcome to your personalized space!</p>
                    <p>Here you can manage your bookings and explore your favorite co-working spots.</p>
                    <Button as={Link} to="/bookings" variant="light" className="mt-3">
                        Go to Bookings
                    </Button>
                </Container>
            </div>
        </>
    );
}
