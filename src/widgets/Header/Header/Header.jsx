import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Logo from "@/shared/components/Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import styles from "./Header.module.scss";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleLinkClick = () => {
    setBurgerOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav className={styles.header__nav}>
          <Nav />
        </nav>

        <div className={styles.header__right}>
          {/* Tablet + Desktop */}
          <div className={styles.header__userNav}>
            <AuthNav onLinkClick={handleLinkClick}/>
          </div>

          {/* Mobile + Tablet */}
          <button
            className={styles.header__burger}
            onClick={() => setBurgerOpen(!burgerOpen)}
          >
            <RxHamburgerMenu size={32} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {burgerOpen && (
        <div
          className={styles.header__backdrop}
          onClick={() => setBurgerOpen(false)}
        >
          <div
            className={styles.header__mobileNav}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.header__close}
              onClick={() => setBurgerOpen(false)}
            >
              <RxCross2 size={24} color="white"/>
            </button>

            {/* Center */}
            <div className={styles.header__mobileCenter}>
              <Nav onLinkClick={handleLinkClick} />
            </div>

            {/* Bottom */}
            <div className={styles.header__mobileBottom}>
              <AuthNav onLinkClick={handleLinkClick} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};