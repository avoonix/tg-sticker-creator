import { Heading } from "@react-spectrum/text";
import { FC } from "react";

const Title: FC = (props) => {
  return (
    <Heading level={1} UNSAFE_style={{ textAlign: "center" }}>
      <img
        src="/favicon.svg"
        alt="Logo"
        style={{
          width: "2em",
          height: "2em",
          verticalAlign: "middle",
          marginRight: "8px",
        }}
      />
      <span style={{ color: "#bf8a0f" }}>A</span>voo's{" "}
      <span style={{ color: "#bf8a0f" }}>S</span>ticker{" "}
      <span style={{ color: "#bf8a0f" }}>S</span>tash
    </Heading>
  );
};

export default Title;
