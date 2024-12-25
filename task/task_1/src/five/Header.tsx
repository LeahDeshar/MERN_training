import React, { ComponentType } from "react";

export const WithHeader = <P extends object>(
  WrappedComponent: ComponentType<P>,
  title: string,
  paragraph: string
) => {
  return (props: P) => {
    return (
      <div>
        <Header title={title} paragraph={paragraph} />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

interface HeaderComponentProps {
  title: string;
  paragraph: string;
}

const Header: React.FC<HeaderComponentProps> = ({ title, paragraph }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default Header;
