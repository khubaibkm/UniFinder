
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <ScaleLoader
      css={override}
      size={150}
      color={"#123abc"}
      loading={true}
    />
  );
};

export default Loader;