// import Link from "next/link";

// import NewsList from "@/components/news-list";
// import {
//   getAvailableNewsMonths,
//   getAvailableNewsYears,
//   getNewsForYear,
//   getNewsForYearAndMonth,
// } from "@/lib/news";
// import { Suspense } from "react";

// async function FilteredNews({ year, month }) {
//   let news;

//   if (year && !month) {
//     news = await getNewsForYear(year);
//   } else if (year && month) {
//     news = await getNewsForYearAndMonth(year, month);
//   }
//   let newsContent = <p>No news found for the selected period.</p>;

//   if (news && news.length > 0) {
//     newsContent = <NewsList news={news} />;
//   }
//   return newsContent;
// }

// export default async function FilteredNewsPage({ params }) {
//   const filter = params.filter;

//   const selectedYear = filter?.[0];
//   const selectedMonth = filter?.[1];

//   // let news;
//   const availYears = await getAvailableNewsYears();
//   let links = availYears;

//   if (selectedYear && !selectedMonth) {
//     // news = getNewsForYear(selectedYear);
//     links = getAvailableNewsMonths(selectedYear);
//   }

//   if (selectedYear && selectedMonth) {
//     // news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
//     links = [];
//   }
//   console.log("Selected Year:", selectedYear);
//   console.log("Selected Month:", selectedMonth);
//   console.log("Available Years:", availYears);

//   //  const availYears = await getAvailableNewsYears()
//   if (
//     (selectedYear && !availYears.includes(selectedYear)) ||
//     (selectedMonth &&
//       !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
//   ) {
//     throw new Error("Invalid filter.");
//   }

//   return (
//     <>
//       <header id="archive-header">
//         <nav>
//           <ul>
//             {links.map((link) => {
//               const href = selectedYear
//                 ? `/archive/${selectedYear}/${link}`
//                 : `/archive/${link}`;

//               return (
//                 <li key={link}>
//                   <Link href={href}>{link}</Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </header>
//       {/* {newsContent} */}
//       <Suspense
//         fallback={
//           <div>
//             <p>Loading news...</p>
//           </div>
//         }
//       >
//         <FilteredNews year={selectedYear} month={selectedMonth} />
//       </Suspense>
//     </>
//   );
// }
import Link from "next/link";
import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { Suspense } from "react";

// Server Component for Fetching and Rendering News
async function FilteredNews({ year, month }) {
  let news = [];

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  if (!news || news.length === 0) {
    return <p>No news found for the selected period.</p>;
  }

  return <NewsList news={news} />;
}

// Main Page Component
export default async function FilteredNewsPage({ params }) {
  const filter = params.filter || [];
  const selectedYear = filter[0] ? parseInt(filter[0]) : null;
  const selectedMonth = filter[1] ? parseInt(filter[1]) : null;

  const availYears = await getAvailableNewsYears();
  let links = availYears;

  // Fetch months if a valid year is selected
  if (selectedYear && availYears.includes(selectedYear)) {
    links = await getAvailableNewsMonths(selectedYear);
  }

  // Validate filters
  if (
    (selectedYear && !availYears.includes(selectedYear)) ||
    (selectedMonth &&
      !(await getAvailableNewsMonths(selectedYear)).includes(selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <Suspense
        fallback={
          <div>
            <p>Loading news...</p>
          </div>
        }
      >
        {/* Use FilteredNews as a server component */}
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
