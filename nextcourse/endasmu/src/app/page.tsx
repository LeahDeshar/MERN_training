"use client";

import { GlassContent } from "@/components/default/home/GlassContent";
import { MainBody } from "@/components/default/home/MainBody";
import { ProfileCard } from "@/components/default/home/ProfileCard";
import { Subscribe } from "@/components/default/home/Subscribe";
import { ToplistArtist } from "@/components/default/home/ToplistArtist";
import { Footer } from "@/components/layout/Footer";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div className="relative  flex flex-col justify-center text-white overflow-hidden px-4 sm:px-6 lg:px-18 py-14   ">
      {/* <Header /> */}
      <MainBody />
      <div className="absolute left-0 top-0 w-[800px] h-[500px] -z-40">
        <Image
          src="/hero/hero.svg"
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
        />
      </div>
      <GlassContent />
      <ToplistArtist />

      <Subscribe />
      <Footer />
    </div>
  );
}
