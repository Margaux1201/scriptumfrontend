import styles from "../styles/Browse.module.css";
import Header from "../components/Header";
import BrowseBookCard from "../components/BrowseBookCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

function Browse() {
  interface Warning {
    categorie: string;
    tag: string[];
  }

  interface Book {
    author: number;
    author_name: string;
    description: string;
    genres: string[];
    id: number;
    image: string;
    is_saga: boolean;
    publicType: string;
    rating: number;
    releaseDate: string;
    slug: string;
    state: string;
    themes: string[];
    title: string;
    tomeName: string;
    tomeNumber: number;
    warnings: Warning[];
  }

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string>("");
  const [filterRate, setFilterRate] = useState<number>(0);
  const [genresList, setGenresList] = useState<string[]>([]);
  const [filterGenre, setFilterGenre] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [filterThemes, setFilterThemes] = useState<string[]>([]);
  const [checkedPublic, setCheckedPublic] = useState<string[]>([]);
  const [filterIsSaga, setFilterIsSaga] = useState<string>("");

  // Etats pour changer le contenu de la page en fonction des recherches
  const [browseMode, setBrowseMode] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Etats pour chaque liste de livres
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const params = new URLSearchParams();

  // Ajoute les paramètres de filtre s'ils sont définis
  if (searchWord) params.append("search", searchWord);
  if (filterState) params.append("state", filterState);
  if (filterRate) params.append("min_rating", filterRate.toString());
  if (filterGenre) params.append("genre", filterGenre);
  filterThemes.forEach((theme) => params.append("theme", theme));
  checkedPublic.forEach((pub) => params.append("public_type", pub));
  if (filterIsSaga) params.append("is_saga", filterIsSaga);
  params.append("page", page.toString());

  useEffect(() => {
    fetch("/assets/data/classification_livre.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          data.genres.sort();
          data.genres.unshift("-- Sélectionner --");
          setGenresList(data.genres);
        }
      });

    if (!browseMode) {
      // Les plus récents
      fetch(
        "http://127.0.0.1:8000/api/getallbook/?ordering=-release_date&page=1"
      )
        .then((response) =>
          response.json().then((data) => {
            if (response.ok) {
              console.log("LES PLUS RECENTS 🤩🤩🤩", data);
              setRecentBooks(data.results);
            }
          })
        )
        .catch((error) => {
          alert(
            `Une erreur s'est produite au chargement des livres les plus récents : ${error}`
          );
        });

      // Les mieux notés
      fetch("http://127.0.0.1:8000/api/getallbook/?ordering=-rating&page=1")
        .then((response) =>
          response.json().then((data) => {
            if (response.ok) {
              console.log("LES MEILLEURS ❤️❤️❤️", data);
              setTopBooks(data.results);
            }
          })
        )
        .catch((error) => {
          alert(
            `Une erreur s'est produite au chargement des meilleurs livres : ${error}`
          );
        });
    } else {
      fetch(`http://127.0.0.1:8000/api/getallbook/?${params.toString()}`)
        .then((response) =>
          response.json().then((data) => {
            if (response.ok) {
              console.log("DONNEE FILTREE 🗨️🗨️🗨️", data);
              setFilteredBooks(data.results);
            }
          })
        )
        .catch((error) => {
          alert(
            `Une erreur s'est produite au chargement de la page filtrée : ${error}`
          );
        });
    }
  }, [
    browseMode,
    searchWord,
    filterState,
    filterRate,
    filterGenre,
    filterThemes,
    filterIsSaga,
    checkedPublic,
  ]);

  const latestBooks = recentBooks.map((oneBook, index) => {
    return (
      <BrowseBookCard
        key={index}
        title={oneBook.title}
        author={oneBook.author_name}
        url={oneBook.image}
        rating={oneBook.rating}
        slug={oneBook.slug}
      />
    );
  });

  const bestBooks = topBooks.map((oneBook, index) => {
    return (
      <BrowseBookCard
        key={index}
        title={oneBook.title}
        author={oneBook.author_name}
        url={oneBook.image}
        rating={oneBook.rating}
        slug={oneBook.slug}
      />
    );
  });

  const books = filteredBooks.map((oneBook, index) => {
    return (
      <BrowseBookCard
        key={index}
        title={oneBook.title}
        author={oneBook.author_name}
        url={oneBook.image}
        rating={oneBook.rating}
        slug={oneBook.slug}
      />
    );
  });

  const handleWordSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentWord.trim() !== "") {
        setBrowseMode(true);
        setSearchWord(currentWord);
      } else {
        setBrowseMode(false);
        setSearchWord("");
      }
    }
  };

  const genreOptions = genresList.map((oneGenre, index) => {
    return (
      <option key={index} value={oneGenre}>
        {oneGenre}
      </option>
    );
  });

  // fonction pour générér la suggestion et stocker un thème
  const handleThemeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTheme(value);
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
    for (let oneTheme of filterThemes) {
      if (word === oneTheme) {
        alert("Vous ne pouvez pas ajouter le même thème 2 fois");
        return;
      }
    }
    setFilterThemes((prev) => [...prev, word]);
    setTheme("");
    setSuggestion([]);
  };

  //Fonction déclenché quand Entrée est tapé
  const handleThemesKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && theme.trim() !== "") {
      addWord(theme.trim());
    }
  };

  // Variable pour convertir l'état des thèmes stockés en composant
  const selectedTheme = filterThemes.map((oneTheme, i) => {
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
    const deletedTheme = filterThemes.filter((e) => e != x);
    setFilterThemes(deletedTheme);
  };

  // Fonction pour cocher et décocher les cases Public
  const handleCheck = (publicType: string) => {
    if (checkedPublic.includes(publicType)) {
      // décocher
      setCheckedPublic(checkedPublic.filter((p) => p !== publicType));
    } else {
      setCheckedPublic([...checkedPublic, publicType]);
    }
  };

  const handleSearchByFilter = (): void => {
    setBrowseMode(true);
    setOpenFilter(false);
  };

  const handleResetFilter = (): void => {
    setBrowseMode(false);
    setFilterState("");
    setFilterRate(0);
    setFilterIsSaga("");
    setFilterGenre("");
    setCheckedPublic([]);
    setFilterThemes([]);
    setOpenFilter(false);
  };

  console.log("BROWSEMODE 🧠🧠🧠", browseMode);

  return (
    <div className={styles.globalcontainer}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.titlePage}>Trouve ton livre idéal !</h1>
        <div className={styles.searchArea}>
          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="Chercher un livre, un auteur..."
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              onKeyDown={handleWordSearch}
              className={styles.inputSearch}
            />
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className={styles.filterBtn}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className={styles.filterSymbol}
              />
            </button>
          </div>
          {openFilter && (
            <div className={styles.filterContainer}>
              <h3 className={styles.filterTitle}>Sélectionnez vos filtres</h3>
              <div className={styles.gridContainer}>
                {/* Ligne du statut */}
                <div className={styles.leftPart}>
                  <div className={styles.filterLine}>
                    <h4 className={styles.titleInput}>Statut :</h4>
                    <div className={styles.inputField}>
                      <label htmlFor="inprogress">
                        <input
                          type="radio"
                          id="inprogress"
                          name="state"
                          value={filterState}
                          onChange={() => setFilterState("En cours")}
                          checked={filterState === "En cours"}
                          className={styles.input}
                        />
                        En cours
                      </label>
                      <label htmlFor="finished">
                        <input
                          type="radio"
                          id="finished"
                          name="state"
                          value={filterState}
                          onChange={() => setFilterState("Terminé")}
                          checked={filterState === "Terminé"}
                          className={styles.input}
                        />
                        Terminé
                      </label>
                    </div>
                  </div>
                  {/* Ligne de notes */}
                  <div className={styles.filterLine}>
                    <h4 className={styles.titleInput}>Note :</h4>
                    <div className={styles.inputField}>
                      <label htmlFor="1star">
                        <input
                          type="radio"
                          id="1star"
                          name="rating"
                          value={filterRate}
                          onChange={() => setFilterRate(1)}
                          checked={filterRate === 1}
                          className={styles.input}
                        />
                        1
                      </label>
                      <label htmlFor="2star">
                        <input
                          type="radio"
                          id="2star"
                          name="rating"
                          value={filterRate}
                          onChange={() => setFilterRate(2)}
                          checked={filterRate === 2}
                          className={styles.input}
                        />
                        2
                      </label>
                      <label htmlFor="3star">
                        <input
                          type="radio"
                          id="3star"
                          name="rating"
                          value={filterRate}
                          onChange={() => setFilterRate(3)}
                          checked={filterRate === 3}
                          className={styles.input}
                        />
                        3
                      </label>
                      <label htmlFor="4star">
                        <input
                          type="radio"
                          id="4star"
                          name="rating"
                          value={filterRate}
                          onChange={() => setFilterRate(4)}
                          checked={filterRate === 4}
                          className={styles.input}
                        />
                        4
                      </label>
                      <label htmlFor="5star">
                        <input
                          type="radio"
                          id="5star"
                          name="rating"
                          value={filterRate}
                          onChange={() => setFilterRate(5)}
                          checked={filterRate === 5}
                          className={styles.input}
                        />
                        5
                      </label>
                    </div>
                  </div>
                  {/* ligne de genre */}
                  <div className={styles.filterLine}>
                    <label className={styles.titleInput} htmlFor="genre">
                      Genre :
                    </label>
                    <select
                      name="genre"
                      id="genre"
                      value={filterGenre}
                      onChange={(e) => setFilterGenre(e.target.value)}
                      className={styles.inputGenreFilter}
                    >
                      {genreOptions}
                    </select>
                  </div>
                  {/* Ligne des thèmes */}
                  <div className={styles.filterLine}>
                    <h4 className={styles.titleInput}>Thèmes :</h4>
                    <input
                      type="text"
                      value={theme}
                      onChange={handleThemeInputChange}
                      onKeyDown={handleThemesKeyDown}
                      className={styles.inputGenreFilter}
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
                  {/* Ligne Public */}
                  <div className={styles.filterLine}>
                    <h4 className={styles.titleInput}>Public :</h4>
                    <div className={styles.inputField}>
                      <label
                        htmlFor="tout public"
                        className={styles.isSagaLabel}
                      >
                        <input
                          type="checkbox"
                          id="tout public"
                          checked={checkedPublic.includes("tout_public")}
                          onChange={() => handleCheck("tout_public")}
                          className={styles.input}
                        ></input>
                        Tout public
                      </label>
                      <label
                        htmlFor="young adult"
                        className={styles.isSagaLabel}
                      >
                        <input
                          type="checkbox"
                          id="young adult"
                          checked={checkedPublic.includes("young_adult")}
                          onChange={() => handleCheck("young_adult")}
                          className={styles.input}
                        ></input>
                        Young Adult
                      </label>
                      <label htmlFor="adulte" className={styles.isSagaLabel}>
                        <input
                          type="checkbox"
                          id="adulte"
                          checked={checkedPublic.includes("adulte")}
                          onChange={() => handleCheck("adulte")}
                          className={styles.input}
                        ></input>
                        Adulte
                      </label>
                    </div>
                  </div>
                  {/* Lignes saga */}
                  <div className={styles.filterLine}>
                    <h4 className={styles.titleInput}>Est dans une saga :</h4>
                    <div className={styles.inputField}>
                      <label htmlFor="sagatrue">
                        <input
                          type="radio"
                          id="sagatrue"
                          name="isSaga"
                          value={filterIsSaga}
                          onChange={() => setFilterIsSaga("True")}
                          checked={filterIsSaga === "True"}
                          className={styles.input}
                        />
                        Oui
                      </label>
                      <label htmlFor="sagafalse">
                        <input
                          type="radio"
                          id="sagafalse"
                          name="isSaga"
                          value={filterIsSaga}
                          onChange={() => setFilterIsSaga("False")}
                          checked={filterIsSaga === "False"}
                          className={styles.input}
                        />
                        Non
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.selectedThemesArea}>{selectedTheme}</div>
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={styles.buttonEmpty}
                  onClick={handleResetFilter}
                >
                  Réinitialiser
                </button>
                <button
                  className={styles.buttonFull}
                  onClick={handleSearchByFilter}
                >
                  Rechercher
                </button>
              </div>
            </div>
          )}
        </div>
        {!browseMode ? (
          <>
            <section className={styles.bookSection}>
              <h3 className={styles.sectionTitle}>
                Les dernières publications :
              </h3>
              <div className={styles.bookListing}>{latestBooks}</div>
            </section>
            <section className={styles.bookSection}>
              <h3 className={styles.sectionTitle}>Les mieux notés :</h3>
              <div className={styles.bookListing}>{bestBooks}</div>
            </section>
          </>
        ) : (
          <div className={styles.bookFilterListing}>{books}</div>
        )}
      </main>
    </div>
  );
}

export default Browse;
