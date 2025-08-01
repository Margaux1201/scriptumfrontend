import styles from "../styles/Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">SCRIPTUM</Link>
        <div>
          <Link href="/browse">Parcourir 🔍</Link>
          <button>Ma Bibliothèque</button>
        </div>
      </header>
    </>
  );
}

export default Header;
