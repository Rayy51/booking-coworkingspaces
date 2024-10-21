import { useState, useEffect, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../components/AuthProvider";
import { Button, Form, Container, Image, Alert, Row, Col, Card } from "react-bootstrap";
import './UserProfile.css';
import NavbarComponent from "../components/NavbarComponent";

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setImageUrl(docSnap.data().profilePictureUrl);
                }
            }
        };
        fetchProfilePicture();
    }, [currentUser]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image || !currentUser) return;

        setLoading(true);
        setError("");
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);

        try {
            await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(doc(db, "users", currentUser.uid), {
                profilePictureUrl: downloadURL,
            }, { merge: true });
            setImageUrl(downloadURL);
            alert("Profile picture uploaded successfully!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            setError("Error uploading profile picture. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavbarComponent />
            <Container className="profile-container mt-4">
                <Card className="text-center mb-4" style={{ backgroundColor: '#d3d3d3' }}>
                    <Card.Body>
                        <Card.Title>Welcome, {currentUser?.displayName || "User"}!</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{currentUser?.email || "N/A"}</Card.Subtitle>
                    </Card.Body>
                </Card>

                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="text-center">
                        {imageUrl && (
                            <Image src={imageUrl} alt="Profile" roundedCircle className="profile-image mb-4" />
                        )}
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Form className="mt-4">
                            <Form.Group>
                                <Form.Label>Choose an image to upload</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                            </Form.Group>
                            <Button onClick={handleUpload} disabled={loading || !image || !currentUser} className="mt-3">
                                {loading ? "Uploading..." : "Upload"}
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserProfile;
