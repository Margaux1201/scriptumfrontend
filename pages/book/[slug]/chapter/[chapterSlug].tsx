import { useRouter } from "next/router";
import styles from "../../../../styles/Chapter.module.css";
import Header from "../../../../components/Header";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const ChapterDetail = () => {
  const router = useRouter();
  const { slug, chapterSlug } = router.query;

  interface Chapter {
    book: string;
    book_title: string;
    chapter_number: number | null;
    content: string;
    id: number;
    slug: string;
    sort_order: number;
    title: string | null;
    type: string;
  }

  // Etats pour stocker les données du chapitre
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [chapterType, setChapterType] = useState<string>("");
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);
  const [chapterContent, setChapterContent] = useState<string>("");
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);

  // Etats pour stocker les données du livre
  const [bookImage, setBookImage] = useState<string>("");
  const [isSaga, setIsSaga] = useState<boolean>(false);
  const [sagaName, setSagaName] = useState<string | null>("");
  const [tomeNumber, setTomeNumber] = useState<number | null>(null);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");

  useEffect(() => {
    if (!slug || !chapterSlug) return;

    // DETAILS DU CHAPITRE
    fetch(`http://127.0.0.1:8000/api/${slug}/getchapterinfo/${chapterSlug}/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("CHAPITRE DETAIL: 📜📜📜", data);
            setChapterTitle(data.title);
            setChapterType(data.type);
            setChapterNumber(data.chapter_number);
            setChapterContent(data.content);
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la récupération du chapitre:", error);
        alert("Une erreur réseau est survenue");
      });

    // LIVRE CONTENANT LE CHAPITRE
    fetch(`http://127.0.0.1:8000/api/getbookinfo/${slug}/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("LIVRE DU CHAPITRE: 📚📚📚", data);
            setBookImage(data.image);
            setIsSaga(data.is_saga);
            setSagaName(data.tome_name);
            setTomeNumber(data.tome_number);
            setBookTitle(data.title);
            setBookAuthor(data.author_name);
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la récupération du livre:", error);
        alert("Une erreur réseau est survenue");
      });

    fetch(`http://127.0.0.1:8000/api/${slug}/getallchapters/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("TOUS LES CHAPITRES DU LIVRE: 📖📖📖", data.results);
            setChaptersList(data.results);
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la récupération des chapitres:", error);
        alert("Une erreur réseau est survenue");
      });
  }, []);

  const handleBookClick = (): void => {
    router.push(`/book/${slug}`);
  };

  // fonction pour naviguer vers la page chapitre cliqué
  const handleChapterClick = (str: string): void => {
    router.push(`/book/${slug}/chapter/${str}`);
  };

  // Liste des boutons de chapitre
  const chapters = chaptersList.map((oneChapter, i) => (
    <button
      key={i}
      className={styles.chapterButton}
      onClick={() => handleChapterClick(oneChapter.slug)}
    >
      {oneChapter.type[0].toUpperCase()}
      {oneChapter.type.slice(1)} {oneChapter.chapter_number}
    </button>
  ));

  return (
    <div className={styles.global}>
      <Header />
      <div className={styles.main}>
        <div className={styles.chapterPart}>
          {!chapterTitle ? (
            <h1>
              {chapterType && chapterType[0].toUpperCase()}
              {chapterType.slice(1)} {chapterNumber}
            </h1>
          ) : (
            <h1>{chapterTitle}</h1>
          )}
          <div className={styles.chapterLine}></div>
          <p
            className={styles.contentChapter}
            style={{ whiteSpace: "pre-line" }}
          >
            {chapterContent}
          </p>
        </div>
        <div className={styles.rightPart}>
          <Image src={bookImage} width={200} height={300} alt={bookTitle} />
          <div className={styles.text}>
            {isSaga && (
              <h2 className={styles.bookSaga}>
                {sagaName} - Tome {tomeNumber}
              </h2>
            )}
            <h2 className={styles.bookTitle}>{bookTitle}</h2>
            <h3 className={styles.bookAuthor}>{bookAuthor}</h3>
          </div>
          <button className={styles.navBtn} onClick={handleBookClick}>
            Voir le détail du livre
          </button>
          <button className={styles.navBtn}>Découvrir l'univers</button>
          <div className={styles.chapterGlobal}>{chapters}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
