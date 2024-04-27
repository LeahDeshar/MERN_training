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
      {/* <div className="flex flex-row border-2 border-black">
        <div className="border-2 border-black">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="border-2 border-red-800 mx-10">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div> */}
      <div className="flex flex-row border-2 border-black">
        <div className="border-2 border-black  w-1/3">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="border-2 border-red-800 mx-10 flex-1">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
