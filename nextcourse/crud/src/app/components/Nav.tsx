import Image from "next/image";
import React from "react";

export default function Nav() {
  return (
    <div className="w-full flex flex-wrap justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/CorporateLogoWhite.png"
          alt="Company Logo"
          width={200}
          height={50}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      <nav className="md:flex p-2 md:p-5 rounded-[32px] flex gap-4 md:gap-8 lg:gap-16">
        {["About Us", "Services", "Teams", "Blogs", "Contact"].map((item) => (
          <div
            key={item}
            className="text-gray-300 text-sm md:text-base font-medium font-['Roboto']"
          >
            {item}
          </div>
        ))}
      </nav>

      <button className="hidden md:flex px-4 py-2 md:px-6 md:py-3 bg-[#0a3851] rounded-[32px] border border-gray-300 items-center justify-center gap-1">
        <span className="text-gray-300 text-sm md:text-base font-medium font-['Inter']">
          View Academy
        </span>
        <div className="w-5 h-5">
          <Image
            src="/arrow.svg"
            alt="Icon Description"
            width={24}
            height={24}
          />
        </div>
      </button>
    </div>
  );
}
