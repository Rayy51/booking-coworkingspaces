import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import NavbarComponent from "../components/NavbarComponent";
import RoomCard from "../components/RoomCard";
import { WiDaySunny, WiRain, WiThunderstorm, WiCloudy, WiSnow } from "react-icons/wi"

export default function BookingPage() {
    const [rooms] = useState([
        { id: 1, title: "City View Room", description: "A spacious room for general meetings", imageUrl: "/bigroom.jpg" },
        { id: 2, title: "Engagement Room", description: "Perfect for team collaborations", imageUrl: "/teamroom.png" },
        { id: 3, title: "Leave me aRoom", description: "A quiet zone to focus", imageUrl: "/quiteroom.jpg" },
        { id: 4, title: "Product Shooting Room", description: "A fully equipped studio for product photography", imageUrl: "/productshooting.jpg" }
    ]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [weather, setWeather] = useState(null);
    const lat = 2.996889;
    const lon = 101.673523;

    const API_BASE_URL = "https://92ce2606-e5fd-417e-8276-af885179de83-00-ucopt79ladmi.pike.replit.dev";
    const WEATHER_API_KEY = import.meta.env.VITE_API_WEATHER
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error)
            }
        };
        fetchWeather();
    }, [WEATHER_API_KEY]);

    const getWeatherIcon = (description) => {
        if (description.includes("rain")) {
            return <WiRain size={30} />;
        } else if (description.includes("thunderstorm")) {
            return <WiThunderstorm size={30} />;
        } else if (description.includes("cloud")) {
            return <WiCloudy size={30} />;
        } else if (description.includes("snow")) {
            return <WiSnow size={30} />;
        } else {
            return <WiDaySunny size={30} />;
        }
    };

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
            <NavbarComponent weather={weather} />

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
                    <Col md={8}>
                        <Row>
                            {rooms.map((room) => (
                                <Col key={room.id} md={6} className="mb-4">
                                    <RoomCard room={room} onBook={handleBookRoom} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col md={4}>
                        {weather && (
                            <Card style={{
                                background: "linear-gradient(135deg, #f0f8ff 0%, #e0f7fa 100%)",
                                border: "1px solid #ddd",
                                borderRadius: "15px",
                                padding: "15px",
                                textAlign: "center",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px"
                            }}>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '1.25rem' }}>Current Weather</Card.Title>
                                    {getWeatherIcon(weather.weather[0].description)}
                                    <Card.Text style={{ fontSize: "1rem", marginTop: "10px" }}>
                                        <strong>Temp:</strong> {weather.main.temp}°C <br />
                                        <strong>Weather:</strong> {weather.weather[0].description} <br />
                                        <strong>Humidity:</strong> {weather.main.humidity}% <br />
                                        <strong>Wind:</strong> {weather.wind.speed} m/s
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}

                        <Card style={{
                            background: "#f9f9f9",
                            border: "1px solid #ccc",
                            borderRadius: "15px",
                            padding: "20px",
                            textAlign: "left",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            marginBottom: "20px"
                        }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Business Information</Card.Title>
                                <Card.Text style={{ fontSize: "1rem", lineHeight: "2", marginTop: "10px" }}>

                                    <i className="bi bi-geo-alt" style={{ marginRight: "8px" }}></i>
                                    13A, Taman Equine, Seri Kembangan, 56100 Selangor. <br />
                                    <div style={{ marginBottom: "20px" }}>
                                        <i className="bi bi-envelope" style={{ marginRight: "8px" }}></i>
                                        contact@Coworkia.com <br />
                                    </div>
                                    <strong>Operating Hours:</strong><br />
                                    <strong>Monday:</strong> 8:00 AM - 5:00 PM <br />
                                    <strong>Tuesday:</strong> 8:00 AM - 5:00 PM <br />
                                    <strong>Wednesday:</strong> 8:00 AM - 5:00 PM <br />
                                    <strong>Thursday:</strong> 8:00 AM - 5:00 PM <br />
                                    <strong>Friday:</strong> 9:00 AM - 5:00 PM <br />
                                    <strong>Saturday:</strong> By Appointment Only <br />
                                    <strong>Sunday:</strong> By Appointment Only
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Modal show={modalShow} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Booking</Modal.Title>
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
