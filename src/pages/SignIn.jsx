import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { signInWithPopup, fetchSignInMethodsForEmail, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "/src/firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to the home page
                navigate("/home");
                toast.success("User signed in successfully!");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const SignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userSignInMethods = await fetchSignInMethodsForEmail(
                auth,
                user.email
            );

            if (userSignInMethods.length > 0) {
                toast.error("Email is already registered");
                navigate("/home");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error signing up");
        }
    };

    const SignInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const userSignInMethods = await fetchSignInMethodsForEmail(
                auth,
                user.email
            );

            if (userSignInMethods.length > 0) {
                toast.error("Email is already registered");
                navigate("/home");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            // toast.error("Error signing up with GitHub");
        }
    };

    return (
        <Container className="mt-5" maxWidth="lg">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
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
                                Welcome Back
                            </Typography>
                            <Typography variant="h6" align="center" gutterBottom>
                                To UniFinder
                            </Typography>
                            <div className="button-group">
                                <Button
                                    className="btn1"
                                    variant="contained"
                                    color="primary"
                                    onClick={SignInWithGoogle}
                                    startIcon={<img src="/google.svg" alt="Google Logo" className="icon" />}
                                >
                                    Sign In with Google
                                </Button>
                                <Button
                                    className="btn1"
                                    variant="contained"
                                    color="primary"
                                    onClick={SignInWithGitHub}
                                    startIcon={<img src="/github.png" alt="GitHub Logo" className="icon" />}
                                >
                                    Sign In with GitHub
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignIn;
