"use client";
import Button from "@/components/ui/Button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div className=" text-white">
      <Header />
      <MainBody />
      <GlassContent />

      <section className="px-4 lg:px-16  overflow-hidden relative min-w-[32rem] ">
        <div className="px-4 lg:px-16 gap-20 py-14  flex flex-col sm:flex-row items-center  ">
          <div>
            <h1 className="text-lg font-semibold">Popular Item</h1>
            <div className="text-7xl sm:text-7xl lg:text-5xl font-bold mt-8 space-y-2">
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

          <div className="flex flex-col sm:flex-row gap-6 lg:self-end lg:ml-auto">
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

      <section className="relative px-4 lg:px-28 gap-20 py-24 min-w-[32rem] border border-white">
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
      <Footer />
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className="relative bg-[#000] text-white rounded-4xl h-96  lg:h-80 w-full sm:w-72 lg:w-64 flex flex-col items-center justify-between shadow-[inset_4px_4px_8px_rgba(255,255,255,0.25),_inset_-4px_-4px_8px_rgba(0,0,0,0.6)] transition-all duration-300 lg:mt-0 mt-16">
      <div className="absolute -top-6 w-20 h-20 lg:w-16 lg:h-16 sm:w-20 sm:h-20 rounded-full shadow-md shadow-white/50 overflow-hidden">
        <Image
          src="/profiles/p1.jpg"
          layout="fill"
          alt="Profile Image"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col items-center text-center mt-24 lg:mt-12 sm:mt-16 px-4 sm:px-6">
        <Image
          src="/profiles/crystal.png"
          width={40}
          height={40}
          alt="Crystal Icon"
          objectFit="cover"
        />
        <h2 className="text-lg sm:text-xl font-semibold mt-2">Johnny Five</h2>
        <p className="text-sm sm:text-base text-gray-300 mt-1 px-2 sm:px-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
          ut.
        </p>
      </div>

      <div className="w-[90%] h-32 lg:h-28 sm:h-32 rounded-4xl relative overflow-hidden mt-4">
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
  );
};
const MainBody = () => {
  return (
    <main
      className="relative lg:bg-cover lg:bg-center  sm:bg-left bg-no-repeat min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-18 py-14 sm:py-24 w-full min-w-[32rem]"
      style={{
        backgroundImage: "url('/hero/hero.svg')",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 py-10 sm:py-20 ">
        <div className="text-white text-left mt-12 lg:mt-0 sm:mt-9">
          <div>
            <p className="mt-4 text-6xl sm:text-6xl lg:text-7xl">Discover</p>
            <p className="mt-4 text-6xl sm:text-6xl lg:text-7xl">
              Digital Art and
            </p>
            <p className="mt-4 text-6xl sm:text-5xl lg:text-7xl">
              Collect NFTS.
            </p>
          </div>
          <div className="py-5">
            <p className="py-6 text-lg text-justify sm:text-md lg:text-lg max-w-lg mx-auto md:mx-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              blanditiis mollitia eos magni? Cumque quisquam unde assumenda
              possimus officia magni sunt ullam voluptates porro nemo nesciunt,
              laboriosam excepturi repudiandae ducimus?
            </p>

            <div className="flex flex-row items-center mt-5 gap-4 w-full  max-w-lg">
              <button className="flex-1 min-w-0 rounded-full px-6 py-2 bg-gradient-to-br from-[#36b3c9] via-[#2a8c9d] via-30% to-[#32ad5e] text-black">
                Get Started
              </button>
              <button className="flex-1 min-w-0 flex items-center justify-center rounded-full border border-gray-300 px-6 py-2">
                Learn More
                <MoveRight width={30} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <Image
            src="/hero/hero_5.png"
            width={500}
            height={500}
            alt="Hero Image"
            className="w-full sm:w-80 md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>
      </div>

      <div className="absolute top-50 -right-80 w-[500px] h-[500px] -z-40">
        <Image
          src="/hero/hero_2.svg"
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
        />
      </div>
    </main>
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
const GlassContent = () => {
  return (
    <div className="max-w-[88rem] min-w-[32rem] w-full px-4 lg:px-16 mx-auto relative">
      <div className="isolate bg-white/5 shadow-sm shadow-amber-50 ring-1 ring-black/5 mx-auto w-[95%] rounded-4xl p-6 relative">
        <div className="px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center py-10 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-2xl text-white">Artwork</h1>
            <p className="text-white mt-2 font-bold text-5xl sm:text-7xl">
              27k+
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-white">Auction</h1>
            <p className="text-white mt-2 font-bold text-5xl sm:text-7xl">
              25k+
            </p>
          </div>
          <div>
            <h1 className="text-2xl text-white">Artist</h1>
            <p className="text-white mt-2 font-bold text-5xl sm:text-7xl">
              12k+
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10">
              <h2 className="text-lg text-white">Art</h2>
              <p className="text-white font-bold text-2xl sm:text-3xl">
                3.4 ETH
              </p>
            </div>
            <div className="flex mt-4 justify-center md:justify-start">
              {[
                "/profiles/p1.jpg",
                "/profiles/p4.jpeg",
                "/profiles/p2.jpg",
                "/profiles/p3.jpeg",
                "/profiles/p3.jpeg",
              ].map((img, index) => (
                <div
                  key={index}
                  className="relative w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-amber-300 -ml-3"
                >
                  <Image
                    src={img}
                    layout="fill"
                    alt="Profile Image"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] -z-40">
          <Image
            src="/hero/hero_3.svg"
            layout="fill"
            objectFit="cover"
            alt="Hero Image"
          />
        </div>
      </div>

      <section className="flex flex-col-reverse md:flex-row items-center sm:px-4 px-4 lg:px-0 gap-8 md:gap-20  py-24  w-full ">
        <div className="container max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-20">
          <div className="flex justify-center md:justify-start w-full">
            <Image
              src="/profiles/group_img.svg"
              alt="Hero Image"
              width={450}
              height={400}
              objectFit="cover"
              className="w-full md:w-auto"
            />
          </div>

          <div className="text-white text-left w-full">
            <h1 className="text-lg font-semibold">Popular Item</h1>
            <div className="text-7xl sm:text-5xl lg:text-6xl font-bold mt-6 sm:mt-8 space-y-2">
              <p>Hot Trending</p>
              <p>On This</p>
              <p>Week.</p>
            </div>

            <p className="mt-4 text-gray-300  text-justify mx-auto md:mx-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam consequuntur reiciendis, nisi, commodi sit fugit
              debitis illum ut, quasi sunt. Laudantium optio laborum porro
              blanditiis, odio soluta maxime inventore!
            </p>

            <button className="flex items-center justify-center md:justify-start mt-6 text-lg font-medium text-white hover:underline">
              See all
              <MoveRight className="ml-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white py-12 px-6 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 ">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Endasmu</h1>
          <p className="text-gray-400 text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa harum
            corporis, rem beatae voluptas vitae a odio perspiciatis odit
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
  );
};
// BACKUP
{
  /* <div className="grid grid-cols-2   px-10 ">
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
          
            <Image
              src="/hero/hero_5.png"
              width={500}
              height={500}
              alt="Hero Image"
            />
          </div>
        </div> */
}
