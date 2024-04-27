import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}

      <div className="flex flex-row   mx-20 mb-52" style={{ height: "80vh" }}>
        <div className=" w-1/3">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className=" mx-10 flex-1">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
