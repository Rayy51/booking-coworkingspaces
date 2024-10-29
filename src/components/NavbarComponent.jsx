import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { WiDaySunny, WiRain } from "react-icons/wi";

const NavbarComponent = ({ weather }) => {
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
        <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '0.75rem 1.5rem' }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="bi bi-buildings" style={{ fontSize: 30, color: "dodgerblue", marginRight: 8 }}></i>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginRight: 12 }}>CoWorkia</span>

                    {weather && (
                        <div className="d-flex align-items-center" style={{ color: "white", marginLeft: 8 }}>
                            {weather.weather[0].main === 'Rain' ? (
                                <WiRain size={20} className="me-1" />
                            ) : (
                                <WiDaySunny size={20} className="me-1" />
                            )}
                            <span style={{ fontSize: '0.85rem', whiteSpace: "normal", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {weather.main.temp}°C - {weather.weather[0].description}
                            </span>
                        </div>
                    )}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        {currentUser && (
                            <>
                                <Nav.Link as={Link} to="/user">
                                    <i className="bi bi-person-circle" style={{ fontSize: '1.2rem', color: 'white' }}></i>
                                </Nav.Link>
                                <Button as={Link} to="/bookings" variant="outline-light" className="me-2" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>
                                    Manage Bookings
                                </Button>
                                <Button as={Link} to="/mybookings" variant="outline-light" className="me-2" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>
                                    My Bookings
                                </Button>
                                <Button variant="danger" onClick={handleLogout} style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>
                                    Logout
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
