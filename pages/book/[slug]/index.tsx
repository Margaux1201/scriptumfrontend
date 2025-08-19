import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Book.module.css";
import Header from "../../../components/Header";
import Review from "../../../components/Review";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";

const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  const [isAuthorCurrentUser, setIsAuthorCurrentUser] =
    useState<boolean>(false);
  const [bookIsSaga, setBookIsSaga] = useState<boolean>(false);
  const [bookSagaName, setBookSagaName] = useState<string | null>("");
  const [bookSagaNbre, setBookSagaNbre] = useState<number | null>(1);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookImage, setBookImage] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookDescription, setBookDescription] = useState<string>("");
  const [bookPublicType, setBookPublicType] = useState<string>("");
  const [bookRate, setBookRate] = useState<number>(0);
  const [bookState, setBookState] = useState<string>("");
  const [bookGenres, setBookGenres] = useState<string[]>([]);
  const [bookThemes, setBookThemes] = useState<string[]>([]);
  const [bookWarnings, setBookWarnings] = useState<Warning[]>([]);

  useEffect(() => {
    // attend que le slug existe avant de fetch
    if (!slug) return;

    fetch(`http://127.0.0.1:8000/api/getbookinfo/${slug}/`)
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            console.log(data);
            setBookImage(data.image);
            setBookRate(data.rating);
            setBookState(data.state);
            setBookGenres(data.genres);
            setBookThemes(data.themes);
            setBookWarnings(data.warnings);
            setBookIsSaga(data.is_saga);
            setBookSagaName(data.tome_name);
            setBookSagaNbre(data.tome_number);
            setBookTitle(data.title);
            setBookAuthor(data.author_name);
            setBookDescription(data.description);
            setBookPublicType(data.public_type);
          }
        })
      )
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données du roman :",
          error
        );
        alert("Une erreur réseau est survenue");
      });
  }, [slug]);

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

  console.log("TOKEN 🙌🙌🙌", user.token);
  console.log("🤔🤔🤔", isAuthorCurrentUser);

  interface Warning {
    categorie: string;
    tag: string[];
  }

  interface Chapter {
    title: string | null;
    type: string;
    chapterNumber: number | null;
    slug: string;
  }

  const chapterEnDure: Chapter[] = [
    {
      title: null,
      type: "Prologue",
      chapterNumber: null,
      slug: "Prologue",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 1,
      slug: "Chapitre-1",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 2,
      slug: "Chapitre-2",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 3,
      slug: "Chapitre-3",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 4,
      slug: "Chapitre-4",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 5,
      slug: "Chapitre-5",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 6,
      slug: "Chapitre-6",
    },
    {
      title: null,
      type: "Epilogue",
      chapterNumber: null,
      slug: "Epilogue",
    },
  ];

  interface Review {
    user: string;
    score: number;
    comment: string;
    publicationDate: string;
  }

  const reviewsEnDure: Review[] = [
    {
      user: "Coco l'asticot",
      score: 4,
      comment: "Pas mal du tout !",
      publicationDate: "2025-06-11T09:18:27",
    },
    {
      user: "Caleb B.",
      score: 1,
      comment:
        "Une vraie merde. Je n'ai jamais lu autant de connerie sur cette supposée fiction. Respectez les victimes, bordel !",
      publicationDate: "2025-06-27T15:20:00",
    },
    {
      user: "Mimi",
      score: 5,
      comment:
        "Incroyable ! J'ai été pris du début à la fin. Hâte de lire le tome 2.",
      publicationDate: "2025-07-17T11:08:48",
    },
    {
      user: "Iamabeautifullunicorn",
      score: 3,
      comment:
        "Plutôt cool ! Un peu déçu que les minorités ne soient pas beaucoup représentées, mais l'histoire était bien et les personanges attachants.😇",
      publicationDate: "2025-08-07T06:38:07",
    },
  ];

  // états
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Création des 5 étoiles de notation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < bookRate - 1) {
      // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
      style = { color: "#E28413" };
    }
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        style={style}
        className={styles.contentStar}
      />
    );
  }

  let stateStyle = {};
  bookState === "Terminé"
    ? (stateStyle = { color: "#107E7D" })
    : (stateStyle = { color: "#E28413" });

  // Création des tags genres
  const genres = [];
  for (let genre of bookGenres) {
    genres.push(<h5 className={styles.bookGenre}>{genre}</h5>);
  }

  // Création des tags themes
  const themes = [];
  for (let theme of bookThemes) {
    themes.push(<h5 className={styles.bookTheme}>{theme}</h5>);
  }

  console.log(bookWarnings);
  // Liste des avertissements affichés
  const warnings = bookWarnings.map((oneWarning, i) => (
    <div key={i}>
      <h4 className={styles.warningCategory}>{oneWarning.categorie}</h4>
      <div className={styles.warningLine}>
        {oneWarning.tag.map((oneTag, j) => (
          <h5 key={j} className={styles.warningTag}>
            {oneTag}
          </h5>
        ))}
      </div>
    </div>
  ));

  // fonction pour naviguer vers la page chapitre cliqué
  const handleChapterClick = (str: string): void => {
    router.push(`/book/${slug}/chapter/${str}`);
  };

  //  fonction pour afficher les avertissements
  const handleShowWarning = (): void => {
    setShowWarning(true);
  };

  // Liste des boutons de chapitre
  const chapters = chapterEnDure.map((oneChapter, i) => (
    <button
      key={i}
      className={styles.chapterButton}
      onClick={() => handleChapterClick(oneChapter.slug)}
    >
      {oneChapter.type} {oneChapter.chapterNumber}
    </button>
  ));

  // Liste des reviews
  const reviews = reviewsEnDure.map((e, i) => (
    <Review
      key={i}
      user={e.user}
      comment={e.comment}
      publicationDate={e.publicationDate}
      score={e.score}
    />
  ));

  const getBookPublicType = (type: string): string => {
    switch (type) {
      case "young_adult":
        return "Young Adult";
      case "adulte":
        return "Adulte";
      case "tout_public":
        return "Tout Public";
      default:
        return "Inconnu";
    }
  };

  const stateName = (state: string): string => {
    switch (state) {
      case "En cours":
        return "Terminé";
      case "Terminé":
        return "En cours";
      default:
        return "Inconnu";
    }
  };

  const handleEditBook = (): void => {
    router.push(`/book/${slug}/editbook`);
  };

  const handleChangeState = (): void => {
    const newState = bookState === "En cours" ? "Terminé" : "En cours";
    setBookState(newState);
    // Rajouter le fetch de modification de l'état du livre
    fetch(`http://127.0.0.1:8000/api/editbook/${slug}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: newState, token: user.token }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log(data);
          }
        })
      )
      // .then(async (res) => {
      //   const text = await res.text();
      //   console.log("Réponse brute :", text); // <== regarde ce qui est réellement renvoyé
      // })
      .catch((error) => {
        console.error("Erreur lors du changement d'état :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.gridContent}>
        <div className={styles.leftPart}>
          <div className={styles.imgContainer}>
            <Image
              src={bookImage}
              height={500}
              width={300}
              alt={bookTitle}
              style={{ objectFit: "fill" }}
            />
          </div>
          <h4 className={styles.public}>{getBookPublicType(bookPublicType)}</h4>
          <h4 className={styles.status}>
            Statut: <span style={stateStyle}>{bookState}</span>
          </h4>
          {isAuthorCurrentUser ? (
            <div className={styles.leftBtnContainer}>
              <button className={styles.leftButton}>Découvrir l'univers</button>
              <button className={styles.leftButton} onClick={handleEditBook}>
                Modifier la présentation
              </button>
              <button className={styles.leftButton} onClick={handleChangeState}>
                Activer le statut {stateName(bookState).toUpperCase()}
              </button>
            </div>
          ) : (
            <div className={styles.leftBtnContainer}>
              <button className={styles.leftButton}>Découvrir l'univers</button>
              <button className={styles.leftButton}>
                Commencer la lecture
              </button>
              <button className={styles.leftButton}>Evaluer l'histoire</button>
            </div>
          )}
          <div className={styles.chapterPart}>{chapters}</div>
          {isAuthorCurrentUser && (
            <button className={styles.addChapterButton}>
              + Ajouter un chapitre
            </button>
          )}
        </div>
        <div className={styles.rightPart}>
          {bookIsSaga && (
            <h1 className={styles.sagaTitle}>
              {bookSagaName} - Tome {bookSagaNbre}
            </h1>
          )}
          <h1 className={styles.bookTitle}>{bookTitle} </h1>
          <div className={styles.bookScore}>
            {stars}
            <p className={styles.bookRate}>{bookRate} / 5</p>
          </div>
          <div className={styles.authorLine}>
            <h2 className={styles.bookAuthor}>{bookAuthor}</h2>
            <button className={styles.followBtn}>SUIVRE</button>
            <button className={styles.signalButton}>SIGNALER</button>
          </div>
          <div className={styles.genreLine}>{genres}</div>
          <h3 className={styles.sectionTitle}>Description</h3>
          <p className={styles.bookDescription}>{bookDescription}</p>
          <h3 className={styles.sectionTitle}>Tags</h3>
          <div className={styles.themeLine}>{themes}</div>
          <h3 className={styles.sectionTitle}>Avertissement</h3>
          {showWarning ? (
            warnings
          ) : (
            <div className={styles.warningCnt}>
              <button onClick={handleShowWarning} className={styles.warningBtn}>
                Voir les avertissements de contenu
              </button>
            </div>
          )}
          <h3 className={styles.sectionTitle}>Evaluations</h3>
          {reviews}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
