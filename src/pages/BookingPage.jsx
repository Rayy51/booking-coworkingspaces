import { useEffect, useState, useCallback } from "react";
import { Button, Navbar, Nav, Form, Container, ListGroup, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "..//components/AuthProvider";
import { useContext } from "react";
import RoomCard from "../components/RoomCard";
import { getAuth, signOut } from "firebase/auth"

export default function BookingPage() {
    const [bookings, setBookings] = useState([]);
    const [rooms] = useState([
        { id: 1, title: "City View Room", description: "A spacious room for general meetings", imageUrl: "/bigroom.jpg" },
        { id: 2, title: "Engagement Room", description: "Perfect for team collaborations", imageUrl: "/teamroom.png" },
        { id: 3, title: "Leave me aRoom", description: "A quiet zone to focus", imageUrl: "/quiteroom.jpg" },
    ]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = "https://e125178b-9181-41fc-9d37-4494af49bb12-00-1252t1ne5efu2.sisko.replit.dev";
    const { currentUser } = useContext(AuthContext)

    const fetchBookings = useCallback(async () => {
        if (!currentUser) return;
        try {
            const uid = currentUser.uid;
            const response = await axios.get(`${API_BASE_URL}/bookings?user_id=${uid}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            if (error.response?.status === 403) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        } else {
            fetchBookings();
            console.log("fetchBookings")
        }
    }, [currentUser, fetchBookings, navigate]);

    const handleCreateOrUpdateBooking = async (e) => {
        e.preventDefault();
        const uid = await currentUser.uid;
        const bookingData = { title, description, date, time, phone_number, email, user_id: uid };
        try {
            if (selectedBooking) {
                await axios.put(`${API_BASE_URL}/bookings/${selectedBooking.id}`, bookingData)
            } else {
                await axios.post(`${API_BASE_URL}/bookings`, bookingData);
            }
            fetchBookings();
            handleCloseModal();
        } catch (error) {
            console.error("Error creating/updating booking:", error);
            alert(error.response?.data?.error || "An error occurred");
        }
    };

    const handleDeleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;
        try {
            const uid = currentUser.uid;
            await axios.delete(`${API_BASE_URL}/bookings/${id}?user_id=${uid}`);
            fetchBookings();
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert(error.response?.data?.error || "An error occurred");
        }
    };

    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setTitle(booking.title);
        setDescription(booking.description);
        setDate(booking.date.split('T')[0]);
        setTime(booking.time.slice(0, 5));
        setPhoneNumber(booking.phone_number);
        setEmail(booking.email);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
        setSelectedBooking(null);
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setPhoneNumber("");
        setEmail("");
    };

    const handleBookRoom = (room) => {
        setTitle(room.title);
        setDescription(room.description);
        setModalShow(true);
    };

    const auth = getAuth();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
            alert("Error signing out");
        }
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
                <Row className="mb-3">
                    <Col>
                        <h2>Available Rooms</h2>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Create New Booking
                        </Button>
                    </Col>
                </Row>

                <Row>
                    {rooms.map((room) => (
                        <Col key={room.id} md={4}>
                            <RoomCard room={room} onBook={handleBookRoom} />
                        </Col>
                    ))}
                </Row>

                {/* Booking List */}
                {bookings.length > 0 ? (
                    <ListGroup>
                        {bookings.map((booking) => (
                            <ListGroup.Item key={booking.id}>
                                <Row>
                                    <Col md={8}>
                                        <h5>{booking.title}</h5>
                                        <p>{booking.description}</p>
                                        <p><strong>Date:</strong> {booking.date.split('T')[0]} <strong>Time:</strong> {booking.time}</p>
                                        <p><strong>Phone:</strong> {booking.phone_number} <strong>Email:</strong> {booking.email}</p>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <Button variant="warning" size="sm" onClick={() => handleEditBooking(booking)} className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteBooking(booking.id)}>
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No bookings found. Create one!</p>
                )}

                <Modal show={modalShow} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBooking ? "Update Booking" : "Create Booking"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleCreateOrUpdateBooking}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter booking title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {selectedBooking ? "Update Booking" : "Create Booking"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}

