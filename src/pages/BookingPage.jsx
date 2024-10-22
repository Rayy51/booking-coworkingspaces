import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import NavbarComponent from "../components/NavbarComponent";
import RoomCard from "../components/RoomCard";

export default function BookingPage() {
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
    const [modalShow, setModalShow] = useState(false);

    const API_BASE_URL = "https://e125178b-9181-41fc-9d37-4494af49bb12-00-1252t1ne5efu2.sisko.replit.dev";
    const { currentUser } = useContext(AuthContext)

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        const uid = await currentUser.uid;
        const bookingData = { title, description, date, time, phone_number, email, user_id: uid };
        try {
            await axios.post(`${API_BASE_URL}/bookings`, bookingData);
            handleCloseModal();
        } catch (error) {
            console.error("Error creating booking:", error);
            alert(error.response?.data?.error || "An error occurred");
        }
    };

    const handleCloseModal = () => {
        setModalShow(false);
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


    return (
        <>
            <NavbarComponent />

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

                <Modal show={modalShow} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title> Create Booking </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleCreateBooking}>
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
                                Create Booking
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}

