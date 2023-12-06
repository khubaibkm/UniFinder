import loadingImage from "/logo_black.png"; // Replace with the actual path to your image
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import "./loader.css";

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;

  }
  80% {
    opacity: 0;
  }
`;

const OverrideDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Image = styled.img`
  animation: ${fadeInOut} 4.5s linear infinite;
`;

const LoaderContainer = styled.div`
  position: absolute;
`;

const Loader = () => {
  return (
    <OverrideDiv>
      <LoaderContainer>
        <Image className="loadImg" src={loadingImage} alt="Loading" />
      </LoaderContainer>
    </OverrideDiv>
  );
};

export default Loader;
