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
import { Modal } from "antd";

const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  interface Review {
    book: string;
    book_title: string;
    comment: string;
    id: number;
    publication_date: string;
    score: number;
    user: number;
    user_pseudo: string;
  }

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
  const [bookReviewCount, setBookReviewCount] = useState<number>(0);
  const [bookReviewsList, setBookReviewsList] = useState<Review[]>([]);
  const [bookState, setBookState] = useState<string>("");
  const [bookGenres, setBookGenres] = useState<string[]>([]);
  const [bookThemes, setBookThemes] = useState<string[]>([]);
  const [bookWarnings, setBookWarnings] = useState<Warning[]>([]);

  // Etats pour la modale de review
  const [isModalReviewOpen, setIsModalReviewOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [refreshReviews, setRefreshReviews] = useState<boolean>(false);

  // Récupère les données du livre
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
  }, [slug, refreshReviews]);

  // Vérifie si l'auteur du livre est l'utilisateur connecté
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

  // Récupère les reviews du livre
  useEffect(() => {
    if (!slug) return;

    fetch(`http://127.0.0.1:8000/api/getallbookreviews/${slug}/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("REVIEW RECUE :❤️❤️❤️", data);
            setBookReviewCount(data.count);
            setBookReviewsList(data.results);
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la récupération des reviews : ", error);
      });
  }, [refreshReviews]);

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

  // états
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Création des 5 étoiles de notation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i <= bookRate - 1) {
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
  const reviews = bookReviewsList.map((e, i) => (
    <Review
      key={i}
      user={e.user_pseudo}
      comment={e.comment}
      publicationDate={e.publication_date}
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

  // Fonction pour naviguer vers la page de modification du livre
  const handleEditBook = (): void => {
    router.push(`/book/${slug}/editbook`);
  };

  // Fonction pour changer l'état du livre
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

  // Fonction pour ouvir la modale Review
  const openAddReview = (): void => {
    setIsModalReviewOpen(true);
  };

  // Fonction pour fermer la modale Review
  const handleCancelReview = (): void => {
    setIsModalReviewOpen(false);
    setScore(0);
    setComment("");
  };

  const handleStarClick = (index: number) => {
    setScore(index);
  };

  // Génération des étoiles de score
  const starScore = [];
  for (let i = 1; i <= 5; i++) {
    starScore.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        onClick={() => handleStarClick(i)}
        style={{ color: i <= score ? "#E28413" : "#0F0F0F" }}
        className={styles.scoreStar}
      />
    );
  }

  // fonction pour envoyer la review dans la bdd
  const handleRegisterReview = (): void => {
    if (score === 0 || comment.trim() === "") {
      alert("Veuillez sélectionner une note et écrire un commentaire.");
      return;
    } else if (!user.token) {
      alert("Vous devez être connecté pour laisser une évaluation.");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/getallbookreviews/${slug}/`).then(
      (response) =>
        response.json().then((data) => {
          if (response.ok) {
            for (let review of data.results) {
              if (user.pseudo === review.user_pseudo) {
                alert("Vous avez déjà évaluer ce livre !");
                return;
              }
            }
            fetch("http://127.0.0.1:8000/api/createreview/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                book: slug,
                token: user.token,
                score: score,
                comment: comment,
              }),
            })
              .then((response) =>
                response.json().then((data) => {
                  if (response.ok) {
                    alert("Votre évalutation a été envoyée avec succès !");
                    setScore(0);
                    setComment("");
                    setIsModalReviewOpen(false);

                    //Rafraichit la liste des reviews
                    setRefreshReviews((prev) => !prev);
                  }
                })
              )
              // .then(async (res) => {
              //   const text = await res.text();
              //   console.log("Réponse brute :", text); // <== regarde ce qui est réellement renvoyé
              // })
              .catch((error) => {
                console.error("Erreur lors de l'envoi de la review :", error);
                alert("Une erreur réseau est survenue");
              });
          }
        })
    );
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
              <button className={styles.leftButton} onClick={openAddReview}>
                Evaluer l'histoire
              </button>
            </div>
          )}
          <div className={styles.chapterPart}>{chapters}</div>
          {isAuthorCurrentUser && (
            <button
              className={styles.addChapterButton}
              onClick={() => router.push(`/book/${slug}/chapter/newchapter`)}
            >
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
            <p className={styles.bookRate}>( {bookReviewCount} avis)</p>
          </div>
          <div className={styles.authorLine}>
            <h2 className={styles.bookAuthor}>{bookAuthor}</h2>
            {!isAuthorCurrentUser && (
              <div className={styles.authorBtnContainer}>
                <button className={styles.followBtn}>SUIVRE</button>
                <button className={styles.signalButton}>SIGNALER</button>
              </div>
            )}
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
          {reviews.length > 0 ? (
            reviews
          ) : (
            <div className={styles.noReview}>
              <p className={styles.noReviewSentence}>
                Soyez le premier lecteur à évaluer ce livre !
              </p>
            </div>
          )}
        </div>

        {/* MODALE POUR ENVOYER UNE EVALUTATION */}
        <Modal closable={false} open={isModalReviewOpen} footer={null}>
          <div className={styles.modalReview}>
            <h2>Evaluer l'histoire et donner votre avis</h2>
            <div className={styles.scoreContainer}>{starScore}</div>
            <textarea
              name="Commentaire"
              id="Comment"
              placeholder="Laisser un commentaire..."
              maxLength={3000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentArea}
            ></textarea>
            <div className={styles.commentLength}>
              <p className={styles.limitCaract}>
                {" "}
                {comment.length} / 3000 caractères{" "}
              </p>
            </div>
            <div className={styles.modalBtn}>
              <button
                onClick={handleCancelReview}
                className={styles.modalButtonEmpty}
              >
                Annuler
              </button>
              <button
                className={styles.modalButtonFull}
                onClick={handleRegisterReview}
              >
                Envoyer
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookDetail;
