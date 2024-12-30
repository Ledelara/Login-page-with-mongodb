import { AuthProvider } from "@/context/AuthContext.";
import styles from "./page.module.css";
import Router from "@/routes/Router";

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
