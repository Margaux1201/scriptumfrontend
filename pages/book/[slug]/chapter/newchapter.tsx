import styles from "../../../../styles/NewChapter.module.css";
import Header from "../../../../components/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";

const NewChapter = () => {
  const router = useRouter();
  const { slug } = router.query;

  const user = useSelector((store: { user: UserState }) => store.user);

  // Etats pour les données du livre
  const [bookImage, setBookImage] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookIsSaga, setBookIsSaga] = useState<boolean>(false);
  const [sagaName, setSagaName] = useState<string>("");
  const [tomeNumber, setTomeNumber] = useState<number>(0);

  // Etats pour les données des chapitres
  const [chaptersList, setChaptersList] = useState<any[]>([]);
  const [chapterType, setChapterType] = useState<string>("");
  const [isNumberEditable, setIsNumberEditable] = useState<boolean>(true);
  const [chapterNumber, setChapterNumber] = useState<number>(0);
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [chapterContent, setChapterContent] = useState<string>("");

  useEffect(() => {
    if (!user.token) {
      router.push("/");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getbookinfo/${slug}/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log(data);
            setBookImage(data.image);
            setBookTitle(data.title);
            setBookAuthor(data.author_name);
            setBookIsSaga(data.is_saga);
            setSagaName(data.tome_name);
            setTomeNumber(data.tome_number);
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
  }, [user.token]);

  const handleChapterTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setChapterType(value);
    if (value === "prologue" || value === "epilogue") {
      setIsNumberEditable(false);
    } else {
      setIsNumberEditable(true);
    }
  };

  // Redirection vers la page du livre
  const handleBookClick = (): void => {
    router.push(`/book/${slug}`);
  };

  const handleCancel = (): void => {
    router.push(`/book/${slug}`);
    setChapterType("");
    setChapterNumber(1);
    setChapterTitle("");
    setChapterContent("");
  };

  const handlePublishChapter = (): void => {
    if (!chapterType || !chapterContent) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    } else if (chapterType === "chapitre" && chapterNumber < 1) {
      alert("Le numéro du chapitre doit être supérieur ou égal à 1.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/createchapter/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        book: slug,
        type: chapterType,
        chapter_number: chapterType === "chapitre" ? chapterNumber : null,
        title: chapterTitle,
        content: chapterContent,
      }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log(data);
            alert("Chapitre publié avec succès !");
            router.push(`/book/${slug}`);
          }
        })
      )
      // .then(async (res) => {
      //   const text = await res.text();
      //   console.log("Réponse brute :", text); // <== regarde ce qui est réellement renvoyé
      // })
      .catch((error) => {
        console.error("Erreur lors de la publication du chapitre :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  const deleteBook = (bookSlug: string): void => {
    bookSlug === slug && router.push("/");
  };

  return (
    <div className={styles.container}>
      <Header deleteBook={deleteBook} />
      <main className={styles.main}>
        <section className={styles.leftPart}>
          <h1 className={styles.title}>Nouveau Chapitre</h1>
          <div className={styles.formSection}>
            {/* TYPE DU CHAPITRE */}
            <div className={styles.chapterType}>
              <h4 className={styles.titleField}>Type * :</h4>
              <div className={styles.radioGroup}>
                <label htmlFor="type1" className={styles.label}>
                  <input
                    type="radio"
                    id="type1"
                    name="type"
                    value="prologue"
                    checked={chapterType === "prologue"}
                    onChange={handleChapterTypeChange}
                    className={styles.radioInput}
                  />
                  Prologue
                </label>
                <label htmlFor="type2" className={styles.label}>
                  <input
                    type="radio"
                    id="type2"
                    name="type"
                    value="chapitre"
                    checked={chapterType === "chapitre"}
                    onChange={handleChapterTypeChange}
                    className={styles.radioInput}
                  />
                  Chapitre
                </label>
                <label htmlFor="type3" className={styles.label}>
                  <input
                    type="radio"
                    id="type3"
                    name="type"
                    value="epilogue"
                    checked={chapterType === "epilogue"}
                    onChange={handleChapterTypeChange}
                    className={styles.radioInput}
                  />
                  Epilogue
                </label>
              </div>
            </div>
            {/* NUMERO DU CHAPITRE */}
            <div className={styles.chapterType}>
              <h4 className={styles.titleField}>Numéro :</h4>
              <input
                type="number"
                disabled={!isNumberEditable}
                min={0}
                value={chapterNumber}
                onChange={(e) => setChapterNumber(Number(e.target.value))}
                className={styles.numberInput}
              />
            </div>
            {/* TITRE DU CHAPITRE */}
            <div className={styles.chapterType}>
              <h4 className={styles.titleField}>Titre :</h4>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Titre du chapitre"
                className={styles.textInput}
              />
            </div>
            {/* CONTENU DU CHAPITRE */}
            <h4 className={styles.titleField}>Contenu * :</h4>
            <div className={styles.chapterContentContainer}>
              <textarea
                placeholder="Ecrivez votre histoire..."
                maxLength={50000}
                value={chapterContent}
                onChange={(e) => setChapterContent(e.target.value)}
                className={styles.chapterContent}
              ></textarea>
              <p className={styles.contentLimit}>
                {" "}
                {chapterContent.length}/50 000 caractères
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.buttonFull}
                onClick={handlePublishChapter}
              >
                Publier
              </button>
              <button className={styles.buttonEmpty} onClick={handleCancel}>
                Annuler
              </button>
            </div>
          </div>
        </section>
        <section className={styles.rightPart}>
          <Image src={bookImage} width={200} height={300} alt={bookTitle} />
          <div className={styles.text}>
            {bookIsSaga && (
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
          <div className={styles.chapterGlobal}>{chaptersList}</div>
        </section>
      </main>
    </div>
  );
};

export default NewChapter;
