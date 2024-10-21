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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <i
                            className="bi bi-buildings"
                            style={{ fontSize: 30, color: "dodgerblue", marginRight: 8 }}
                        ></i>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'Boldblack' }}>
                            CoWorkia
                        </span>
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
                    <h1>
                        Find your perfect office space today!</h1>
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
