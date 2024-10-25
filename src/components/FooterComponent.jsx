import { Col, Container, Row } from "react-bootstrap";
import './FooterComponent.css';

const FooterComponent = () => {
    return (
        <footer className="footer">
            <Container className="footer-container">
                <Row className="mt-1">
                    <Col className="text-center">
                        <p style={{ fontSize: "0.85rem" }}>
                            &copy; {new Date().getFullYear()} CoWorkia. All rights reserved by Bryan Saw.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterComponent;
