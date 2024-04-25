import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function MainPage() {
  const socket = io("http://localhost:8080");
  const [totalProduct, setTotalProduct] = useState([]);

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
  }, []);
  console.log(totalProduct);

  const [open, IsOpen] = useState(false);

  function toggleOpen() {
    IsOpen(!open);
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
              <Cart open={open} />
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
                  <button className=" bg-pink-900 text-white px-4 py-2  rounded-lg mt-3">
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

export function Cart({ open }) {
  console.log(open);
  return (
    <div>
      <div className="pb-3">
        <div className=" h-14  ">
          <div className="relative ">
            <div className=" h-14 cursor-pointer truncate p-2  rounded">
              <div className=" w-full">
                <div slot="icon" className="relative">
                  <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-black text-white">
                    3
                  </div>
                </div>
              </div>
            </div>
            {open && (
              <div className="absolute w-full right-36 rounded-b border-t-0 z-50">
                <div className="shadow-xl w-64">
                  <div className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">
                    <div className="p-2 w-12"></div>
                    <div className="flex-auto text-sm w-32">
                      <div className="font-bold">Product 1</div>
                      <div className="truncate">Product 1 description</div>
                      <div className="text-gray-400">Qt: 2</div>
                    </div>
                    <div className="flex flex-col w-18 font-medium items-end">
                      <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"></div>
                      $12.22
                    </div>
                  </div>

                  <div className="p-4 justify-center flex">
                    <button
                      className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
              hover:bg-pink-700 hover:text-pink-100
              bg-pink-100
              text-pink-700
              border duration-200 ease-in-out
              border-pink-600 transition"
                    >
                      Checkout $36.66
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
