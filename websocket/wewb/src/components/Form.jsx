import Input from "./Input";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Form() {
  const socket = io("http://localhost:8080");
  const [user, setUser] = useState({});
  const [totalUser, setTotalUser] = useState([]);

  function connectionSocket() {
    socket.on("connection", (socket) => {
      console.log("client", socket);
    });
  }

  useEffect(() => {
    connectionSocket();
    return () => {};
  }, []);

  function handleInput(event) {
    let { name, value } = event.target;
    let currObj = { [name]: value };
    setUser((prev) => ({ ...prev, ...currObj }));
  }
  console.log(user);
  const resetForm = () => {
    setUser({ Name: "", Email: "", Password: "" });
  };
  function sendUsers() {
    socket.emit("createRead", user);

    socket.on("crudStores", (data) => {
      console.log("total", data);
      setTotalUser(data);
    });
    // clear the input value
    resetForm();
  }

  function deleteUser(id) {
    console.log("received id", id);
    socket.emit("delete", id);
    socket.on("crudStores", (data) => {
      console.log("total", data);
      setTotalUser(data);
    });
  }
  console.log("totalUser", totalUser);

  return (
    <div className="container mx-10">
      <div className="flex  mt-10">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Create operation
          </h4>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input name="Name" handleInput={handleInput} value={user.Name} />
              <Input
                name={"Email"}
                handleInput={handleInput}
                value={user.Email}
              />
              <Input
                name={"Password"}
                handleInput={handleInput}
                type={true}
                value={user.Password}
              />
            </div>

            <button
              className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={sendUsers}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      <Table
        totalUser={totalUser}
        setTotalUser={setTotalUser}
        deleteUser={deleteUser}
        setUser={setUser}
      />
    </div>
  );
}

export function Table({ totalUser, deleteUser, setUser, setTotalUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const handleOpenModal = (users) => {
    setUpdateUser(users);
    setIsOpen(!isOpen);
  };
  console.log("table", totalUser, updateUser);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-pink-500 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Operation
                  </th>
                </tr>
              </thead>
              {totalUser &&
                totalUser?.map((users, i) => (
                  <tbody key={i}>
                    <tr className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {users.Name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {users.Email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {users.Password}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  flex justify-around">
                        <button onClick={() => deleteUser(users._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleOpenModal(users)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          setTotalUser={setTotalUser}
          setUser={setUser}
          setIsOpen={setIsOpen}
          updateUser={updateUser}
        />
      )}
    </div>
  );
}

export function Modal({ setTotalUser, setIsOpen, updateUser }) {
  const socket = io("http://localhost:8080");
  const [newUser, setNewUser] = useState(updateUser || {});

  console.log("update", newUser);

  function updateUsers() {
    console.log("button clicked");
    console.log("update");
    setIsOpen(false);
    socket.emit("update", newUser);

    socket.on("crudStores", (data) => {
      console.log("total", data);
      setTotalUser(data);
    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold">Update Operation</h1>
            </div>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  name="Name"
                  handleInput={handleInput}
                  value={newUser.Name || ""}
                />
                <Input
                  name={"Email"}
                  value={newUser.Email}
                  handleInput={handleInput || ""}
                />
                <Input
                  name={"Password"}
                  value={newUser.Password}
                  handleInput={handleInput}
                  type={true}
                />
              </div>

              <button
                className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
                onClick={updateUsers}
              >
                Update Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
