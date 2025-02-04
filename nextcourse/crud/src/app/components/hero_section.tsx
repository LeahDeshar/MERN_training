"use client";
import { PrimaryButton } from "./Button";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const socialLinks = [
    {
      platform: "LINKEDIN",
      url: "https://www.linkedin.com/company/danphelink",
    },
    {
      platform: "INSTAGRAM",
      url: "https://www.instagram.com/danphelink",
    },
    {
      platform: "TWITTER",
      url: "https://twitter.com/danphelink",
    },
    {
      platform: "FACEBOOK",
      url: "https://www.facebook.com/danphelink",
    },
    {
      platform: "YOUTUBE",
      url: "https://www.youtube.com/@Danphelink-o7s",
    },
  ];

  return (
    <motion.div
      className="h-full my-auto w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-8 md:gap-12 px-7 lg:px-[80px] xl:px-[100px]  md:px-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col gap-6 md:gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col gap-3"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="flex items-center gap-4 md:gap-[21px]">
            <span className="text-gray-300 text-base md:text-sm font-semibold font-['Inter']">
              WORKPLACE
            </span>
            <div className="w-[60px] md:w-[120px] h-px bg-gray-300"></div>
          </div>

          <h1 className="text-[#fbfafd] text-3xl md:text-[42px] font-bold font-['Inter'] leading-tight">
            Unleash Global Potential with Cutting-Edge IT Solutions
          </h1>

          <p className="text-[#fbfafd] text-base md:text-[18px] font-normal font-['Roboto'] leading-relaxed">
            Empowering innovation through cutting-edge software solutions. At{" "}
            <span className="text-[#f8a953] font-semibold">DanpheLink</span>, we
            transform ideas into reality with scalable, secure, and user-centric
            technologies tailored to your business needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <PrimaryButton title={"Get Started"} link="contact" />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-5 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        {socialLinks.map(({ platform, url }) => (
          <Link
            href={url}
            key={platform}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              className="text-gray-300 text-sm md:text-base font-normal font-['Roboto'] cursor-pointer"
              whileHover={{ scale: 1.1, color: "#f26023" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {platform}
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <div className="h-[1px] bg-[#D1D5DB] px-7 block sm:hidden"></div>
    </motion.div>
  );
};

export default Hero;
