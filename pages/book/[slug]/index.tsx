import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Book.module.css";
import Header from "../../../components/Header";
import Review from "../../../components/Review";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  interface Warning {
    categorie: string;
    tags: string[];
  }

  interface Book {
    id: number;
    title: string;
    releaseDate: string;
    author: string;
    url: string;
    description: string;
    publicType: string;
    genres: string[];
    themes: string[];
    state: string;
    isSaga: boolean;
    tomeName: string;
    tomeNumber: number;
    rating: number;
    slug: string;
    warning: Warning[];
  }

  const bookEnDure: Book = {
    id: 47,
    title: "Les Sérums du Chaos",
    releaseDate: "2025-08-08",
    author: "Emily Ivessons",
    url: "/assets/images/Evolved_Les_sérums_du_chaos.png",
    description: `Dix ans après la Grande Pandémie qui a ravagé le monde, les survivants se sont reconstruits malgré l'invasion des morts. Mike et Caleb, deux amis liés par les épreuves de cette sombre décennie, prospèrent dans la ville de Mojave où ils ont trouvé refuge avec leur groupe. Pourtant, ils devront affronter une nouvelle menace quand un soldat russe aux capacités surhumaines s'invite sur leur territoire avec d'étranges sérums qui chambouleront leur vie, ainsi que leur ADN.

    Pourquoi cibler leur camp ? Que cherche cet homme en transformant des innocents en êtres contre-nature ? Qu'a le sérum Amarok de si spécial pour susciter autant de convoitise ? Une chose est certaine : la lutte pour la survie est engagée contre ces forces émergentes aussi puissantes qu'impitoyables.`,
    publicType: "Adulte",
    genres: ["Science Fantasy", "Dystopie", "Thriller"],
    themes: [
      "Post-Apocalypse",
      "Créature Fantastique",
      "Surnaturel",
      "Manipulation génétique",
      "Zombies",
      "Pandémie",
    ],
    state: "Terminé",
    isSaga: true,
    tomeName: "Evolved",
    tomeNumber: 1,
    rating: 3.4,
    slug: "Les-sérums-du-Chaos-Emily-Ivessons",
    warning: [
      {
        categorie: "🩸 Violence",
        tags: ["Violence graphique", "Meurtres ou assassinats"],
      },
      {
        categorie: "🧠 Santé mentale",
        tags: ["Anxiété", "Schizophrénie / hallucinations"],
      },
      {
        categorie: "💔 Thèmes émotionnels difficiles",
        tags: ["Perte d'un proche / deuil", "Traumatisme / PTSD"],
      },
      {
        categorie: "🐾 Autres avertissements",
        tags: [
          "Maltraitance animale",
          "Cannibalisme",
          "Gore / body horror",
          "Épidémie / pandémie",
          "Enlèvement",
        ],
      },
    ],
  };

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
    if (i < bookEnDure.rating - 1) {
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
  bookEnDure.state === "Terminé"
    ? (stateStyle = { color: "#107E7D" })
    : (stateStyle = { color: "#E28413" });

  // Création des tags genres
  const genres = [];
  for (let genre of bookEnDure.genres) {
    genres.push(<h5 className={styles.bookGenre}>{genre}</h5>);
  }

  // Création des tags themes
  const themes = [];
  for (let theme of bookEnDure.themes) {
    themes.push(<h5 className={styles.bookTheme}>{theme}</h5>);
  }

  // Liste des avertissements affichés
  const warnings = bookEnDure.warning.map((oneWarning, i) => (
    <div key={i}>
      <h4 className={styles.warningCategory}>{oneWarning.categorie}</h4>
      <div className={styles.warningLine}>
        {oneWarning.tags.map((oneTag, j) => (
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

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.gridContent}>
        <div className={styles.leftPart}>
          <Image
            src={bookEnDure.url}
            height={500}
            width={300}
            alt={bookEnDure.title}
          />
          <h4 className={styles.status}>
            Statut: <span style={stateStyle}>{bookEnDure.state}</span>
          </h4>
          <button className={styles.leftButton}>Découvrir l'univers</button>
          <button className={styles.leftButton}>Commencer la lecture</button>
          <button className={styles.leftButton}>Evaluer l'histoire</button>
          <div className={styles.chapterPart}>{chapters}</div>
        </div>
        <div className={styles.rightPart}>
          {bookEnDure.isSaga && (
            <h1 className={styles.sagaTitle}>
              {bookEnDure.tomeName} - Tome {bookEnDure.tomeNumber}
            </h1>
          )}
          <h1 className={styles.bookTitle}>{bookEnDure.title} </h1>
          <div className={styles.bookScore}>
            {stars}
            <p className={styles.bookRate}>{bookEnDure.rating} / 5</p>
          </div>
          <div className={styles.authorLine}>
            <h2 className={styles.bookAuthor}>{bookEnDure.author}</h2>
            <button className={styles.followBtn}>SUIVRE</button>
            <button className={styles.signalButton}>SIGNALER</button>
          </div>
          <div className={styles.genreLine}>{genres}</div>
          <h3 className={styles.sectionTitle}>Description</h3>
          <p className={styles.bookDescription}>{bookEnDure.description}</p>
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
