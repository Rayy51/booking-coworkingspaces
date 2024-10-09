
import { Card, Button } from 'react-bootstrap';
import './RoomCard.css'; // Import the CSS file for styles

const RoomCard = ({ room, onBook }) => {
    return (
        <Card className="mb-4">
            <Card.Img className="room-image" variant="top" src={room.imageUrl} alt={room.title} />
            <Card.Body>
                <Card.Title>{room.title}</Card.Title>
                <Card.Text>{room.description}</Card.Text>
                <Button variant="primary" onClick={() => onBook(room)}>
                    Book Now
                </Button>
            </Card.Body>
        </Card>
    );
};

export default RoomCard;
