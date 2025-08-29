import styles from "../../../styles/BookUniverse.module.css";
import Header from "../../../components/Header";
import CharacterCard from "../../../components/CharacterCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, UseSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import { useRouter } from "next/router";

const BookUniverse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  interface Character {
    name: string;
    slug: string;
    slogan: string;
    url: string;
    role: string;
  }

  const charactersList: Character[] = [
    {
      name: "Charlie Tennant",
      slug: "charlie-tennant",
      slogan: "Le bon camp est celui de notre propre Cause",
      url: "/assets/images/Charlie réaliste.png",
      role: "adversaire",
    },
    {
      name: "Kathleen Marks",
      slug: "kathleen-marks",
      slogan: "L'évolution est la seule issue pour vaincre la mort",
      url: "/assets/images/Kathleen réaliste.png",
      role: "antagoniste",
    },
    {
      name: "Michael Chase",
      slug: "michael-chase",
      slogan: "On survie pour notre famille et la famille permet notre survie",
      url: "/assets/images/Mike réaliste.png",
      role: "protagoniste",
    },
    {
      name: "Sasha Manners",
      slug: "sasha-manners",
      slogan: "Rien n'est magique, mais tout n'est pas explicable",
      url: "/assets/images/Sasha réaliste.png",
      role: "allié",
    },
    {
      name: "Irène",
      slug: "irène",
      slogan:
        "L'ordre est la fondation de la sécurite. Sans cela, tout s'effondre",
      url: "/assets/images/Irène réaliste.png",
      role: "neutre",
    },
  ];

  const [isCurrentUserAuthor, setIsCurrentUserAuthor] =
    useState<boolean>(false);
  const [bookAuthor, setBookAuthor] = useState<string>("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getbookinfo/${slug}/`)
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            console.log(data);
            setBookAuthor(data.author_name);
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
  }, [bookAuthor, user.token]);

  useEffect(() => {
    if (!user.token) {
      setIsCurrentUserAuthor(false);
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
            setIsCurrentUserAuthor(true);
          } else {
            setIsCurrentUserAuthor(false);
          }
        } else {
          setIsCurrentUserAuthor(false);
        }
      })
    );
  }, [bookAuthor, user.token]);

  const characters = charactersList.map((oneCharact: Character, i: number) => {
    return (
      <CharacterCard
        key={i}
        name={oneCharact.name}
        slug={oneCharact.slug}
        slogan={oneCharact.slogan}
        role={oneCharact.role}
        url={oneCharact.url}
      />
    );
  });

  console.log(user, isCurrentUserAuthor);

  return (
    <div className={styles.global}>
      <Header />
      <main className={styles.main}>
        <button
          onClick={() => router.push(`/book/${slug}`)}
          className={styles.backLink}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={styles.backArrow} />
          {"Retour sur le détail du livre"}
        </button>
        <section className={styles.section}>
          {!isCurrentUserAuthor ? (
            <h2 className={styles.titleSection}>🗺️ Lieux</h2>
          ) : (
            <div className={styles.titleSectionContainer}>
              <h2 className={styles.titleSection}>🗺️ Lieux</h2>
              <button className={styles.addButton}>
                <FontAwesomeIcon icon={faPlus} /> {"Ajouter un lieu"}
              </button>
            </div>
          )}
          <div></div>
        </section>
        <section className={styles.section}>
          {!isCurrentUserAuthor ? (
            <h2 className={styles.titleSection}>👤 Personnages</h2>
          ) : (
            <div className={styles.titleSectionContainer}>
              <h2 className={styles.titleSection}>👤 Personnages</h2>
              <button
                className={styles.addButton}
                onClick={() =>
                  router.push(`/book/${slug}/character/newcharacter`)
                }
              >
                <FontAwesomeIcon icon={faPlus} /> {"Ajouter un personnage"}
              </button>
            </div>
          )}
          <div className={styles.characterContainer}>
            <h3 className={styles.titleCharacter}>😇 Protagonistes</h3>
            <div className={styles.characterList}>{characters}</div>
            <h3 className={styles.titleCharacter}>😐 Neutres</h3>
            <div className={styles.characterList}></div>
            <h3 className={styles.titleCharacter}>😈 Antagonistes</h3>
            <div className={styles.characterList}></div>
          </div>
        </section>
        <section className={styles.section}>
          {!isCurrentUserAuthor ? (
            <h2 className={styles.titleSection}>🐲 Créatures</h2>
          ) : (
            <div className={styles.titleSectionContainer}>
              <h2 className={styles.titleSection}>🐲 Créatures</h2>
              <button className={styles.addButton}>
                <FontAwesomeIcon icon={faPlus} /> {"Ajouter une créature"}
              </button>
            </div>
          )}
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default BookUniverse;
