import { useState, useEffect, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";  // Firestore instance
import { AuthContext } from "../components/AuthProvider";  // Auth context
import { Button, Form, Container, Image } from "react-bootstrap";

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);  // Get the current user
    const [image, setImage] = useState(null);  // For handling image file
    const [imageUrl, setImageUrl] = useState("");  // For displaying uploaded image
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        // Fetch the profile picture URL from Firestore on component mount
        const fetchProfilePicture = async () => {
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);  // Reference to user document
                const docSnap = await getDoc(docRef);  // Get document snapshot

                if (docSnap.exists()) {
                    setImageUrl(docSnap.data().profilePictureUrl);  // Set profile picture URL if exists
                }
            }
        };

        fetchProfilePicture();
    }, [currentUser]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);  // Set the selected file
    };

    const handleUpload = async () => {

        if (!image || !currentUser) return;

        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);  // Create a reference to the file

        try {
            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, image);

            // Get the URL of the uploaded file
            const downloadURL = await getDownloadURL(storageRef);

            // Store the URL in Firestore under the user's document
            await setDoc(doc(db, "users", currentUser.uid), {
                profilePictureUrl: downloadURL,
            }, { merge: true });  // Ensure document is merged, not overwritten

            // Update the imageUrl state to display the uploaded image
            setImageUrl(downloadURL);
            alert("Profile picture uploaded successfully!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Error uploading profile picture.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Upload Profile Picture</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Choose an image to upload</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Group>
                <Button onClick={handleUpload} disabled={loading || !image || !currentUser}>
                    {loading ? "Uploading..." : "Upload"}
                </Button>
            </Form>

            {imageUrl && (
                <div className="mt-4">
                    <h4>Your Profile Picture</h4>
                    <Image src={imageUrl} alt="Profile" roundedCircle width={150} height={150} />
                </div>
            )}
        </Container>
    );
};

export default UserProfile;
