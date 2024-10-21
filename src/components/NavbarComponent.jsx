import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

const NavbarComponent = () => {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = "/login";
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Error signing out");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <i
                        className="bi bi-buildings"
                        style={{ fontSize: 30, color: "dodgerblue", marginRight: 8 }}
                    ></i>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                        CoWorkia
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {currentUser && (
                            <>
                                <Button variant="primary" onClick={handleLogout} className="me-2">
                                    Logout
                                </Button>
                                <Button as={Link} to="/bookings" variant="secondary">
                                    Manage Bookings
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
