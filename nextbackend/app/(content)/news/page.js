// "use client";
// import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
// import { useEffect, useState } from "react";

// client side data fetching example
// export default function NewsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const [news, setNews] = useState();

//   useEffect(() => {
//     async function fetchNews() {
//       setIsLoading(true);
//       try {
//         const response = await fetch("http://localhost:8080/news");
//         if (!response.ok) {
//           throw new Error("Something went wrong");
//         }
//         const data = await response.json();
//         console.log(data);
//         setNews(data);
//       } catch (error) {
//         setError(error.message);
//       }
//       setIsLoading(false);
//     }

//     fetchNews();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }
//   if (error) {
//     return <p>{error}</p>;
//   }

//   let newsContent;
//   if (news) {
//     newsContent = <NewsList news={news} />;
//   }

//   return (
//     <>
//       <h1>News Page</h1>
//       {/* <NewsList news={DUMMY_NEWS} /> */}
//       {newsContent}
//     </>
//   );
// }

// server side data fetching example
// export default async function NewsPage() {
//   const response = await fetch("http://localhost:8080/news");
//   if (!response.ok) {
//     throw new Error("Something went wrong");
//   }
//   const news = await response.json();

//   return (
//     <>
//       <h1>News Page</h1>
//       <NewsList news={news} />;
//     </>
//   );
// }

export default async function NewsPage() {
  const news = getAllNews();
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />;
    </>
  );
}
