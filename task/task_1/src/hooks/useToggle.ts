import { useState } from "react";

const useToggle = () => {
  const [toggleState, setToggleState] = useState<boolean>(false);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  return { toggleState, handleToggle };
};

export default useToggle;
