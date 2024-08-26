import Link from "next/link";
import imgLogo from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-bg";
import { usePathname } from "next/navigation";
import Navlink from "./nav-link";
export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={imgLogo} alt="logo" width={200} height={100} priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Navlink href={"/meals"}>Browse Meals</Navlink>
            </li>
            <li>
              <Navlink href={"/community"}>Foodies Community</Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
