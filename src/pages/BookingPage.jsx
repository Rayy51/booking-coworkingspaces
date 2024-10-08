import { useEffect, useState, useCallback } from "react"; // Import useCallback
import { Button, Form, Container, ListGroup } from "react-bootstrap";
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
    const navigate = useNavigate();

    const fetchBookings = useCallback(async () => {
        if (!authToken) return; // Only fetch bookings if authToken is available
        try {
            const response = await axios.get("https://fb2dcf97-2ec6-4dc2-87f0-ed2503227345-00-1gsnpo73xkz2q.pike.replit.dev/bookings", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setBookings(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [authToken]); // Add authToken as a dependency

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        } else {
            fetchBookings(); // Fetch bookings when authToken changes or on mount
        }
    }, [authToken, fetchBookings, navigate]); // Add fetchBookings to the dependency array

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://fb2dcf97-2ec6-4dc2-87f0-ed2503227345-00-1gsnpo73xkz2q.pike.replit.dev/bookings", {
                title,
                description,
                date,
                time,
                phone_number,
                email,
                user_id: "user_id_placeholder", // Replace with actual user ID if needed
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            fetchBookings(); // Refresh booking list
            // Clear the form after submission
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setPhoneNumber("");
            setEmail("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`https://fb2dcf97-2ec6-4dc2-87f0-ed2503227345-00-1gsnpo73xkz2q.pike.replit.dev/bookings/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            fetchBookings(); // Refresh booking list
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h2>Create Booking</h2>
            <Form onSubmit={handleCreateBooking}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Button type="submit">Create Booking</Button>
            </Form>

            <h2 className="mt-5">Your Bookings</h2>
            <ListGroup>
                {bookings.map((booking) => (
                    <ListGroup.Item key={booking.id}>
                        <h5>{booking.title}</h5>
                        <p>{booking.description}</p>
                        <p>Date: {booking.date} Time: {booking.time}</p>
                        <p>Phone: {booking.phone_number} Email: {booking.email}</p>
                        <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}
