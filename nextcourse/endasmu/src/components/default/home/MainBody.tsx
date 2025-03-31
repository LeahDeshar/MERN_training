import { MoveRight } from "lucide-react";
import Image from "next/image";

export const MainBody = () => {
  return (
    <main
    // [@media_(min-width:679px)_and_(max-width:1087px)]:py-0
    // className="relative lg:bg-cover lg:bg-center  sm:bg-left bg-no-repeat flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-18 py-14   "
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
