import styles from "../../../../../styles/Character.module.css";
import Header from "../../../../../components/Header";
import { useRouter } from "next/router";

const Character = () => {
  const router = useRouter();
  const { slug, characterSlug } = router.query;

  return (
    <div className={styles.global}>
      <Header />
      <main className={styles.main}>
        <button onClick={() => router.push(`/book/${slug}/bookuniverse`)}>
          Retour sur la découverte de l'univers
        </button>
      </main>
    </div>
  );
};

export default Character;
