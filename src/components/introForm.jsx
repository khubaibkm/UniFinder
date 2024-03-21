import React, { useEffect, useState } from "react";
import { db, storage, auth } from "/src/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import "./introForm.css";
import { toast } from "react-toastify";

const IntroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // linkedin: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          email: user.email,
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      const introCollection = collection(db, "intro");

      let imageUrl = "";
      if (image) {
        const fileSizeInMB = image.size / (1024 * 1024);
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

        if (fileSizeInMB > 10) {
          toast.error("File size should not exceed 10MB");
          setLoading(false);
          return;
        }

        if (!allowedImageTypes.includes(image.type)) {
          toast.error("Invalid image format. Please use JPEG, PNG, or GIF");
          setLoading(false);
          return;
        }

        const storageRef = ref(storage, `profile_images/${currentUser.email}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(introCollection, {
        name: formData.name,
        email: currentUser.email,
        // linkedin: formData.linkedin,
        profileImageUrl: imageUrl,
        firebaseUID: currentUser.uid,
      });

      setFormData({
        name: "",
        email: "",
        linkedin: "",
      });
      setImage(null);

      console.log("Form submitted successfully!");
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  const handleImageDelete = () => {
    if (window.confirm("Are you sure you want to remove the image?")) {
      setImage(null);
    }
  };

  return (
    <Container className="onboarding-container mt-5" maxWidth="lg">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <div className="card shadow">
          <img className="mb-4 imgg" src="/vite.png" alt="UniFinder Logo"
                            />
            <div className="card-body">
              <Typography className="headingg" variant="h5" align="center" gutterBottom>
                Introduce Yourself!
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField 
                  fullWidth
                  type="email"
                  style={{marginBottom:".6rem"}}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-onboard"
                  disabled
                  required
                />
                {/* <TextField
                  label="LinkedIn Username"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                /> */}
                <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-upload-input"
                />
                <label
                htmlFor="profileImage"
                className="file-upload-label"
                >
                Upload Profile Picture
                </label>
                {image && (
                  <div className="mt-2">
                    <span
                      onClick={handleImageDelete}
                      className="text-danger cursor-pointer"
                    >
                      <i className="fa fa-close"></i> Remove Image
                    </span>
                  </div>
                )}
                <Button
                  className="subbtn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IntroForm;
