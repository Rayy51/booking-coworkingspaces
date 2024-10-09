import { useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
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
                        <Button variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <h2>Your Profile</h2>
                {/* You can add more profile details here */}
                <Button as={Link} to="/bookings" variant="secondary" className="mt-3">
                    Manage Bookings
                </Button>
            </Container>
        </>
    );
}