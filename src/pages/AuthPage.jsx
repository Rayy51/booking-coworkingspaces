import { useState, useEffect } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const loginImage = '/coworking.png';
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, { username, password });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token saved");

            } else {
                alert("Invalid login response");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Login failed");
        }
    };
    const handleClose = () => setModalShow(null);

    return (
        <Row className="vh-100">
            <Col sm={6} className="d-flex justify-content-center align-items-center">
                <Image src={loginImage} fluid className="rounded" />
            </Col>
            <Col sm={6} className="d-flex flex-column justify-content-center align-items-center bg-light p-5">
                <h1 className="text-center mb-5" style={{ fontSize: "5rem", fontWeight: "bold", color: "#343a40" }}>
                    Work Better, Together
                </h1>
                <h2 className="text-center mb-5" style={{ fontSize: "2.5rem", color: "#6c757d" }}>
                    Book your Co-Working Space now!
                </h2>

                <Col sm={8} className="d-grid gap-3">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <p className="text-center my-2" style={{ color: "#6c757d", fontWeight: "500" }}>or</p>
                    <Button className="rounded-pill btn-primary" onClick={handleShowSignUp}>Create an account</Button>

                    <p className="text-center" style={{ fontSize: "0.85rem", color: "#868e96" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use.
                    </p>

                    <p className="mt-4 font-weight-bold text-center" style={{ color: "#343a40" }}>
                        Already have an account?
                    </p>
                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign In</Button>
                </Col>
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp" ? "Create your account" : "Log in to your account"}
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Enter Password"
                                />
                            </Form.Group>
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>

                            <Button className="rounded-pill" type="submit">{modalShow === "SignUp" ? "Sign up" : "Log in"}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}
