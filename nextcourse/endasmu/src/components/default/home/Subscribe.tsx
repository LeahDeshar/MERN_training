import Image from "next/image";

export const Subscribe = () => {
  return (
    <section className="relative px-4 lg:px-28 gap-20 py-24 min-w-[25rem] ">
      <div className="text-white text-5xl lg:text-7xl  pt-14 pb-8">
        <h1 className="my-5">Subscribe to Get Fresh </h1>
        <h1 className="my-5">News Update About </h1>
        <h1 className="my-5">NFTs.</h1>
      </div>

      <button className="rounded-full lg:w-auto w-[23rem] px-6 py-2 mt-5 bg-gradient-to-br from-[#36b3c9] via-[#2a8c9d] via-30% to-[#32ad5e] text-black text-lg">
        Subscribe
      </button>

      <div className="absolute top-0 -left-72 w-[800px] h-[800px] -z-40">
        <Image
          src="/hero/hero_3.svg"
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
        />
      </div>
    </section>
  );
};
