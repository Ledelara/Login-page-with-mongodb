import HomePage from "@/pages/home";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePage />
      </main>
    </div>
  );
}
