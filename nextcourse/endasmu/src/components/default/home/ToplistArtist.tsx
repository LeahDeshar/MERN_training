import Image from "next/image";
import { ProfileCard } from "./ProfileCard";
import { MoveRight } from "lucide-react";

export const ToplistArtist = () => {
  return (
    <section className="px-0 lg:px-16   w-full min-w-full ">
      <div className="px-0 lg:px-16 gap-20 py-14  flex flex-col sm:flex-row items-center  ">
        <div>
          <h1 className="text-lg font-semibold">Artist</h1>
          <div className="text-7xl sm:text-7xl md:text-[3.2rem] lg:text-5xl font-bold mt-8 space-y-2">
            <p>Top List</p>
            <p>Artist.</p>
          </div>

          <p className="mt-4 text-gray-300 max-w-lg text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            consequuntur reiciendis, nisi, commodi sit fugit debitis illum ut,
            quasi sunt. Laudantium optio laborum porro blanditiis, odio soluta
            maxime inventore !
          </p>

          <button className="flex items-center mt-6 text-lg font-medium text-white hover:underline">
            See all
            <MoveRight className="ml-2 w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 lg:self-end lg:ml-auto  [@media_(min-width:679px)_and_(max-width:930px)]:flex-col">
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
  );
};
