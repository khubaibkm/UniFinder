import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "/src/firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const SignUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userSignInMethods = await fetchSignInMethodsForEmail(
                auth,
                user.email
            );

            if (userSignInMethods.length > 0) {
                toast.error("Email is already registered");
            } else {
                navigate("/home");
                toast.success("User signed up successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error signing up");
        }
    };

    const SignUpWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const userSignInMethods = await fetchSignInMethodsForEmail(
                auth,
                user.email
            );

            if (userSignInMethods.length > 0) {
                toast.error("Email is already registered");
            } else {
                navigate("/home");
                toast.success("User signed up successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error signing up with GitHub");
        }
    };

    return (
        <Container className="mt-5" maxWidth="lg">
            <Grid
                container
                justifyContent="center"
                alignItems="center" /* Center vertically */
                style={{ height: "100vh" }} /* Full height of the viewport */
            >
                <Grid item>
                    <div className="shadow-box">
                        <div className="sign-in-option">
                            <img
                                className="mb-4 mainicon"
                                src="/vite.png"
                                alt="UniFinder Logo"
                            />
                            <Typography variant="h4" align="center" gutterBottom>
                                Welcome to UniFinder
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom>
                                Get Started
                            </Typography>
                            <div className="button-group">
                                <Button
                                    className="btn1"
                                    variant="contained"
                                    color="primary"
                                    onClick={SignUpWithGoogle}
                                    startIcon={<img src="/google.svg" alt="Google Logo" className="icon" />}
                                >
                                    Sign Up with Google
                                </Button>
                                <Button
                                    className="btn1"
                                    variant="contained"
                                    color="primary"
                                    onClick={SignUpWithGitHub}
                                    startIcon={<img src="/github.png" alt="GitHub Logo" className="icon" />}
                                >
                                    Sign Up with GitHub
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUp;
