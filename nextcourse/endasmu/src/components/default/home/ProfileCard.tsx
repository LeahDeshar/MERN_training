import Image from "next/image";

export const ProfileCard = () => {
  return (
    <div className="relative bg-[#000] text-white rounded-4xl h-96 [@media_(min-width:679px)_and_(max-width:930px)]:h-56 lg:h-80 w-full sm:w-72 lg:w-64 flex flex-col items-center justify-between shadow-[inset_4px_4px_8px_rgba(255,255,255,0.25),_inset_-4px_-4px_8px_rgba(0,0,0,0.6)] transition-all duration-300 lg:mt-0 [@media_(min-width:679px)_and_(max-width:930px)]:mt-10 mt-16 ">
      <div className="absolute -top-6 w-20 h-20  lg:w-16 lg:h-16 sm:w-20 sm:h-20 rounded-full shadow-md shadow-white/50 overflow-hidden [@media_(min-width:679px)_and_(max-width:930px)]:w-16 [@media_(min-width:679px)_and_(max-width:930px)]:h-16">
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
        <h2 className="text-lg sm:text-xl [@media_(min-width:679px)_and_(max-width:930px)]:text-md font-semibold mt-2">
          Johnny Five
        </h2>
        <p className="text-lg lg:text-sm [@media_(min-width:679px)_and_(max-width:930px)]:text-sm sm:text-base text-gray-300 mt-1 px-2 sm:px-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
          ut.
        </p>
      </div>

      <div className="w-[90%] h-32 lg:h-28 sm:h-32 rounded-4xl relative overflow-hidden [@media_(min-width:679px)_and_(max-width:930px)]:mt-0  [@media_(min-width:679px)_and_(max-width:930px)]:h-16 mt-4">
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
