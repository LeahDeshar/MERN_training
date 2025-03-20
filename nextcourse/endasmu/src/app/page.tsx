// "use client";
// import { useEffect, useState } from "react";
// import Loading from "./loading";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="bg-background font-sans relative">
//       <div className="w-96 h-full border-2  absolute">
//         <div className="radial-blur-background"></div>
//         <div className="radial-blur-background-2"></div>
//       </div>
//       <div>
//         <div className="grid grid-cols-2">
//           <div className="">
//             <h1>Title and description</h1>
//           </div>
//           <div className="">
//             <Image
//               src="/hero/img_2.png"
//               // layout="fill"
//               objectFit="cover"
//               height={100}
//               width={100}
//               alt="background"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Home() {
  return (
    // className="relative min-h-screen bg-background font-sans"
    <div
      className="relative bg-cover bg-center bg-no-repeat px-4 lg:px-16 py-14 sm:py-24 text-white min-h-screen flex flex-col justify-center"
      style={{
        backgroundImage: "url('/hero/hero.svg')",
      }}
    >
      <nav className="fixed top-0 left-0 w-full bg-opacity-75  text-white p-4 px-5 lg:px-28">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Endasmu</h1>

          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="#">Collection</a>
              </li>
              <li>
                <a href="#">Market Place</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Connect Wallet</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-2 min-h-screen items-center px-10 mt-16">
        <div className="text-white">
          <div>
            <p className="mt-4 text-lg">Discover</p>
            <p className="mt-4 text-lg">Digital Art and </p>
            <p className="mt-4 text-lg">Collect NFTS.</p>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              aut voluptatem repudiandae saepe beatae delectus facilis, illo
              ratione est possimus!
            </p>
            <div>
              <button>Get Started</button>
              <button>Learn More</button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/hero/img_2.png"
            width={400}
            height={400}
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
  );
}
