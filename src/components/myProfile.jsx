import React, { useState, useEffect } from "react";
import { db, auth, storage } from "/src/firebase.js";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./myProfile.css";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [updatedFormData, setUpdatedFormData] = useState({
    name: "",
    profileImageUrl: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("User not authenticated");
          return;
        }

        const q = query(
          collection(db, "intro"),
          where("firebaseUID", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          userData.id = querySnapshot.docs[0].id;
          setUserData(userData);

          setUpdatedFormData({
            name: userData.name,
            profileImageUrl: userData.profileImageUrl,
          });
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setUpdatedFormData({
      name: userData.name,
      profileImageUrl: userData.profileImageUrl,
    });
    setImage(null);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let updatedData = { ...updatedFormData };

      if (!image && updatedData.profileImageUrl === "") {
        // No image uploaded, and no existing profile image, set profileImageUrl to null
        updatedData = { ...updatedData, profileImageUrl: null };
      } else if (image) {
        // Image uploaded
        const storageRef = ref(
          storage,
          `profile_images/${auth.currentUser.email}`
        );
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        updatedData = { ...updatedData, profileImageUrl: imageUrl };
      }

      const introDocRef = doc(db, "intro", userData.id);
      await updateDoc(introDocRef, {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...updatedData,
      }));

      setEditingField(null);
      setImage(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile: ", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setUpdatedFormData((prevData) => ({
        ...prevData,
        profileImageUrlPreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to the sign-in page after logout
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container mt-5 p-5">
      <div className="card cardd p-4">
        <Typography variant="h4" align="center" gutterBottom>
          My Profile
        </Typography>

        {userData ? (
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 text-center">
              <Typography variant="subtitle1" className="mb-2">
                {/* <center><strong>Profile Picture:</strong></center> */}
              </Typography>
              <div className="profile-image-container">
                {editingField === "profileImageUrl" ? (
                  <div>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    {updatedFormData.profileImageUrlPreview && (
                      <Avatar
                        src={updatedFormData.profileImageUrlPreview}
                        alt="Preview"
                        className="profile-image-preview"
                      />
                    )}
                  </div>
                ) : (
                  <span>
                    {userData.profileImageUrl && (
                      <Avatar
                        src={userData.profileImageUrl}
                        alt="Profile"
                        className="profile-image"
                      />
                    )}
                  </span>
                )}
                <IconButton
                  onClick={() => handleEditClick("profileImageUrl")}
                  className="edit-icon"
                >
                  <FaPencilAlt />
                </IconButton>
              </div>
            </div>

            <div className="col-md-8">
              <TextField
                label="Name"
                name="name"
                value={updatedFormData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => handleEditClick("name")}>
                      <FaPencilAlt />
                    </IconButton>
                  ),
                }}
                disabled={editingField !== "name"}
                sx={{ mb: 3 }}
              />

              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                disabled={loading}
                className="button"
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outlined"
                className="button"
              >
                Cancel
              </Button>
              {/* Logout button */}
              <Button
                onClick={handleLogout}
                variant="outlined"
                className="button loggout"
                sx={{ mt: 2 }}
              >
                <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
