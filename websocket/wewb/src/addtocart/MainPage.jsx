import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function MainPage() {
  const socket = io("http://localhost:8080");
  const [totalProduct, setTotalProduct] = useState([]);
  const [totalCart, setTotalCart] = useState([]);

  function connectionSocket() {
    socket.on("connection", (socket) => {
      console.log("client", socket);
    });
  }

  useEffect(() => {
    connectionSocket();
    socket.emit("getAll");
    socket.on("read", (data) => {
      setTotalProduct(data);
      console.log(data);
    });

    socket.emit("readFromCart");
    socket.on("readCart", (data) => {
      setTotalCart(data);
    });
  }, []);
  console.log(totalProduct);

  const [open, IsOpen] = useState(false);

  function toggleOpen() {
    IsOpen(!open);
  }
  function currentProduct(id) {
    socket.emit("addToCart", id);
    socket.on("readCart", (data) => {
      setTotalCart(data);
    });
  }
  console.log(totalCart);

  function deleteFromCart(id) {
    console.log("from parent", id);
    socket.emit("removeFromCart", id);
    socket.on("removeProduct", (data) => {
      setTotalCart(data);
    });
  }
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">CartExample</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Home</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
          </nav>
          <div className=" relative">
            <div className="absolute top-0 z-50">
              <Cart
                open={open}
                totalCart={totalCart}
                deleteFromCart={deleteFromCart}
              />
            </div>
            <button
              onClick={toggleOpen}
              className="inline-flex items-center bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Cart
            </button>
          </div>
        </div>
      </header>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap m-4 ">
            {totalProduct.map((product, i) => (
              <div
                key={i}
                className="lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-pink-200 rounded-lg mx-4"
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product?.images[0]?.url}
                  />
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.name.toUpperCase()}
                  </h2>
                  <p className="mt-1">${product.price}.00</p>
                  <p className="mt-1">{product.description}</p>
                  <button
                    onClick={() => currentProduct(product._id)}
                    className=" bg-pink-900 text-white px-4 py-2  rounded-lg mt-3"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function Cart({ open, totalCart, deleteFromCart }) {
  function deleteProduct(id) {
    console.log(id);
    deleteFromCart(id);
  }
  const allPrice = totalCart?.reduce((acc, cart) => {
    return (acc += Number(cart.items[0].product.price));
  }, 0);
  return (
    <div>
      <div className="pb-3">
        <div className=" h-14  ">
          <div className="relative ">
            <div className=" h-14 cursor-pointer truncate p-2  rounded">
              <div className=" w-full">
                <div slot="icon" className="relative">
                  <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-black text-white">
                    {totalCart?.length}
                  </div>
                </div>
              </div>
            </div>
            {open && (
              <div className="absolute w-full right-36 rounded-b border-t-0 z-50">
                <div className="shadow-xl w-80  bg-white ">
                  <div className="overflow-y-scroll h-96 bg-white">
                    {totalCart &&
                      totalCart.map((cart, i) => (
                        <div
                          key={i}
                          className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                        >
                          <div className=" mr-3">
                            <img
                              src={cart.items[0].product.images[0].url}
                              className="h-20 w-20  object-cover"
                            />
                          </div>
                          <div className="flex-auto text-sm w-36">
                            <div className="font-bold">
                              {cart.items[0].product.name}
                            </div>
                            <div className="truncate">
                              {cart.items[0].product.description}
                            </div>
                            <div className="text-gray-400">
                              <button
                                onClick={() => deleteProduct(cart._id)}
                                className="hover:text-pink-500"
                              >
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
                            </div>
                          </div>
                          <div className="flex flex-col w-18 font-medium items-end">
                            <div className="w-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"></div>
                            $ {cart.items[0].product.price}.00
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="bg-pink-200 p-4 justify-center flex">
                    <button
                      className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
              hover:bg-pink-700 hover:text-pink-100
              bg-pink-100
              text-pink-700
              border duration-200 ease-in-out
              border-pink-600 transition"
                    >
                      Checkout ${allPrice}.00
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
