import React, { ComponentType } from "react";

interface SimpleComponentProps {
  name: string;
}

export const WithMessage = <P extends object>(
  WrappedComponent: ComponentType<P>,
  message: string
) => {
  return (props: P) => (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <p>{message}</p>
      <WrappedComponent {...props} />
    </div>
  );
};

const SimpleComponent: React.FC<SimpleComponentProps> = ({ name }) => {
  return <p>Hello, {name}!</p>;
};

export default SimpleComponent;
