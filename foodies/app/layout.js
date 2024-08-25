import MainHeader from "@/components/main-header/main-header";
import "./globals.css";
import MainHeaderBackground from "@/components/main-header/main-header-bg";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="header-background"></main>
        {/* <MainHeaderBackground /> */}
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
