import { Col, Container, Row } from "react-bootstrap";
import './FooterComponent.css';

const FooterComponent = () => {
    return (
        <footer className="footer">
            <Container className="footer-container">
                <Row>
                    {/* About Section */}
                    <Col md={6}>
                        <h5 style={{ fontWeight: "bold" }}>About CoWorkia</h5>
                        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                            CoWorkia is a premium co-working space designed to help freelancers,
                            startups, and companies grow in a collaborative and creative environment.
                        </p>
                    </Col>

                    {/* Contact Information */}
                    <Col md={6}>
                        <h5 style={{ fontWeight: "bold" }}>Contact Us</h5>
                        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                            <strong>Address:</strong> 13A, Taman Equine, Seri Kembangan, 56100 Selangor, Malaysia.<br />
                            <strong>Email:</strong> contact@CoWorkia.com<br />
                            <strong>Phone:</strong> +60 12-335 3235
                        </p>
                    </Col>
                </Row>

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
