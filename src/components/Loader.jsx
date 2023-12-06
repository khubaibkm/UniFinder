// Loader.jsx
import React from "react";
import loadingImage from "/logo_black.png"; // Replace with the actual path to your image
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;

  }
  90% {
    opacity: 0;
  }
`;

const OverrideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust this to the desired height */
`;

const Image = styled.img`
  //width: 150px; /* Adjust this to the desired width */
  //height: 150px; /* Adjust this to the desired height */
  animation: ${fadeInOut} 4s linear infinite; /* Adjust the duration for smoother animation */
`;

const LoaderContainer = styled.div`
  position: absolute;
`;

const Loader = () => {
  return (
    <OverrideDiv>
      <LoaderContainer>
        <Image src={loadingImage} alt="Loading" />
      </LoaderContainer>
    </OverrideDiv>
  );
};

export default Loader;
