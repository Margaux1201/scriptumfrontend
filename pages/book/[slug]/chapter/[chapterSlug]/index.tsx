import { useRouter } from "next/router";
import styles from "../../../../../styles/Chapter.module.css";
import Header from "../../../../../components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";

const ChapterDetail = () => {
  const router = useRouter();
  const { slug, chapterSlug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

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
  const [chapterRead, setChapterRead] = useState<boolean>(false);
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);

  // Etats pour stocker les données du livre
  const [bookImage, setBookImage] = useState<string>("");
  const [isSaga, setIsSaga] = useState<boolean>(false);
  const [sagaName, setSagaName] = useState<string | null>("");
  const [tomeNumber, setTomeNumber] = useState<number | null>(null);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");

  // Etat pour vérifier si l'auteur du livre est l'utilisateur connecté
  const [isAuthorCurrentUser, setIsAuthorCurrentUser] =
    useState<boolean>(false);

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

    // TOUS LES CHAPITRES DU LIVRE
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
  }, [chapterSlug]);

  // Vérification si l'auteur du livre est l'utilisateur connecté
  useEffect(() => {
    if (!user.token || !bookAuthor) {
      setIsAuthorCurrentUser(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/getinfo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    }).then((response) =>
      response.json().then((dataAuth) => {
        if (response.ok) {
          console.log("🤦‍♀️🤦‍♀️🤦‍♀️", dataAuth);
          if (bookAuthor === dataAuth.author_name) {
            setIsAuthorCurrentUser(true);
          } else {
            setIsAuthorCurrentUser(false);
          }
        } else {
          setIsAuthorCurrentUser(false);
        }
      })
    );
  }, [bookAuthor, user.token]);

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

  const handleEditChapter = (): void => {
    router.push(`/book/${slug}/chapter/${chapterSlug}/editchapter`);
  };

  const handleDeleteChapter = (): void => {
    if (!isAuthorCurrentUser) {
      alert("Vous n'êtes pas autorisé à supprimer ce chapitre");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/${slug}/deletechapter/${chapterSlug}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => {
        if (res.status === 204) {
          alert("Le chapitre a bien été supprimé");
          router.push(`/book/${slug}`);
        } else {
          // S'il y a un body d'erreur, response.json()
          return res.json().then((data) => {
            console.error("Erreur suppression :", data);
            alert("Erreur lors de la suppression");
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppresion de compte :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  return (
    <div className={styles.global}>
      <Header />
      <div className={styles.main}>
        <div className={styles.leftPart}>
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
          {isAuthorCurrentUser && (
            <div className={styles.buttonContainer}>
              <button className={styles.navBtn} onClick={handleDeleteChapter}>
                Supprimer le chapitre
              </button>
              <button className={styles.navBtn} onClick={handleEditChapter}>
                Modifier le chapitre
              </button>
            </div>
          )}
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
          <button
            className={styles.navBtn}
            onClick={() => router.push(`/book/${slug}/bookuniverse`)}
          >
            Découvrir l'univers
          </button>
          <div className={styles.chapterGlobal}>{chapters}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
