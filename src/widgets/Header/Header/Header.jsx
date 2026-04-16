import { useState } from "react";
import { useSelector } from "react-redux";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Logo from "@/shared/components/Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import styles from "./Header.module.scss";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const isAuth = Boolean(token);

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
          {/* Desktop auth area */}
          <div className={styles.header__userNav}>
            {isAuth ? (
              <UserNav user={user} onLinkClick={handleLinkClick} />
            ) : (
              <AuthNav onLinkClick={handleLinkClick} />
            )}
          </div>

          {/* Burger */}
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
              <RxCross2 size={24} color="white" />
            </button>

            <div className={styles.header__mobileCenter}>
              <Nav onLinkClick={handleLinkClick} />
            </div>

            <div className={styles.header__mobileBottom}>
              {isAuth ? (
                <UserNav user={user} onLinkClick={handleLinkClick} />
              ) : (
                <AuthNav onLinkClick={handleLinkClick} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}