import Link from "next/link";
import Head from "next/head";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "University App" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
        <h1>{title}</h1>
        <nav>
          <Link href="/">Home</Link> |<Link href="/favourites">Favourites</Link>
        </nav>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
