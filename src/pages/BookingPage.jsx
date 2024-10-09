// frontend/src/pages/BookingPage.jsx
import { useEffect, useState, useCallback } from "react";
import { Button, Form, Container, ListGroup, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {
    const [authToken] = useLocalStorage("authToken", "");
    const [bookings, setBookings] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchBookings = useCallback(async () => {
        if (!authToken) return;
        try {
            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            if (error.response?.status === 403) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        }
    }, [authToken, API_BASE_URL, navigate]);

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        } else {
            fetchBookings();
        }
    }, [authToken, fetchBookings, navigate]);

    const handleCreateOrUpdateBooking = async (e) => {
        e.preventDefault();
        const bookingData = {
            title,
            description,
            date,
            time,
            phone_number,
            email,
        };

        try {
            if (selectedBooking) {
                // Update booking
                await axios.put(`${API_BASE_URL}/bookings/${selectedBooking.id}`, bookingData, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
            } else {
                // Create booking
                await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
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
            await axios.delete(`${API_BASE_URL}/bookings/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
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
        setDate(booking.date.split('T')[0]); // Format date for input
        setTime(booking.time.slice(0, 5)); // Format time for input
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

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <h2>Manage Your Bookings</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Create New Booking
                    </Button>
                </Col>
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
                                    <p><strong>Date:</strong> {booking.date} <strong>Time:</strong> {booking.time}</p>
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

            {/* Modal for Create/Update Booking */}
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
    );
}
