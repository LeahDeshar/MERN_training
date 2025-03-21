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
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    // className="relative min-h-screen bg-background font-sans"
    <div className="">
      <main
        className="relative bg-cover bg-center bg-no-repeat px-4 lg:px-16 py-14 sm:py-24 text-white min-h-screen flex flex-col justify-center overflow-hidden"
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

        <div className="grid grid-cols-2   px-10 ">
          <div className="text-white">
            <div>
              <p className="mt-4 text-7xl">Discover</p>
              <p className="mt-4 text-7xl">Digital Art and </p>
              <p className="mt-4 text-7xl">Collect NFTS.</p>
            </div>
            <div className=" py-5">
              <p className="py-9">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                blanditiis mollitia eos magni? Cumque quisquam unde assumenda
                possimus officia magni sunt ullam voluptates porro nemo
                nesciunt, laboriosam excepturi repudiandae ducimus?
              </p>
              <div className="space-x-12  flex items-center">
                <button
                  className="rounded-full px-6 py-2 bg-gradient-to-br from-[#36b3c9] via-[#2a8c9d] via-30% to-[#32ad5e] text-black"

                  // className="rounded-full px-6 py-2 bg-gradient-to-r from-[#dfd056] via-[#bdc96f] via-30% to-[#81bd51] text-black"
                >
                  Get Started
                </button>
                <button className="flex items-center">
                  Learn More
                  <MoveRight width={50} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center ">
            {/* <div className=" absolute">
            <Image
              src="/hero/hero_2.svg"
              width={500}
              height={500}
              alt="Hero Image"
            />
          </div> */}
            <Image
              src="/hero/hero_5.png"
              width={500}
              height={500}
              alt="Hero Image"
            />
          </div>
        </div>

        <div className="absolute top-50  -right-80 w-[500px] h-[500px] -z-40">
          <Image
            src="/hero/hero_2.svg"
            layout="fill"
            objectFit="cover"
            alt="Hero Image"
          />
        </div>
      </main>

      <div className=" max-w-[88rem] w-full  relative  px-4 lg:px-16">
        <div className="isolate  bg-white/5 shadow-sm shadow-amber-50 ring-1 ring-black/5 mx-10 w-full rounded-4xl p-6 relative">
          <div className="px-6 flex justify-between items-center py-10">
            <div>
              <h1 className="text-2xl  text-white">Artwork</h1>
              <p className="text-white mt-2 font-bold text-7xl">27k+</p>
            </div>
            <div>
              <h1 className="text-2xl  text-white">Auction</h1>
              <p className="text-white mt-2 font-bold text-7xl">25k+</p>
            </div>
            <div>
              <h1 className="text-2xl text-white">Artist</h1>
              <p className="text-white mt-2 font-bold text-7xl">12k+</p>
            </div>
            <div>
              <div className="flex items-center gap-10">
                <h2 className="text-lg text-white">Art</h2>
                <p className="text-white font-bold text-3xl">3.4 ETH</p>
              </div>
              <div className="flex mt-4 items-center">
                {[
                  "/profiles/p1.jpg",
                  "/profiles/p4.jpeg",
                  "/profiles/p2.jpg",
                  "/profiles/p3.jpeg",
                  "/profiles/p3.jpeg",
                ].map((img, index) => (
                  <div
                    key={index}
                    className="relative  w-15  h-15 rounded-full bg-amber-300 -ml-3"
                  >
                    <Image
                      src={img}
                      layout="fill"
                      alt="Profile Image"
                      objectFit="cover"
                      className="rounded-full "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -top-24 left-3/12 w-[300px] h-[300px] -z-40">
            <Image
              src="/hero/hero_3.svg"
              layout="fill"
              objectFit="cover"
              alt="Hero Image"
            />
          </div>
        </div>

        <section className="flex items-center px-4 lg:px-16 gap-20 py-24">
          <div>
            <Image
              src="/profiles/group_img.svg"
              alt="Hero Image"
              width={550}
              height={500}
              objectFit="cover"
            />
          </div>

          <div className="text-white">
            <h1 className="text-lg font-semibold">Popular Item</h1>
            <div className="text-5xl font-bold mt-8 space-y-2">
              <p>Hot Trending</p>
              <p>On This</p>
              <p>Week.</p>
            </div>

            <p className="mt-4 text-gray-300 max-w-lg text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam consequuntur reiciendis, nisi, commodi sit fugit
              debitis illum ut, quasi sunt. Laudantium optio laborum porro
              blanditiis, odio soluta maxime inventore !
            </p>

            {/* CTA Button */}
            <button className="flex items-center mt-6 text-lg font-medium text-white hover:underline">
              See all
              <MoveRight className="ml-2 w-6 h-6" />
            </button>
          </div>
        </section>

        <section className="flex items-center px-4 lg:px-16 gap-20 py-14">
          <div className="text-white">
            <h1 className="text-lg font-semibold">Popular Item</h1>
            <div className="text-5xl font-bold mt-8 space-y-2">
              <p>Hot Trending</p>
              <p>On This</p>
              <p>Week.</p>
            </div>

            <p className="mt-4 text-gray-300 max-w-lg text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam consequuntur reiciendis, nisi, commodi sit fugit
              debitis illum ut, quasi sunt. Laudantium optio laborum porro
              blanditiis, odio soluta maxime inventore !
            </p>

            <button className="flex items-center mt-6 text-lg font-medium text-white hover:underline">
              See all
              <MoveRight className="ml-2 w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <ProfileCard />
            <ProfileCard />
          </div>
          <div className="absolute  -left-56 w-[500px] h-[500px] -z-40">
            <Image
              src="/hero/hero_2.svg"
              layout="fill"
              objectFit="cover"
              alt="Hero Image"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
const ProfileCard = () => {
  return (
    <div className="inset-2 relative bg-[#000]  text-white rounded-4xl h-80 w-64 flex flex-col items-center justify-between shadow-[inset_4px_4px_8px_rgba(255,255,255,0.25),_inset_-4px_-4px_8px_rgba(0,0,0,0.6)] transition-all duration-300 ">
      <div className="  text-white rounded-4xl h-80 w-64 flex flex-col items-center justify-between ">
        <div className="absolute -top-3 w-16 h-16 rounded-full shadow-md shadow-white/50 overflow-hidden p-6 ">
          <Image
            src="/profiles/p1.jpg"
            layout="fill"
            alt="Profile Image"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col items-center text-center mt-12 p-6 ">
          {/* Small Icon/Image */}
          <Image
            src="/profiles/crystal.png"
            width={40}
            height={40}
            alt="Crystal Icon"
            objectFit="cover"
          />
          <h2 className="text-lg font-semibold mt-2">Johnny Five</h2>
          <p className="text-sm text-gray-300 mt-1 px-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
            ut.
          </p>
        </div>

        <div className="w-[90%]  bottom-0 h-28 rounded-4xl relative overflow-hidden">
          <Image
            src="/profiles/p5.jpg"
            layout="fill"
            alt="Background Image"
            objectFit="cover"
            objectPosition="top"
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
