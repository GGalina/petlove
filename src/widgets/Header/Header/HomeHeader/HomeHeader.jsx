import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import HomeLogo from "@/shared/components/Logo/HomeLogo/HomeLogo";
import HomeNav from "../../Nav/HomeNav/HomeNav";
import HomeAuthNav from "../../AuthNav/HomeAuthNav/HomeAuthNav";
import styles from "./HomeHeader.module.scss";

export default function HomeHeader() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleLinkClick = () => {
    setBurgerOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <HomeLogo />
        </div>

        {/* Desktop nav */}
        <nav className={styles.header__nav}>
          <HomeNav onLinkClick={handleLinkClick} />
        </nav>

        <div className={styles.header__right}>
          {/* Tablet + Desktop */}
          <div className={styles.header__userNav}>
            <HomeAuthNav onLinkClick={handleLinkClick} />
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

      {/* Mobile menu */}
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
              <RxCross2 size={24} color="black" />
            </button>

            {/* Center navigation */}
            <div className={styles.header__mobileCenter}>
              <HomeNav onLinkClick={handleLinkClick} />
            </div>

            {/* Bottom user links */}
            <div className={styles.header__mobileBottom}>
              <HomeAuthNav onLinkClick={handleLinkClick} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}