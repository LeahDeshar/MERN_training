"use client";
import type { PrimaryButtonProps } from "@/types/home.types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const PrimaryButton = ({
  title,
  isOutlined = false,
  link,
  onClick,
}: PrimaryButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // boolean check-----------------------------------
  const isLinkButton = Boolean(link);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5 },
  };

  const gradientVariants = {
    initial: { backgroundPosition: "0% 50%" },
    hover: { backgroundPosition: "100% 50%" },
  };

  const ButtonContent = () => (
    <>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0.8 : 1 }}
      >
        {title}
      </motion.span>
      <motion.div
        className="w-5 h-5"
        variants={arrowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </>
  );

  const buttonStyles = `
    px-7 py-2 rounded-[32px] text-base font-medium font-['Inter'] 
    inline-flex justify-center items-center gap-2 relative overflow-hidden
    ${
      isOutlined
        ? "border  text-[#8ca6db] hover:text-[#f05b1d] hover:border-[#f05b1d]"
        : "text-[#fbfafd]"
    }
  `;

  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      className={buttonStyles}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {!isOutlined && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r  from-[#f8a953] to-[#f05b1d]"
          variants={gradientVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}
      <motion.div className="relative z-10 flex items-center gap-2">
        {children}
      </motion.div>
    </motion.div>
  );

  return isLinkButton ? (
    <Link href={`/${link}`} passHref>
      <ButtonWrapper>
        <ButtonContent />
      </ButtonWrapper>
    </Link>
  ) : (
    <button onClick={onClick}>
      <ButtonWrapper>
        <ButtonContent />
      </ButtonWrapper>
    </button>
  );
};
