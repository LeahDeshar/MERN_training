"use client";
import Button from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div className="">
      <main
        className="relative bg-cover bg-center bg-no-repeat px-4 lg:px-16 py-14 sm:py-24 text-white min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/hero/hero.svg')",
        }}
      >
        <Header />
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
          <div
            // className="px-6 flex justify-between items-center py-10"
            className="px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center py-10 gap-8 "
          >
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

        <section
          // className="flex items-center px-4 lg:px-16 gap-20 py-24"
          // className="flex flex-col-reverse md:flex-row  items-center border border-white px-6 lg:px-16 gap-10 md:gap-20 py-12 sm:py-24"

          className="flex flex-col-reverse md:flex-row  items-center border border-white px-6 lg:px-16 gap-10 md:gap-20 py-12 sm:py-24"
        >
          <div className="flex justify-center md:justify-start">
            <Image
              src="/profiles/group_img.svg"
              alt="Hero Image"
              width={550}
              height={500}
              objectFit="cover"
            />
          </div>

          <div className="text-white ">
            <h1 className="text-lg font-semibold">Popular Item</h1>
            <div className="sm:text-2xl text-4xl lg:text-5xl font-bold mt-8 space-y-2">
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
      </div>
      <section className="px-4 lg:px-16  overflow-hidden relative  ">
        <div className="px-4 lg:px-16 gap-20 py-14  flex items-center  ">
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

          <div className="flex items-center gap-6 ">
            <ProfileCard />
            <ProfileCard />
          </div>
          <div className="absolute  -right-56 w-[500px] h-[500px] -z-40">
            <Image
              src="/hero/hero_2.svg"
              layout="fill"
              objectFit="cover"
              alt="Hero Image"
            />
          </div>
        </div>
      </section>

      <section className="relative px-4 lg:px-28 gap-20 py-24">
        <div className="text-white text-8xl  pt-14 pb-8">
          <h1 className="my-5">Subscribe to Get Fresh </h1>
          <h1 className="my-5">News Update About </h1>
          <h1 className="my-5">NFTs.</h1>
        </div>

        <button className="rounded-full px-6 py-2 mt-5 bg-gradient-to-br from-[#36b3c9] via-[#2a8c9d] via-30% to-[#32ad5e] text-black text-lg">
          Subscribe
        </button>

        <div className="absolute top-0  -left-72 w-[800px] h-[800px] -z-40">
          <Image
            src="/hero/hero_3.svg"
            layout="fill"
            objectFit="cover"
            alt="Hero Image"
          />
        </div>
      </section>

      <footer className="relative overflow-hidden text-white py-12 px-6 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 ">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-4">Endasmu</h1>
            <p className="text-gray-400 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              harum corporis, rem beatae voluptas vitae a odio perspiciatis odit
              voluptatibus!
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              {["FB", "TW", "IG", "LN"].map((icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                >
                  <span>{icon}</span>
                </div>
              ))}
            </div>
            {/* Copyright */}
            <div className="mt-6">
              <p className="text-gray-500 text-sm">
                © 2021 Endasmu. All rights reserved
              </p>
            </div>
          </div>

          <div className="justify-self-end">
            <h1 className="text-xl font-semibold mb-4">Explore</h1>
            {["Art", "Collections", "Domain Name", "Utility"].map(
              (item, index) => (
                <p
                  key={index}
                  className="text-gray-400 text-sm mb-2 hover:text-white"
                >
                  {item}
                </p>
              )
            )}
          </div>

          <div className="justify-self-end">
            <h1 className="text-xl font-semibold mb-4">Statistic</h1>
            {["Ranking", "Activity"].map((item, index) => (
              <p
                key={index}
                className="text-gray-400 text-sm mb-2 hover:text-white"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="justify-self-end">
            <h1 className="text-xl font-semibold mb-4">Resource</h1>
            {["Help Center", "Platform Status", "Partners", "Blog", "Faq"].map(
              (item, index) => (
                <p
                  key={index}
                  className="text-gray-400 text-sm mb-2 hover:text-white"
                >
                  {item}
                </p>
              )
            )}
          </div>

          <div className="justify-self-end">
            <h1 className="text-xl font-semibold mb-4">Company</h1>
            {["About us", "Career", "Support"].map((item, index) => (
              <p
                key={index}
                className="text-gray-400 text-sm mb-2 hover:text-white"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="absolute top-0 opacity-70 -right-56 w-[500px] h-[500px] -z-40">
          <Image
            src="/hero/hero_2.svg"
            layout="fill"
            objectFit="cover"
            alt="Hero Image"
          />
        </div>
      </footer>
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

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isThrottled = useRef(false);
  const router = useRouter();
  useEffect(() => {
    const initialScroll = window.scrollY > 44;
    setIsScrolled(initialScroll);
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (isThrottled.current) return;

      isThrottled.current = true;
      setTimeout(() => {
        const currentScrollY = window.scrollY;
        const headerTopHeight = 44;

        if (currentScrollY < headerTopHeight) {
          setIsHidden(false);
          setIsScrolled(false);
        } else if (currentScrollY > lastScrollY.current) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        if (currentScrollY >= headerTopHeight) {
          setIsScrolled(true);
        }

        lastScrollY.current = currentScrollY;
        isThrottled.current = false;
      }, 100);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);
  const isActive = (path: string) => {
    // Check if the current path matches the link's path
    return router.asPath === path;
  };
  return (
    <nav
      className={`z-50 fixed top-0 left-0 w-full p-4 px-5 lg:px-28 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-background/70 bg-opacity-90 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">
          <Link href="/">Endasmu</Link>
        </h1>

        <div>
          <ul className="flex space-x-7">
            <li>
              <Link
                href="/collection"
                className={`${
                  isActive("/collection")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className={`${
                  isActive("/marketplace")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Market Place
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className={`${
                  isActive("/community")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                href="/connect-wallet"
                className={`${
                  isActive("/connect-wallet")
                    ? "text-blue-500 font-semibold"
                    : "text-white"
                }`}
              >
                Connect Wallet
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
