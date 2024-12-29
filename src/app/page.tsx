import Router from "@/routes/Router";
import styles from "./page.module.css";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <div className={styles.page}>
        <main className={styles.main}>
          <Router />
        </main>
      </div>
    </AuthProvider>
  );
}
