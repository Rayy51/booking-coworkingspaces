import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Card, Image, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import NavbarComponent from "../components/NavbarComponent";
import "./UserBookingPage.css"
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function UserBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const API_BASE_URL = "https://e125178b-9181-41fc-9d37-4494af49bb12-00-1252t1ne5efu2.sisko.replit.dev";

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
        }
    }, [currentUser, fetchBookings, navigate]);

    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
    };

    const handleUpdateBooking = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return;

        try {
            const updatedBooking = {
                ...selectedBooking,
                title: e.target.title.value,
                description: e.target.description.value,
                date: e.target.date.value,
                time: e.target.time.value,
                phone_number: e.target.phone_number.value,
                email: e.target.email.value,
            };

            await axios.put(`${API_BASE_URL}/bookings/${selectedBooking.id}?user_id=${currentUser.uid}`, updatedBooking);
            fetchBookings(); // Refresh the list of bookings
            handleCloseModal();
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Failed to update the booking. Please try again.");
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

    return (
        <>
            <NavbarComponent />
            <Container className="mt-4">
                <h2 className="mb-4">My Bookings</h2>
                <Row>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <Col key={booking.id} md={6} lg={4} className="mb-4">
                                <Card className="booking-card h-100">
                                    <Card.Body>
                                        <Row>
                                            <Col xs={3} className="d-flex align-items-center">
                                                {/* Display avatar, e.g., room image */}
                                                <Image
                                                    src={booking.imageUrl || "/default-avatar.png"}
                                                    roundedCircle
                                                    className="booking-avatar"
                                                    alt="Room avatar"
                                                />
                                            </Col>
                                            <Col xs={9}>
                                                <Card.Title className="accent-text">{booking.title}</Card.Title>
                                                <Card.Text>{booking.description}</Card.Text>
                                                <Card.Text>
                                                    <strong>Date:</strong> <span className="accent-text">{booking.date.split('T')[0]}</span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Time:</strong> <span className="accent-text">{booking.time}</span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Phone:</strong> {booking.phone_number}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Email:</strong> {booking.email}
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <Button variant="warning" size="sm" onClick={() => handleEditBooking(booking)} className="d-flex align-items-center">
                                                <PencilSquare className="me-2" /> Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteBooking(booking.id)} className="d-flex align-items-center">
                                                <Trash className="me-2" /> Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No bookings found. Create one!</p>
                    )}
                </Row>
            </Container>

            {/* Edit Booking Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBooking && (
                        <Form onSubmit={handleUpdateBooking}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    defaultValue={selectedBooking.title}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    defaultValue={selectedBooking.description}
                                    rows={3}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    defaultValue={selectedBooking.date.split("T")[0]}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="time"
                                    defaultValue={selectedBooking.time}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone_number"
                                    defaultValue={selectedBooking.phone_number}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    defaultValue={selectedBooking.email}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Booking
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

