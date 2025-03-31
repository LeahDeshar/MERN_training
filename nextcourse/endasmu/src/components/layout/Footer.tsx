import Image from "next/image";

export const Footer = () => {
  return (
    <footer className=" w-full overflow-hidden text-white py-12 px-6 lg:px-28 min-w-[26rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 ">
        <div className="lg:col-span-2">
          <h1 className="text-3xl lg:text-2xl font-bold mb-4">Endasmu</h1>
          <p className="text-gray-400 text-lg lg:text-sm">
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

        <div className="justify-self-start lg:justify-self-end">
          <h1 className="text-2xl lg:text-xl lg:mt-0 mt-8 font-semibold mb-4">
            Explore
          </h1>
          {["Art", "Collections", "Domain Name", "Utility"].map(
            (item, index) => (
              <p
                key={index}
                className="text-gray-400 text-lg lg:text-sm mb-2 hover:text-white"
              >
                {item}
              </p>
            )
          )}
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <h1 className="text-2xl lg:text-xl lg:mt-0 mt-8 font-semibold mb-4">
            Statistic
          </h1>
          {["Ranking", "Activity"].map((item, index) => (
            <p
              key={index}
              className="text-gray-400 text-lg lg:text-sm mb-2 hover:text-white"
            >
              {item}
            </p>
          ))}
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <h1 className="text-2xl lg:text-xl lg:mt-0 mt-8 font-semibold mb-4">
            Resource
          </h1>
          {["Help Center", "Platform Status", "Partners", "Blog", "Faq"].map(
            (item, index) => (
              <p
                key={index}
                className="text-gray-400 text-lg lg:text-sm mb-2 hover:text-white"
              >
                {item}
              </p>
            )
          )}
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <h1 className="text-2xl lg:text-xl lg:mt-0 mt-8 font-semibold mb-4">
            Company
          </h1>
          {["About us", "Career", "Support"].map((item, index) => (
            <p
              key={index}
              className="text-gray-400 text-lg lg:text-sm mb-2 hover:text-white"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="absolute lg:bottom-10 bottom-150 md:bottom-30 sm:bottom-150 opacity-70 -right-56 w-[500px] h-[500px] -z-40">
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
