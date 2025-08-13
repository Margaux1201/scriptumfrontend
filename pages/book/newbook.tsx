import styles from "../../styles/NewBook.module.css";
import Header from "../../components/Header";
import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NewBook = () => {
  // Récupère les genres dans les données du json
  const [genres, setGenres] = useState<string[]>([]);
  // Etat pour stocker les genres sélectionnés
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);

  interface Warning {
    categorie: string;
    tags: string[];
  }

  interface SelectedWarning {
    categorie: string;
    tag: string[];
  }

  // Récupère les avertissements dans les données du json
  const [warningsFetched, setWarningsFetched] = useState<Warning[]>([]);
  // Etat pour stocker les avertissements sélectionnées
  const [checkedWarnings, setCheckedWarnings] = useState<SelectedWarning[]>([]);

  useEffect(() => {
    fetch("/assets/data/classification_livre.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.genres) {
          data.genres.sort();
          setGenres(data.genres);
        } else {
          alert("Echec du chargement des genres de livre");
        }
      })
      .catch((error) => {
        alert(`Une erreur s'est produite au chargement de la page : ${error}`);
      });

    fetch("/assets/data/avertissement_livre.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setWarningsFetched(data);
        } else {
          alert("Echec du chargement des avertissements");
        }
      })
      .catch((error) => {
        alert(`Une erreur s'est produite au chargement de la page : ${error}`);
      });
  }, []);

  //Conversion de l'état qui stocke tous les genres en checkbox
  const checkboxGenres = genres.map((oneGenre, i) => {
    return (
      <label key={i} htmlFor={`genre-${i}`} className={styles.isSagaLabel}>
        <input
          type="checkbox"
          id={`genre-${i}`}
          checked={checkedGenres.includes(oneGenre)}
          onChange={() => handleCheck(oneGenre)}
          className={styles.checkbox}
        ></input>
        {oneGenre}
      </label>
    );
  });

  const checkboxWarnings = warningsFetched.map((oneWarning, i) => {
    return (
      <div key={i}>
        <h4 className={styles.warningCategory}>{oneWarning.categorie}</h4>
        <div className={styles.warningTagContainer}>
          {oneWarning.tags.map((oneTag, j) => {
            // Déterminer si la case doit être cochée
            const isChecked = checkedWarnings.some(
              (w) =>
                w.categorie === oneWarning.categorie && w.tag.includes(oneTag)
            );

            return (
              <label htmlFor={`tag-${i}-${j}`} key={j}>
                <input
                  type="checkbox"
                  id={`tag-${i}-${j}`}
                  checked={isChecked}
                  onChange={(e) =>
                    handleCheckboxChange(
                      oneWarning.categorie,
                      oneTag,
                      e.target.checked
                    )
                  }
                  className={styles.checkbox}
                />
                {oneTag}
              </label>
            );
          })}
        </div>
      </div>
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

  // Fonction pour mettre à jour les avertissements cochés
  const handleCheckboxChange = (
    categorie: string,
    tag: string,
    checked: boolean
  ) => {
    setCheckedWarnings((prev) => {
      // Vérifie si la catégorie existe déjà dans l'état
      const existingCategory = prev.find((w) => w.categorie === categorie);

      // Si le tag a été coché
      if (checked) {
        if (existingCategory) {
          // Ajoute le tag dans la catégorie si pas déjà présent
          return prev.map((w) =>
            w.categorie === categorie ? { ...w, tag: [...w.tag, tag] } : w
          );
        } else {
          // Nouvelle catégorie
          return [...prev, { categorie, tag: [tag] }];
        }

        // Si le tag a été décoché
      } else {
        if (existingCategory) {
          // Retirer le tag
          const updatedTags = existingCategory.tag.filter((t) => t !== tag);

          if (updatedTags.length > 0) {
            // Catégorie encore avec des tags
            return prev.map((w) =>
              w.categorie === categorie ? { ...w, tag: updatedTags } : w
            );
          } else {
            // Plus de tags → supprimer complètement la catégorie
            return prev.filter((w) => w.categorie !== categorie);
          }
        }
      }
      return prev;
    });
  };

  console.log(checkedWarnings);

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
    stylePhotoContainer = { border: "none" };
  }

  // Etat pour stocker la description
  const [description, setDescription] = useState<string>("");

  //Etats pour gérer la recherche et stockage des thèmes
  const [currentWord, setCurrentWord] = useState<string>("");
  const [stockedThemes, setStockedThemes] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState<string[]>([]);

  // fonction pour générér la suggestion et stocker un thème
  const handleThemeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentWord(value);
    // génère les suggestions depuis le fichier json
    if (value.trim() === "") {
      setSuggestion([]);
    } else {
      fetch("/assets/data/classification_livre.json")
        .then((res) => res.json())
        .then((data) => {
          if (data.themes) {
            const filtered = data.themes.filter((w: string) =>
              w.toLowerCase().startsWith(value.toLowerCase())
            );
            filtered.sort();
            setSuggestion(filtered);
          }
        })
        .catch((error) => {
          alert(`Une erreur s'est produite dans les suggestions : ${error}`);
        });
    }
  };

  // Fonction pour ajouter le mot dans les thèmes
  const addWord = (word: string) => {
    if (stockedThemes.length < 10) {
      for (let oneTheme of stockedThemes) {
        if (word === oneTheme) {
          alert("Vous ne pouvez pas ajouter le même thème 2 fois");
          return;
        }
      }
      setStockedThemes((prev) => [...prev, word]);
      setCurrentWord("");
      setSuggestion([]);
    } else {
      alert("Vous ne pouvez pas cocher plus de 10 thèmes.");
    }
  };

  //Fonction déclenché quand Entrée est tapé
  const handleThemesKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentWord.trim() !== "") {
      addWord(currentWord.trim());
    }
  };

  // Variable pour convertir l'état des thèmes stockés en composant
  const themes = stockedThemes.map((oneTheme, i) => {
    return (
      <div key={i} className={styles.themeTag}>
        <h5 className={styles.themeName}>{oneTheme}</h5>
        <button
          onClick={() => handleDeleteTheme(oneTheme)}
          className={styles.deleteThemeBtn}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  });

  // Fonction pour supprimer le tag cliqué
  const handleDeleteTheme = (x: string) => {
    const deletedTheme = stockedThemes.filter((e) => e != x);
    setStockedThemes(deletedTheme);
  };

  return (
    <div className={styles.global}>
      <Header />
      <main className={styles.main}>
        {/* SECTION GENERALE */}
        <section className={styles.general}>
          {/* UPLOAD PHOTO */}

          <div
            className={styles.photoInputContainer}
            style={stylePhotoContainer}
          >
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
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.photoInput}
            />
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
        <section className={styles.genresSection}>
          <h3 className={styles.sectionTitle}>Genre (5 maximum) : </h3>
          <div className={styles.genresContent}>{checkboxGenres}</div>
        </section>

        {/* SECTION DESCRIPTION */}
        <section className={styles.descSection}>
          <h3 className={styles.sectionTitle}>Description : </h3>
          <div className={styles.descContainer}>
            <textarea
              name="description"
              id="desc"
              maxLength={3000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.descriptionArea}
            ></textarea>
          </div>
          <p className={styles.caracLimit}>
            {description.length} / 3000 caractères
          </p>
        </section>

        {/* SECTION THEMES */}
        <section>
          <div className={styles.searchThemes}>
            <h3 className={styles.sectionTitle}>Thèmes (10 maximum) : </h3>
            <input
              type="text"
              value={currentWord}
              onChange={handleThemeInputChange}
              onKeyDown={handleThemesKeyDown}
              placeholder="Tapez un mot et appuyez sur Entrée"
              className={styles.inputSearch}
            />
          </div>
          {suggestion.length > 0 && (
            <ul className={styles.suggestionContainer}>
              {suggestion.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => addWord(suggestion)}
                  className={styles.suggestThemes}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.selectedThemesArea}>
            {stockedThemes.length > 0 ? themes : <p>Aucun thème sélectionné</p>}
          </div>
        </section>

        {/* SECTION AVERTISSEMENTS */}
        <section>
          <h3 className={styles.sectionTitle}>Avertissements : </h3>
          <div className={styles.warningContainer}>{checkboxWarnings}</div>
        </section>
        <div className={styles.registerPart}>
          <button className={styles.registerBtn}>Enregistrer</button>
        </div>
      </main>
    </div>
  );
};

export default NewBook;
