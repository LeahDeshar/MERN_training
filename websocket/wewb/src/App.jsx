import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Input from "./components/Input";
function App() {
  const [score, setScore] = useState({});
  const [total, setTotal] = useState([]);

  const socket = io("http://localhost:3000");

  function connectionSocket() {
    socket.on("connection", (socket) => {
      console.log("client", socket);
    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    let currObj = { [name]: value };
    setScore((prev) => ({ ...prev, ...currObj }));
  }

  useEffect(() => {
    connectionSocket();
    return () => {};
  }, []);

  function sendScore() {
    socket.emit("score", score);

    socket.on("playStores", (data) => {
      console.log("total", data);
      setTotal(data);
    });
  }
  console.log(total);
  return (
    <>
      <div>
        <h1 className=" text-2xl font-bold">React Multiplayer DashBoard</h1>
        <Input
          name="name"
          placeholder={"Enter Your Name"}
          handleInput={handleInput}
        />
        <Input
          name="score"
          placeholder={"Enter Your Score"}
          handleInput={handleInput}
        />
        <button
          onClick={sendScore}
          className="text-white bg-pink-400 px-3 py-2 rounded-lg"
        >
          Send Score
        </button>

        <div>
          <section className=" py-20 lg:py-[120px]">
            <div className="container">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                  <div className="max-w-full overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="bg-black text-center">
                          <th
                            className="
                  w-1/6
                  min-w-[160px]
                  text-lg
                  font-semibold
                 text-white
                  py-4
                  lg:py-7
                  px-3
                  lg:px-4
                  border-l border-transparent
                  "
                          >
                            Name
                          </th>
                          <th
                            className="
                  w-1/6
                  min-w-[160px]
                  text-lg
                  font-semibold
                  text-white
                  py-4
                  lg:py-7
                  px-3
                  lg:px-4
                  "
                          >
                            Score
                          </th>
                        </tr>
                      </thead>
                      {total?.map((s, i) => (
                        <tbody key={i}>
                          <tr>
                            <td
                              className="
                  text-center text-dark
                  font-medium
                  text-base
                  py-5
                  px-2
                  border-b border-l border-[#E8E8E8]
                  "
                            >
                              {s?.name}
                            </td>
                            <td
                              className="
                  text-center text-dark
                  font-medium
                  text-base
                  py-5
                  px-2
                  border-b border-[#E8E8E8]
                  "
                            >
                              {s?.score}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
