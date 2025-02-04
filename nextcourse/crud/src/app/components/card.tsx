"use client";
import { CommitedCardProps, ServiceCardProps } from "@/types/home.types";
import Image from "next/image";
import { PrimaryButton } from "./Button";
import CreativeVector from "@/components/services/style/icons/CreativeVector";
import { truncateText } from "@/utils/helper";

export const ServiceCard = ({
  title,
  description,
  image,
  link,
}: ServiceCardProps) => (
  <div className=" p-3 rounded-[32px] border border-[#8ca6db] flex-col justify-center items-center gap-2 inline-flex min-h-[400px] ">
    <div className=" flex-col justify-center items-center gap-3 flex">
      <Image src={image} alt="Icon Description" width={130} height={130} />
      <div className="flex-col justify-start items-start gap-4 flex pb-2">
        <div className="self-stretch text-center text-[#fbfafd] text-xl font-bold font-['Inter']">
          {title}
        </div>
        <div className="self-stretch text-center text-gray-400 text-[13px] font-normal font-['Roboto'] leading-relaxed">
          {description}
        </div>
      </div>
      <PrimaryButton title="Learn More" isOutlined={true} link={link} />
    </div>
  </div>
);

export const CommitedCard = ({
  title,
  content,
  image,
  isServicePage = false,
  bgColor,
  borderColor,
  theme,
}: CommitedCardProps) => {
  return isServicePage ? (
    <div className="relative w-full max-w-md ">
      <div
        className={`px-6  pb-6 top-[30px]  rounded-3xl  flex flex-col ${
          theme === "dark"
            ? "pt-12 justify-center items-center bg-[#0b2332] shadow-[inset_4px_4px_48px_0px_rgba(140,166,219,0.12)] hover-border  transition-all duration-300 hover:shadow-lg gap-3"
            : "pt-10 bg-white  shadow-[0px_0px_20px_rgba(140,166,219,0.4)] hover:bg-[#160D75] group transition-all duration-300 "
        } w-full min-h-[270px] 
      
        `}
      >
        {theme === "light" ? (
          <div>
            <div
              className={`h-[60px] w-[60px] p-3.5    rounded-[32px] shadow-[4px_4px_32px_0px_rgba(140,166,219,0.24)]  pb-8 `}
              style={{ background: bgColor }}
            >
              <Image
                src={image}
                alt="Icon Description"
                width={32}
                height={32}
              />
            </div>
            <div
              className={`self-stretch ${
                theme === "light"
                  ? "py-3 text-left text-[#164763] group-hover:text-white"
                  : "text-[#fbfafd] text-center"
              }  text-lg font-bold font-['Roboto']`}
            >
              {title}
            </div>
          </div>
        ) : (
          <div
            className={`self-stretch text-center 
            } text-[#fbfafd]  text-lg font-bold font-['Roboto']`}
          >
            {title}
          </div>
        )}

        <div
          className={`  text-[#948e9f] group-hover:text-[#e6e0ef] text-base font-normal font-['Roboto'] leading-relaxed  text-justify ${
            theme === "light" ? "text-left" : "text-center mx-3"
          }`}
          style={{
            wordSpacing: "-2px",
          }}
        >
          {truncateText(content, 20)}
        </div>
      </div>

      {theme === "dark" ? (
        <div
          className={`h-[60px] p-3.5 left-1/2 -translate-x-1/2 -top-8 absolute   rounded-[32px] shadow-[4px_4px_32px_0px_rgba(140,166,219,0.24)] flex justify-center items-center `}
          style={{ background: bgColor }}
        >
          <Image src={image} alt="Icon Description" width={32} height={32} />
        </div>
      ) : null}

      <style jsx>{`
        .hover-border {
          border-width: 2;
          border-color: transparent;
          border-style: solid;
        }
        .hover-border:hover {
          border-color: ${borderColor} !important;
          border-width: 2px;
        }
      `}</style>
    </div>
  ) : (
    <div className="flex flex-col justify-start items-center gap-4 px-2 py-6 hover:shadow-[inset_4px_4px_48px_0px_rgba(140,166,219,0.12)] hover:-translate-y-2 rounded-[24px] transition-all duration-300 ease-in-out group">
      <div className="w-[90px] h-[90px] bg-[#546975] rounded-full flex justify-center items-center group-hover:bg-[#6f8d9c]">
        <div className="w-[70px] h-[70px] bg-gradient-to-tl from-[#04151f] to-[#0d3a53] rounded-full flex justify-center items-center">
          <Image src={image} alt="Icon Description" width={35} height={35} />
        </div>
      </div>
      <div className="self-stretch text-center text-[#fbfafd] text-xl font-bold font-['Inter']">
        {title}
      </div>
      <div className="self-stretch text-center text-gray-400 text-[16px] font-normal font-['Roboto'] leading-relaxed">
        {truncateText(content, 30)}
      </div>
    </div>
  );
};
interface CreativeCardProps {
  title: string;
  content: string;
  image: string | null;
  onClick: () => void;
}

export const CreativeCard = ({
  title,
  content,
  image = null,
  onClick,
}: CreativeCardProps) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full max-w-md transition-transform duration-300 hover:scale-105"
    >
      <div
        className="px-6 pb-6 pt-10 shadow-[4px_4px_24px_0px_rgba(163,207,232,0.51)] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[60px] flex flex-col bg-white 
        group transition-all duration-500 ease-in-out w-full min-h-[270px] 
        hover:bg-gradient-to-br from-[#3eb0fd] to-[#3c2cf1] hover:shadow-2xl"
      >
        <div>
          <div className="relative w-[60px]">
            <CreativeVector color="#E0E7F5" width="65" height="65" />
            <div className="absolute bottom-1.5 right-1.5">
              <Image
                src={image || "/assets/images/services/creative/2d3d.svg"}
                alt="Icon"
                width={35}
                height={35}
              />
            </div>
          </div>

          <div
            className="py-3 text-left text-[#164763] text-lg font-bold font-['Roboto']  
            group-hover:text-white"
          >
            {title}
          </div>
        </div>

        <div
          className="text-base font-normal font-['Roboto'] leading-relaxed text-left text-gray-600 
           group-hover:text-gray-300"
          style={{ wordSpacing: "-2px" }}
        >
          {truncateText(content, 15)}
        </div>
      </div>
    </button>
  );
};

export const FeaturedCard = ({
  image,
  title,
  description,
}: ServiceCardProps) => (
  <div className=" p-4 rounded-3xl border border-[#8ca6db] flex flex-col justify-start items-start gap-4">
    <Image
      className=" h-[235px] 2xl:h-[280px] w-full rounded-2xl object-cover"
      src={image}
      alt={`${title} image`}
      width={400}
      height={235}
    />

    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#fbfafd] text-2xl font-bold font-['Inter']">
          {title}
        </h3>
        <p className="text-gray-400 text-base font-normal font-['Roboto'] leading-relaxed">
          {description}
        </p>
      </div>
      <div>
        <PrimaryButton title="Learn More" />
      </div>
    </div>
  </div>
);
