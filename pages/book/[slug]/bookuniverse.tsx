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

  const [isCurrentUserAuthor, setIsCurrentUserAuthor] =
    useState<boolean>(false);
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getbookinfo/${slug}/`)
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
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

    fetch(`http://127.0.0.1:8000/api/${slug}/getallcharacters/`).then(
      (response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("ALL PERSOS 🤩🤩🤩", data.results);
            setCharacterList([]);
            for (let character of data.results) {
              setCharacterList((prev) => [
                ...prev,
                {
                  name: character.name,
                  slug: character.slug,
                  slogan: character.slogan,
                  url: character.image,
                  role: character.role,
                },
              ]);
            }
          }
        })
    );
  }, []);

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

  // Conversion et tri des "gentils"
  const goodCharacterList = characterList.filter(
    (oneCharacter: Character) =>
      oneCharacter.role === "protagoniste" || oneCharacter.role === "allié"
  );

  const goodCharacters = goodCharacterList.map(
    (oneCharact: Character, i: number) => {
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
    }
  );

  // Conversion et tri des "neutres"
  const neutralCharacterList = characterList.filter(
    (oneCharacter: Character) => oneCharacter.role === "neutre"
  );

  const neutralCharacters = neutralCharacterList.map(
    (oneCharact: Character, i: number) => {
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
    }
  );

  // Conversion et tri des "méchants"
  const badCharacterList = characterList.filter(
    (oneCharacter: Character) =>
      oneCharacter.role === "antagoniste" || oneCharacter.role === "adversaire"
  );

  const badCharacters = badCharacterList.map(
    (oneCharact: Character, i: number) => {
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
    }
  );

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
            <div className={styles.characterList}>
              {goodCharacterList ? (
                goodCharacters
              ) : (
                <p>Aucun personnage trouvé dans cette catégorie</p>
              )}
            </div>
            <h3 className={styles.titleCharacter}>😐 Neutres</h3>
            <div className={styles.characterList}>
              {neutralCharacterList ? (
                neutralCharacters
              ) : (
                <p>Aucun personnage trouvé dans cette catégorie</p>
              )}
            </div>
            <h3 className={styles.titleCharacter}>😈 Antagonistes</h3>
            <div className={styles.characterList}>
              {badCharacterList ? (
                badCharacters
              ) : (
                <p>Aucun personnage trouvé dans cette catégorie</p>
              )}
            </div>
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
