import { Card, Button } from 'react-bootstrap';
import './RoomCard.css';

const RoomCard = ({ room, onBook }) => {
    return (
        <Card className="room-card mb-4">
            <Card.Img className="room-image" variant="top" src={room.imageUrl} alt={room.title} />
            <Card.Body className="room-body">
                <Card.Title className="room-title">{room.title}</Card.Title>
                <Card.Text className="room-description">{room.description}</Card.Text>
                <Button className="room-button" variant="primary" onClick={() => onBook(room)}>
                    Book Now
                </Button>
            </Card.Body>
        </Card>
    );
};

export default RoomCard;
