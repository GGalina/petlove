import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Logo from "@/shared/components/Logo/Logo";
import Nav from "../Nav/Nav";
import UserNav from "../UserNav/UserNav";
import styles from "./Header.module.scss";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Logo />
      </div>

      <nav className={styles.header__nav}>
        <Nav />
      </nav>

      <div className={styles.header__right}>
        <UserNav />

        <button
          className={styles.header__burger}
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          <RxHamburgerMenu size={24} />
        </button>
      </div>

      
    </header>

    {/* Backdrop overlay */}
      {burgerOpen && (
        <div
          className={styles.header__backdrop}
          onClick={() => setBurgerOpen(false)}
        >
          <div
            className={styles.header__mobileNav}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside menu
          >
            <button
              className={styles.header__close}
              onClick={() => setBurgerOpen(false)}
            >
              <RxCross2 size={24} />
            </button>
            <Nav />
            <UserNav />
          </div>
        </div>
      )}
      </>
  );
}