import Image from "next/image";
import React, { Suspense } from "react";

const collectionCarousel = [
  {
    title: "Taproot Wozards",
    tag: "BTC",
    caption: "What's new",
    desc: "2121 Taproot Wizards were inscribed in early 2023 and took the ordinals world by storm. It's time to Make Bitcoin Magical Again.",
    images: "/collection/carousel/img_1.webp",
  },
  {
    title: "The Equinals Horses: Genesis Batch by Bitcoin Derby",
    tag: "BTC",
    desc: "The Equinals Horses: Genesis Batch by Bitcoin Derby is a collection of 10,000 unique NFTs that are generated from over 100 traits. ",
    caption: "launchpad",
    images: "/collection/carousel/img_2.webp",
  },
  {
    title: "Quantum Cats",
    tag: "BTC",
    caption: "hot collection",
    desc: "Quantum Cats is a collection of 10,000 unique NFTs that are generated from over 100 traits. ",
    images: "/collection/carousel/img_3.webp",
  },
  {
    title: "Ordinal Maxi Biz",
    tag: "BTC",
    caption: "hot collection",
    desc: "Ordinal Maxi Biz is a collection of 10,000 unique NFTs that are generated from over 100 traits. ",
    images: "/collection/carousel/img_4.webp",
  },
  {
    title: "Taproot Wozards",
    tag: "BTC",
    caption: "What's new",
    images: "/collection/carousel/img_1.webp",
  },
  {
    title: "Taproot Wozards",
    tag: "BTC",
    caption: "What's new",
    images: "/collection/carousel/img_1.webp",
  },
];
function CollectionIndex() {
  return (
    <div>
      <div
        id="animation-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {collectionCarousel.map((item, index) => (
            <div
              key={index}
              className={`hidden duration-200 ease-linear ${
                index === 0 ? "block" : ""
              }`}
              data-carousel-item={index === 0 ? "active" : ""}
            >
              <Image
                src={item.images}
                // className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={item.title}
                width={500}
                height={300}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white p-4 rounded-lg">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
                <span className="text-xs uppercase">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default CollectionIndex;

async function CollectionIndexComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <p>✅ Data Loaded from Server!</p>;
}

const LoadingComponent = () => <p>Loading...</p>;
