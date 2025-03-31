import { MoveRight } from "lucide-react";
import Image from "next/image";

export const GlassContent = () => {
  return (
    <div className="max-w-[88rem] min-w-[25rem] w-full mx-auto relative">
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

      <section className="flex flex-col-reverse md:flex-row items-center sm:px-0 px-0 lg:px-0 gap-8 md:gap-20  py-24  w-full ">
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
