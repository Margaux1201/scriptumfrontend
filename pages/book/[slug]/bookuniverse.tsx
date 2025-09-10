import styles from "../../../styles/BookUniverse.module.css";
import Header from "../../../components/Header";
import CharacterCard from "../../../components/CharacterCard";
import LongCard from "../../../components/LongCard";
import { Modal, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useSelector, UseSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import { useRouter } from "next/router";
import Image from "next/image";

const BookUniverse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  interface LongCard {
    title: string;
    content: string;
    image: string;
    slug: string;
  }

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

  const [placeList, setPlaceList] = useState<LongCard[]>([]);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [creatureList, setCreatureList] = useState<LongCard[]>([]);

  // Etats pour gérer les modals de Lieu
  const [openCreatePlaceModal, setOpenCreatePlaceModal] =
    useState<boolean>(false);
  const [openUpdatePlaceModal, setOpenUpdatePlaceModal] =
    useState<boolean>(false);

  // Etats pour gérer les modals de Creatures
  const [openCreateCreatureModal, setOpenCreateCreatureModal] =
    useState<boolean>(false);
  const [openUpdateCreatureModal, setOpenUpdateCreatureModal] =
    useState<boolean>(false);

  // Etats pour gérer les inputs de chaque modale
  const [photoModal, setPhotoModal] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [titleModal, setTitleModal] = useState<string>("");
  const [contentModal, setContentModal] = useState<string>("");

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

    fetch(`http://127.0.0.1:8000/api/${slug}/getallplaces/`)
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("ALL PLACES 🗺️🗺️🗺️", data);
            setPlaceList([]);
            for (let character of data.results) {
              setPlaceList((prev) => [
                ...prev,
                {
                  title: character.name,
                  content: character.content,
                  image: character.image,
                  slug: character.slug,
                },
              ]);
            }
          }
        })
      )
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données des lieux :",
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

  interface LongCard {
    title: string;
    content: string;
    image: string;
  }

  // PARTIE LIEUX

  // Fonction pour mettre à jour la photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoModal(e.target.files[0]);
    }
  };

  let stylePhotoContainer = {};
  if (photoModal) {
    stylePhotoContainer = { border: "none" };
  }

  // Modale de création
  const handleOpenCreatePlace = (): void => {
    setOpenCreatePlaceModal(true);
  };

  const handleCreatePlaceCancel = (): void => {
    setPhotoModal(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setTitleModal("");
    setContentModal("");
    setOpenCreatePlaceModal(false);
  };

  const handleCreatePlace = (): void => {
    if (!user.token) {
      alert("Veuillez vous connecter pour ajouter un lieu");
      setPhotoModal(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setTitleModal("");
      setContentModal("");
      setOpenCreatePlaceModal(false);
      return;
    }

    if (
      !photoModal ||
      !titleModal ||
      titleModal.trim() === "" ||
      !contentModal ||
      contentModal.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("token", user.token);
    formData.append("image", photoModal);
    formData.append("name", titleModal);
    formData.append("content", contentModal);
    formData.append("book", `${slug}`);

    fetch(`http://127.0.0.1:8000/api/createplace/`, {
      method: "POST",
      body: formData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("NEW PLACE 📸📸📸", data);
            setPlaceList((prev) => [
              ...prev,
              {
                title: data.name,
                content: data.content,
                image: data.image,
                slug: data.slug,
              },
            ]);
            placeList.sort();
            setPhotoModal(null);
            if (inputFileRef.current) {
              inputFileRef.current.value = "";
            }
            setTitleModal("");
            setContentModal("");
            setOpenCreatePlaceModal(false);
          }
        })
      )
      // .then(async (res) => {
      //   const text = await res.text();
      //   console.log("Réponse brute :", text); // <== regarde ce qui est réellement renvoyé
      // })
      .catch((error) => {
        console.error("Erreur lors de l'ajout d'un lieu :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  // Modale de modification
  const handleOpenUpdatePlace = (): void => {
    setOpenCreatePlaceModal(true);
  };

  const handleUpdatePlaceCancel = (): void => {
    setPhotoModal(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setTitleModal("");
    setContentModal("");
    setOpenUpdatePlaceModal(false);
  };

  const handleUpdatePlace = (): void => {
    if (!user.token) {
      alert("Veuillez vous connecter pour ajouter un lieu");
      setPhotoModal(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setTitleModal("");
      setContentModal("");
      setOpenCreatePlaceModal(false);
      return;
    }

    if (
      !titleModal ||
      titleModal.trim() === "" ||
      !contentModal ||
      contentModal.trim() === ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setPhotoModal(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setTitleModal("");
    setContentModal("");
    setOpenCreatePlaceModal(false);
  };

  // Styles conditionnels des cartes de lieux
  const longCardStyleRight = { alignItems: "flex-end" };
  const longCardStyleLeft = { alignItems: "flex-start" };

  // Fonction pour supprimer une carte Lieu
  const deletePlace = (element: string) => {
    setPlaceList((prev) =>
      prev.filter((onePlace) => onePlace.title != element)
    );
  };

  // Conversion des places en composant
  const places = placeList?.map((place: LongCard, i: number) => (
    <div
      className={styles.longCard}
      style={i % 2 === 0 ? longCardStyleLeft : longCardStyleRight}
    >
      <LongCard
        id={i}
        cardType="place"
        title={place.title}
        content={place.content}
        image={place.image}
        bookSlug={`${slug}`}
        slug={place.slug}
        isEditable={isCurrentUserAuthor}
        deleteCard={deletePlace}
      />
    </div>
  ));

  // PARTIE PERSONNAGE

  //Fonction pour supprimer un personnage en inverse-dataFlow
  const deleteCharacter = (element: string) => {
    setCharacterList((prev) =>
      prev.filter((oneCharacter) => oneCharacter.name != element)
    );
  };

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
          id={i}
          name={oneCharact.name}
          slug={oneCharact.slug}
          bookSlug={`${slug}`}
          slogan={oneCharact.slogan}
          role={oneCharact.role}
          url={oneCharact.url}
          isEditable={isCurrentUserAuthor}
          deleteCharacter={deleteCharacter}
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
          id={i}
          name={oneCharact.name}
          slug={oneCharact.slug}
          bookSlug={`${slug}`}
          slogan={oneCharact.slogan}
          role={oneCharact.role}
          url={oneCharact.url}
          isEditable={isCurrentUserAuthor}
          deleteCharacter={deleteCharacter}
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
          id={i}
          name={oneCharact.name}
          slug={oneCharact.slug}
          bookSlug={`${slug}`}
          slogan={oneCharact.slogan}
          role={oneCharact.role}
          url={oneCharact.url}
          isEditable={isCurrentUserAuthor}
          deleteCharacter={deleteCharacter}
        />
      );
    }
  );

  // Fonction pour supprimer une carte Creature
  const deleteCreature = (element: string) => {
    setCreatureList((prev) =>
      prev.filter((oneCreature) => oneCreature.title != element)
    );
  };

  // Conversion des creatures en composant
  const creatures = creatureList?.map((creature: LongCard, i: number) => (
    <div
      className={styles.longCard}
      style={i % 2 === 0 ? longCardStyleLeft : longCardStyleRight}
    >
      <LongCard
        id={i}
        cardType="creature"
        title={creature.title}
        content={creature.content}
        image={creature.image}
        slug={creature.slug}
        bookSlug={`${slug}`}
        isEditable={isCurrentUserAuthor}
        deleteCard={deleteCreature}
      />
    </div>
  ));

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
              <button
                className={styles.addButton}
                onClick={handleOpenCreatePlace}
              >
                <FontAwesomeIcon icon={faPlus} /> {"Ajouter un lieu"}
              </button>
            </div>
          )}
          <div className={styles.placeList}>{places}</div>
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
          <div className={styles.creatureList}>{creatures}</div>
        </section>

        {/* DEBUT PARTIE MODAL LIEU */}
        {/* Création */}
        <Modal closable={false} open={openCreatePlaceModal} footer={null}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Création d'un lieu</h2>
            <div
              className={styles.photoInputContainer}
              style={stylePhotoContainer}
            >
              {photoModal && (
                <div>
                  <Image
                    src={URL.createObjectURL(photoModal)}
                    alt="Preview"
                    width={300}
                    height={300}
                    className={styles.photoPreview}
                  />
                </div>
              )}
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.photoInput}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Nom du lieu *"
              value={titleModal}
              onChange={(e) => setTitleModal(e.target.value)}
              className={styles.titlePlace}
              required
            />
            <textarea
              name="content"
              id="newContentPlace"
              placeholder="Description du lieu *"
              maxLength={1000}
              value={contentModal}
              onChange={(e) => setContentModal(e.target.value)}
              className={styles.contentPlace}
            ></textarea>
            <div className={styles.legendText}>
              <p className={styles.caractLimit}>
                {contentModal.length} /1000 caractères
              </p>
            </div>
            <div className={styles.modalButtons}>
              <Button
                key="back"
                onClick={handleCreatePlaceCancel}
                className={styles.modalButtonEmpty}
              >
                Annuler
              </Button>
              <Button
                key="submit"
                onClick={handleCreatePlace}
                className={styles.modalButtonFull}
              >
                Publier
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modification */}
        <Modal closable={false} open={openUpdatePlaceModal} footer={null}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Modification d'un lieu</h2>
            <div
              className={styles.photoInputContainer}
              style={stylePhotoContainer}
            >
              {photoModal && (
                <div>
                  <Image
                    src={URL.createObjectURL(photoModal)}
                    alt="Preview"
                    width={300}
                    height={300}
                    className={styles.photoPreview}
                  />
                </div>
              )}
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.photoInput}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Nom du lieu *"
              value={titleModal}
              onChange={(e) => setTitleModal(e.target.value)}
              className={styles.titlePlace}
              required
            />
            <textarea
              name="content"
              id="updateContentPlace"
              placeholder="Description du lieu *"
              maxLength={1000}
              value={contentModal}
              onChange={(e) => setContentModal(e.target.value)}
              className={styles.contentPlace}
            ></textarea>
            <div className={styles.legendText}>
              <p className={styles.caractLimit}>
                {contentModal.length} /1000 caractères
              </p>
            </div>
            <div className={styles.modalButtons}>
              <Button
                key="back"
                onClick={handleUpdatePlaceCancel}
                className={styles.modalButtonEmpty}
              >
                Annuler
              </Button>
              <Button
                key="submit"
                onClick={handleUpdatePlace}
                className={styles.modalButtonFull}
              >
                Publier
              </Button>
            </div>
          </div>
        </Modal>
        {/* FIN PARTIE MODAL LIEU */}
      </main>
    </div>
  );
};

export default BookUniverse;
