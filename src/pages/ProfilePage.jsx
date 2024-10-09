
import { useEffect } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function ProfilePage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    const handleLogout = () => {
        setAuthToken("");
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

            <Container className="mt-4">
                <h2>Your Profile</h2>
                {/* You can add more profile details here */}
                <p>Welcome to your profile page!</p>
                {/* Navigation to Bookings */}
                <Button as={Link} to="/bookings" variant="secondary" className="mt-3">
                    Go to Bookings
                </Button>
            </Container>
        </>
    );
}
