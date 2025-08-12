import styles from "../../styles/NewBook.module.css";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const NewBook = () => {
  // Récupère les genres dans les données du json
  const [genres, setGenres] = useState<string[]>([]);
  // Etat pour stocker les genres sélectionnés
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch("/assets/data/classification_livre.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.genres) {
          setGenres(data.genres);
        } else {
          alert("Echec du chargement des genres de livre");
        }
      })
      .catch((error) => {
        alert(`Une erreur s'est produite au chargement de la page : ${error}`);
      });
  }, []);

  console.log(genres);
  //Conversion de l'état qui stocke tous les genres en checkbox
  const checkboxGenres = genres.map((oneGenre, i) => {
    return (
      <label key={i} htmlFor={`genre-${i}`} className={styles.isSagaLabel}>
        <input
          type="checkbox"
          id={`genre-${i}`}
          checked={checkedGenres.includes(oneGenre)}
          onChange={() => handleCheck(oneGenre)}
        ></input>
        {oneGenre}
      </label>
    );
  });

  // Fonction pour limiter le nombre de case genre à 5
  const handleCheck = (genre: string) => {
    if (checkedGenres.includes(genre)) {
      // décocher
      setCheckedGenres(checkedGenres.filter((g) => g !== genre));
    } else {
      // cocher : limiter à 5
      if (checkedGenres.length < 5) {
        setCheckedGenres([...checkedGenres, genre]);
      } else {
        alert("Vous ne pouvez pas cocher plus de 5 genres.");
      }
    }
  };

  // Etat pour gérer le fichier photo
  const [photo, setPhoto] = useState<File | null>(null);
  // Fonction pour mettre à jour la photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  //Etat pour gérer le toggle de Saga
  const [sagaChecked, setSagaChecked] = useState<boolean>(false);
  // Fonction pour mettre à jour le toggle de Saga
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSagaChecked(e.target.checked);
  };
  console.log(sagaChecked);

  //Etat pour gérer les inputs GENERAL
  const [sagaName, setSagaName] = useState<string>("");
  const [sagaNumber, setSagaNumber] = useState<number>(1);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [publicRead, setPublicRead] = useState<string>("");

  // fonction pour mettre à jour le public visé
  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicRead(e.target.value);
  };

  let stylePhotoContainer = {};
  if (photo) {
    stylePhotoContainer = { display: "none" };
  }

  return (
    <div className={styles.global}>
      <Header />
      <main className={styles.main}>
        {/* SECTION GENERALE */}
        <section className={styles.general}>
          {/* UPLOAD PHOTO */}
          <div>
            <div
              className={styles.photoInputContainer}
              style={stylePhotoContainer}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.photoInput}
              />
            </div>
            {photo && (
              <div className={styles.photoPreview}>
                <Image
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  width={300}
                  height={450}
                />
              </div>
            )}
          </div>
          {/* AUTRES INPUTS GENERAL */}
          <div className={styles.otherInputs}>
            <h1 className={styles.titre}>
              Quel roman veux-tu faire découvrir ?
            </h1>
            {/* DEBUT PARTIE SAGA */}
            <div className={styles.sagaCheck}>
              <p className={styles.isSagaLabel}>Appartient à une saga : </p>
              <label
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 50,
                  height: 28,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={sagaChecked}
                  onChange={handleToggleChange}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: sagaChecked ? "#E28413" : "#ccc",
                    borderRadius: 28,
                    transition: "0.4s",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    height: 22,
                    width: 22,
                    left: sagaChecked ? 26 : 4,
                    bottom: 3,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    transition: "0.4s",
                  }}
                />
              </label>
            </div>
            {sagaChecked && (
              <div className={styles.sagaContent}>
                <input
                  type="text"
                  value={sagaName}
                  onChange={(e) => setSagaName(e.target.value)}
                  placeholder="Nom de la saga"
                  className={styles.inputText}
                />
                <p className={styles.isSagaLabel}>Tome : </p>
                <input
                  type="number"
                  value={sagaNumber}
                  min={1}
                  onChange={(e) => setSagaNumber(Number(e.target.value))}
                  className={styles.inputNbre}
                />
              </div>
            )}
            {/* FIN PARTIE SAGA */}
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Titre du livre"
              className={styles.inputText}
            />
            <div>
              {/* DEBUT PARTIE PUBLIC */}
              <div className={styles.publicContent}>
                <p className={styles.isSagaLabel}>Public :</p>
                <input
                  id="public1"
                  type="radio"
                  name="public"
                  value="Jeunesse"
                  checked={publicRead === "Jeunesse"}
                  onChange={handlePublicChange}
                  className={styles.inputRadio}
                />
                <label htmlFor="public1" className={styles.isSagaLabel}>
                  Jeunesse
                </label>

                <input
                  id="public2"
                  type="radio"
                  name="public"
                  value="Young Adult"
                  checked={publicRead === "Young Adult"}
                  onChange={handlePublicChange}
                  className={styles.inputRadio}
                />
                <label htmlFor="public2" className={styles.isSagaLabel}>
                  Young Adult
                </label>

                <input
                  id="public3"
                  type="radio"
                  name="public"
                  value="Adulte"
                  checked={publicRead === "Adulte"}
                  onChange={handlePublicChange}
                  className={styles.inputRadio}
                />
                <label htmlFor="public3" className={styles.isSagaLabel}>
                  Adulte
                </label>
              </div>
              {/* FIN PARTIE PUBLIC */}
            </div>
          </div>
        </section>

        {/* SECTION GENRES */}
        <section>
          <p className={styles.sectionTitle}>Genre (5 maximum) : </p>
          <div className={styles.genresSection}>{checkboxGenres}</div>
        </section>
      </main>
    </div>
  );
};

export default NewBook;
