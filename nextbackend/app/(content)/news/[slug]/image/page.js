import { notFound } from "next/navigation";

// import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/lib/news";

export default async function ImagePage({ params }) {
  const newsItemSlug = params.slug;
  // const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsItemSlug);
  const newsItem = await getNewsItem(newsItemSlug);
  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
