import styles from "../../../../styles/NewCharacter.module.css";
import Header from "../../../../components/Header";
import ToggleButton from "../../../../components/ToggleButton";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import { useState, useEffect } from "react";
import Image from "next/image";

const NewCharacter = () => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  const [bookAuthor, setBookAuthor] = useState<string>("");
  // Etat pour gérer le fichier photo
  const [photo, setPhoto] = useState<File | null>(null);

  interface Study {
    domain: string;
    level: string;
    state: string;
  }

  interface Job {
    job: string;
    place: string;
  }

  interface Family {
    member: string;
    fullname: string;
    deceased: boolean;
    cause: string;
  }

  interface Addiction {
    type: string;
    intensity: string;
  }

  interface Trait {
    id: number;
    trait: string;
    type: string;
  }

  // Etat pour gérer les états d'inputs
  const [fullName, setFullName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [specie, setSpecie] = useState<string>("");
  const [isRace, setIsRace] = useState<boolean>(false);
  const [race, setRace] = useState<string>("");
  const [dayBirth, setDayBirth] = useState<number>(0);
  const [monthBirth, setMonthBirth] = useState<number>(0);
  const [hometown, setHometown] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [job, setJob] = useState<Job>({ job: "", place: "" });
  const [relationship, setRelationship] = useState<string>("");
  const [familyRelation, setFamilyRelation] = useState<Family[]>([]);
  const [religion, setReligion] = useState<string>("");
  const [addictions, setAddictions] = useState<Addiction[]>([]);
  const [fears, setFears] = useState<string[]>([]);
  const [talents, setTalents] = useState<string[]>([]);
  const [background, setBackground] = useState<string>("");
  // Etats pour gérer les traits de personnalités
  const [currentWord, setCurrentWord] = useState<string>("");
  const [traitsSuggestion, setTraitsSuggestion] = useState<Trait[]>([]);
  const [stockedTraits, setStockedTraits] = useState<Trait[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/getbookinfo/${slug}/`)
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            console.log(data);
            setBookAuthor(data.author_name);

            if (!user.token) {
              router.push(`/book/${slug}/bookuniverse`);
              return;
            }

            if (user.token !== data.author_token) {
              router.push(`/book/${slug}/bookuniverse`);
              return;
            }
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

  // Fonction pour mettre à jour la photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  let stylePhotoContainer = {};
  if (photo) {
    stylePhotoContainer = { border: "none" };
  }

  // Fonction pour gérer le ToggleButton de la race
  const handleToggleRaceChange = (x: boolean) => {
    setIsRace((x) => !x);
  };

  //Fonction pour ajouter un input Langue
  const addLanguageInput = (): void => {
    setLanguages((prev) => [...prev, ""]);
  };
  // Fonction pour supprimer un input Langue
  const deleteLanguageInput = (i: number): void => {
    setLanguages((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer la valeur de chaque input Language
  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ): void => {
    const newLanguages = [...languages];
    newLanguages[i] = e.target.value;
    setLanguages(newLanguages);
  };

  // Fonction pour ajouter les inputs d'études
  const addStudyInputs = (): void => {
    setStudies((prev) => [...prev, { domain: "", level: "", state: "" }]);
  };
  // Fonction pour supprimer les inputs d'un Study
  const deleteStudyInput = (i: number): void => {
    setStudies((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer la valeur de chaque input Etudes
  const handleStudyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    i: number
  ): void => {
    const { name, value } = e.target;

    setStudies((prev) =>
      prev.map((study, index) =>
        index === i ? { ...study, [name]: value } : study
      )
    );
  };

  // Fonction pour gérer le toggle button de la mort d'un membre
  const handleToggleDeathChange = (x: boolean, i: number) => {
    setFamilyRelation((prev) =>
      prev.map((oneMember, index) =>
        index === i ? { ...oneMember, deceased: !x } : oneMember
      )
    );
  };

  // Fonction pour ajouter les inputs de lien familiale
  const addFamily = (): void => {
    setFamilyRelation((prev) => [
      ...prev,
      { member: "", fullname: "", deceased: false, cause: "" },
    ]);
  };
  // Fonction pour supprimer un membre de famille
  const deleteFamilyInput = (i: number) => {
    setFamilyRelation((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer les valeurs des inputs Family
  const handleFamilyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    i: number
  ): void => {
    const { name, value } = e.target;

    setFamilyRelation((prev) =>
      prev.map((oneMember, index) =>
        index === i ? { ...oneMember, [name]: value } : oneMember
      )
    );
  };

  // Fonction pour ajouter une addiction
  const addAddiction = (): void => {
    setAddictions((prev) => [...prev, { type: "", intensity: "" }]);
  };
  // Fonction pour supprimer une dépendance
  const deleteAddictionInput = (i: number): void => {
    setAddictions((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer les valeurs d'inputs d'addiction
  const handleAddictionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    i: number
  ): void => {
    const { name, value } = e.target;

    setAddictions((prev) =>
      prev.map((oneAddiction, index) =>
        index === i ? { ...oneAddiction, [name]: value } : oneAddiction
      )
    );
  };

  // fonction pour générér la suggestion et stocker un thème
  const handleThemeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentWord(value);
    // génère les suggestions depuis le fichier json
    if (value.trim() === "") {
      setTraitsSuggestion([]);
    } else {
      fetch("/assets/data/traits_de_caractere_complets_long.json")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const filtered = data.filter((oneTrait: Trait) =>
              oneTrait.trait.toLowerCase().startsWith(value.toLowerCase())
            );
            filtered.sort();
            setTraitsSuggestion(filtered);
          }
        })
        .catch((error) => {
          alert(`Une erreur s'est produite dans les suggestions : ${error}`);
        });
    }
  };

  // Fonction pour ajouter le mot dans les traits
  const addWord = (object: Trait) => {
    if (stockedTraits.length < 10) {
      for (let oneTrait of stockedTraits) {
        if (object.trait === oneTrait.trait) {
          alert("Vous ne pouvez pas ajouter le même thème 2 fois");
          return;
        }
      }
      setStockedTraits((prev) => [...prev, object]);
      setCurrentWord("");
      setTraitsSuggestion([]);
    } else {
      alert(
        "Vous ne pouvez pas attribuer plus de 10 traits à votre personnage."
      );
    }
  };

  // Fonction pour supprimer un trait
  const handleDeleteTrait = (index: number): void => {
    setStockedTraits((prev) => prev.filter((e) => e.id !== index));
  };

  // Fonction pour convertir les traits suggérés en tag coloré
  const suggestiontraits = traitsSuggestion.map((e: Trait) => {
    let traitStyle = {};
    e.type === "positif" && (traitStyle = { backgroundColor: "#107E7D" });
    e.type === "neutre" && (traitStyle = { backgroundColor: "grey" });
    e.type === "négatif" && (traitStyle = { backgroundColor: "#CB3138" });

    return (
      <div
        key={e.id}
        style={traitStyle}
        className={styles.suggestTraits}
        onClick={() => addWord(e)}
      >
        <h6 className={styles.traitName}>
          {e.trait[0].toUpperCase()}
          {e.trait.slice(1)}
        </h6>
      </div>
    );
  });
  // Fonction pour convertir les traits sélectionnés en tag coloré
  const traits = stockedTraits.map((e: Trait) => {
    let traitStyle = {};
    e.type === "positif" && (traitStyle = { backgroundColor: "#107E7D" });
    e.type === "neutre" && (traitStyle = { backgroundColor: "grey" });
    e.type === "négatif" && (traitStyle = { backgroundColor: "#CB3138" });

    return (
      <div key={e.id} style={traitStyle} className={styles.traitTag}>
        <h6 className={styles.traitName}>{e.trait}</h6>
        <button
          onClick={() => handleDeleteTrait(e.id)}
          className={styles.deleteTraitBtn}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
  });

  // Fonction pour ajouter un input de peur
  const addFear = (): void => {
    setFears((prev) => [...prev, ""]);
  };
  // Fonction pour supprimer un input de peur
  const deleteFearInput = (i: number): void => {
    setFears((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer la valeur des inputs de peur
  const handleFearChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ): void => {
    const newFears = [...fears];
    newFears[i] = e.target.value;
    setFears(newFears);
  };

  // Fonction pour ajouter un input de peur
  const addTalent = (): void => {
    setTalents((prev) => [...prev, ""]);
  };
  // Fonction pour supprimer un input de peur
  const deleteTalentInput = (i: number): void => {
    setTalents((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer la valeur des inputs de peur
  const handleTalentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ): void => {
    const newTalents = [...talents];
    newTalents[i] = e.target.value;
    setTalents(newTalents);
  };

  // Fonction pour envoyer le formulaire à la création de personnage
  const handleSubmit = (): void => {
    if (!user.token) {
      alert("Votre session a expiré, reconnectez-vous.");
      return;
    }

    if (isRace && race.trim() === "") {
      alert("Vous devez renseignez une race");
      return;
    }

    if (!photo) {
      alert("Veuillez importer une image");
      return;
    }

    if (
      fullName.trim() === "" ||
      !fullName ||
      !role ||
      age === 0 ||
      !gender ||
      !height ||
      height.trim() === "" ||
      !slogan ||
      slogan.trim() === "" ||
      background.trim() === "" ||
      !background
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
    }

    //  initialisation du FormData
    const formData = new FormData();
    // Ajout des données dans le formData
    formData.append("token", user.token);
    formData.append("book", `${slug}`);
    photo && formData.append("image", photo);
    fullName && formData.append("name", fullName);
    surname && formData.append("surname", surname);
    role && formData.append("role", role);
    age > 0 && formData.append("age", age.toString());
    gender && formData.append("sexe", gender);
    height && formData.append("height", height);
    slogan && formData.append("slogan", slogan);
    specie && formData.append("species", specie);
    formData.append("is_there_race", isRace.toString());
    isRace && formData.append("race", race);
    dayBirth > 0 && formData.append("day_birth", dayBirth.toString());
    monthBirth > 0 && formData.append("month_birth", monthBirth.toString());
    hometown && formData.append("hometown", hometown);
    languages.length > 0 &&
      formData.append("languages", JSON.stringify(languages));
    studies.length > 0 && formData.append("studies", JSON.stringify(studies));
    job.job && job.place && formData.append("job", JSON.stringify(job));
    relationship && formData.append("relation", relationship);
    familyRelation.length > 0 &&
      formData.append("family", JSON.stringify(familyRelation));
    religion && formData.append("religion", religion);
    addictions.length > 0 &&
      formData.append("addictions", JSON.stringify(addictions));
    stockedTraits.length > 0 &&
      formData.append("traits", JSON.stringify(stockedTraits));
    fears.length > 0 && formData.append("fears", JSON.stringify(fears));
    talents.length > 0 && formData.append("talents", JSON.stringify(talents));
    background && formData.append("background", background);

    // Envoie du formData pour la création du personnage
    fetch(`http://127.0.0.1:8000/api/createcharacter/`, {
      method: "POST",
      body: formData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            console.log("NOUVEAU PERSO 🙌🙌🙌", data);
            setPhoto(null);
            setFullName("");
            setSurname("");
            setRole("");
            setAge(0);
            setGender("");
            setHeight("");
            setSlogan("");
            setSpecie("");
            setIsRace(false);
            setDayBirth(0);
            setMonthBirth(0);
            setRace("");
            setHometown("");
            setLanguages([]);
            setStudies([]);
            setJob({ job: "", place: "" });
            setRelationship("");
            setFamilyRelation([]);
            setReligion("");
            setAddictions([]);
            setStockedTraits([]);
            setFears([]);
            setTalents([]);
            setBackground("");
            alert(`Votre personnage ${data.name} a bien été enregistré.e`);
            router.push(`/book/${data.book}/bookuniverse`);
          }
        })
      )
      // .then(async (res) => {
      //   const text = await res.text();
      //   console.log("Réponse brute :", text); // <== regarde ce qui est réellement renvoyé
      // })
      .catch((error) => {
        console.error("Erreur lors de l'ajout d'un personnage :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  const deleteBook = (bookSlug: string): void => {
    bookSlug === slug && router.push("/");
  };

  console.log(stockedTraits);
  console.log("📸📸📸", photo);

  return (
    <div className={styles.global}>
      <Header deleteBook={deleteBook} />
      <main className={styles.main}>
        <button
          onClick={() => router.push(`/book/${slug}/bookuniverse`)}
          className={styles.backLink}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={styles.backArrow} />
          {"Retour sur l'univers du livre"}
        </button>
        <div className={styles.form}>
          <section className={styles.general}>
            <div
              className={styles.photoInputContainer}
              style={stylePhotoContainer}
            >
              {photo && (
                <div>
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt="Preview"
                    width={300}
                    height={300}
                    className={styles.photoPreview}
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
            <div className={styles.rigthPart}>
              <input
                type="text"
                placeholder="Nom complet *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Surnom"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className={styles.input}
              />
              <select
                name="Rôle"
                id="characterRole"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.select}
              >
                <option value="">Rôle *</option>
                <option value="protagoniste">Protagoniste</option>
                <option value="allié">Allié</option>
                <option value="neutre">Neutre</option>
                <option value="adversaire">Adversaire</option>
                <option value="antagoniste">Antagoniste</option>
              </select>
              <input
                type="number"
                min={0}
                placeholder="Age*"
                value={age === 0 ? "" : age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={styles.input}
                required
              />
              <select
                name="Sexe"
                id="characterGender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Sexe *</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
              </select>
              <input
                type="text"
                placeholder="Taille *"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Informations de base</h2>
            <div className={styles.sectionContainer}>
              <div className={styles.backgroundContainer}>
                <textarea
                  name="slogan"
                  id="desc"
                  maxLength={150}
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className={styles.mantraArea}
                  placeholder="Ecrit le mantra de ton personnage (requis)"
                ></textarea>
              </div>
              <p className={styles.caracMantraLimit}>
                {background.length} / 150 caractères
              </p>
              <input
                type="text"
                placeholder="Espèce (humain, vampire,...)"
                value={specie}
                onChange={(e) => setSpecie(e.target.value)}
                className={styles.inputFacult}
                required
              />
              {/* RACE POTENTIELLE */}
              <div className={styles.oneLine}>
                <p>Appartient à un type ou une race : </p>
                <ToggleButton
                  handleToggleChange={handleToggleRaceChange}
                  isChecked={isRace}
                />
                {isRace && (
                  <input
                    type="text"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    placeholder="Race ou type *"
                    className={styles.inputFacult}
                  />
                )}
              </div>
              {/* DATE DE NAISSANCE */}
              <div className={styles.oneLine}>
                <input
                  type="number"
                  min={0}
                  max={31}
                  placeholder="Jour de naissance"
                  value={dayBirth === 0 ? "" : dayBirth}
                  onChange={(e) => setDayBirth(Number(e.target.value))}
                  className={styles.input}
                />
                <select
                  name="Mois de naissance"
                  id="birthMonth"
                  value={monthBirth}
                  onChange={(e) => setMonthBirth(Number(e.target.value))}
                  className={styles.select}
                >
                  <option value="0">Mois de Naissance</option>
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Août</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>
              <input
                type="text"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
                placeholder="Ville natale"
                className={styles.input}
              />
              {/* Langues parlées */}
              <button onClick={addLanguageInput} className={styles.addBtn}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter une langue"}
              </button>
              <div className={styles.inputsContainer}>
                {languages.map((language: string, i: number) => (
                  <div className={styles.oneLine}>
                    <input
                      type="text"
                      key={i}
                      value={language}
                      onChange={(e) => handleLanguageChange(e, i)}
                      placeholder={`Langue ${i + 1}`}
                      className={styles.input}
                    />
                    <button
                      onClick={() => deleteLanguageInput(i)}
                      className={styles.deleteBtn}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {/* Etudes effectuées */}
              <button onClick={addStudyInputs} className={styles.addBtn}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter une étude"}
              </button>
              <div className={styles.inputsContainer}>
                {studies.map((oneStudy: Study, i: number) => (
                  <div className={styles.oneLine}>
                    <input
                      name="domain"
                      type="text"
                      key={`studyDomain ${i}`}
                      value={oneStudy.domain}
                      onChange={(e) => handleStudyChange(e, i)}
                      placeholder={`Domaine ${i + 1}`}
                      className={styles.input}
                    />
                    <select
                      name="level"
                      id={`studyLevel ${i}`}
                      value={oneStudy.level}
                      onChange={(e) => handleStudyChange(e, i)}
                      className={styles.select}
                    >
                      <option value="">--Niveau d'études--</option>
                      <option value="Primaire">Primaire</option>
                      <option value="Collège">Collège</option>
                      <option value="Lycée">Lycée</option>
                      <option value="Université">Université</option>
                      <option value="Master">Master</option>
                      <option value="Doctorat">Doctorat</option>
                    </select>
                    <select
                      name="state"
                      id={`studyState ${i}`}
                      value={oneStudy.state}
                      onChange={(e) => handleStudyChange(e, i)}
                      className={styles.select}
                    >
                      <option value="">--Etat--</option>
                      <option value="Diplômé">Diplômé</option>
                      <option value="En cours">En cours</option>
                      <option value="Abandonné">Abandonné</option>
                      <option value="Interrompu">Interrompu</option>
                    </select>
                    <button
                      onClick={() => deleteStudyInput(i)}
                      className={styles.deleteBtn}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {/* Profession */}
              <div className={styles.oneLine}>
                <input
                  type="text"
                  value={job.job}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, job: e.target.value }))
                  }
                  placeholder="Profession"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={job.place}
                  onChange={(e) =>
                    setJob((prev) => ({ ...prev, place: e.target.value }))
                  }
                  placeholder="Lieu"
                  className={styles.input}
                />
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Vie Personnelle</h2>
            <div className={styles.sectionContainer}>
              <select
                name="Relation matrimoniale"
                id="relationshipSituation"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className={styles.selectFacult}
              >
                <option value="">--Situation matrimoniale--</option>
                <option value="célibataire">Célibataire</option>
                <option value="en couple">En couple</option>
                <option value="fiancé.e">Fiancé.e</option>
                <option value="marié.e">Marié.e</option>
                <option value="divorcé.e">Divorcé.e</option>
                <option value="veuf.ve">Veuf.ve</option>
              </select>
              {/* Relation familiale */}
              <button className={styles.addBtn} onClick={addFamily}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter un membre de la famille"}
              </button>
              {familyRelation.map((oneMember: Family, i: number) => (
                <div className={styles.oneLine} style={{ marginLeft: 25 }}>
                  <div>
                    <div className={styles.oneLine}>
                      <select
                        name="member"
                        id={`familyMember${i}`}
                        className={styles.selectFacult}
                        value={oneMember.member}
                        onChange={(e) => handleFamilyChange(e, i)}
                      >
                        <option value="">--Lien familiale--</option>
                        <option value="Père">Père</option>
                        <option value="Mère">Mère</option>
                        <option value="Fils">Fils</option>
                        <option value="Fille">Fille</option>
                        <option value="Frère">Frère</option>
                        <option value="Soeur">Soeur</option>
                        <option value="Epoux">Epoux</option>
                        <option value="Epouse">Epouse</option>
                        <option value="Fiancé">Fiancé</option>
                        <option value="Fiancée">Fiancée</option>
                        <option value="Petit-ami">Petit-ami</option>
                        <option value="Petite-amie">Petite-amie</option>
                        <option value="Oncle">Oncle</option>
                        <option value="Tante">Tante</option>
                        <option value="Neveu">Neveu</option>
                        <option value="Nièce">Nièce</option>
                        <option value="Cousin">Cousin</option>
                        <option value="Cousine">Cousine</option>
                        <option value="Grand-Père">Grand-Père</option>
                        <option value="Grand-Mère">Grand-Mère</option>
                        <option value="Petit-fils">Petit-fils</option>
                        <option value="Petite-fille">Petite-fille</option>
                        <option value="Parrain">Parrain</option>
                        <option value="Marraine">Marraine</option>
                        <option value="Ancêtre">Ancêtre</option>
                        <option value="Descendant">Descendant</option>
                      </select>
                      <input
                        name="fullname"
                        type="text"
                        placeholder="Nom complet"
                        className={styles.inputFacult}
                        value={oneMember.fullname}
                        onChange={(e) => handleFamilyChange(e, i)}
                      />
                      <p>Décédé.e :</p>
                      <ToggleButton
                        key={i}
                        handleToggleChange={(x: boolean) =>
                          handleToggleDeathChange(x, i)
                        }
                        isChecked={oneMember.deceased}
                      />
                    </div>
                    {oneMember.deceased && (
                      <input
                        name="cause"
                        type="text"
                        placeholder="Cause du décès"
                        className={styles.inputFacult}
                        value={familyRelation[i].cause}
                        onChange={(e) => handleFamilyChange(e, i)}
                        style={{ marginLeft: 25 }}
                      />
                    )}
                  </div>
                  <button
                    className={styles.deleteBtn}
                    style={{ marginTop: 0 }}
                    onClick={() => deleteFamilyInput(i)}
                  >
                    X
                  </button>
                </div>
              ))}
              {/* Religion */}
              <input
                type="text"
                placeholder="Religion"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className={styles.input}
              />
              <button className={styles.addBtn} onClick={addAddiction}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter une dépendance"}
              </button>
              {addictions.map((oneAddiction: Addiction, i: number) => (
                <div className={styles.oneLine} style={{ marginLeft: 25 }}>
                  <input
                    type="text"
                    name="type"
                    value={oneAddiction.type}
                    onChange={(e) => handleAddictionChange(e, i)}
                    placeholder={`Addiction ${i + 1}`}
                    className={styles.input}
                  />
                  <select
                    name="intensity"
                    id={`addictionIntensity${i}`}
                    className={styles.select}
                    value={oneAddiction.intensity}
                    onChange={(e) => handleAddictionChange(e, i)}
                  >
                    <option value="">--Intensity--</option>
                    <option value="Récréatif">Récréatif</option>
                    <option value="Régulière">Régulière</option>
                    <option value="Fréquente">Fréquente</option>
                    <option value="Quotidienne">Quotidienne</option>
                    <option value="Excessive">Excessive</option>
                    <option value="Sévère">Sévère</option>
                  </select>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteAddictionInput(i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </section>
          {/* PERSONNALITE */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Personnalité</h2>
            <div className={styles.sectionContainer}>
              {/* Traits de personnalité */}
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Traits de caractères :</h4>
                <input
                  type="text"
                  value={currentWord}
                  onChange={(e) => handleThemeInputChange(e)}
                  placeholder="Tapez un mot pour lancer la recherche"
                  className={styles.searchInput}
                />
              </div>
              {traitsSuggestion.length > 0 && (
                <div className={styles.suggestionContainer}>
                  {suggestiontraits}
                </div>
              )}
              <div className={styles.selectedTraitsArea}>
                {stockedTraits.length > 0 && traits}
              </div>

              {/* Peur / Phobie */}
              <button className={styles.addBtn} onClick={addFear}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter une peur"}
              </button>
              {fears.map((oneFear: string, i: number) => (
                <div className={styles.oneLine} style={{ marginLeft: 25 }}>
                  <input
                    type="text"
                    key={i}
                    value={oneFear}
                    onChange={(e) => handleFearChange(e, i)}
                    placeholder={`Peur ${i + 1}`}
                    className={styles.input}
                  />
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteFearInput(i)}
                  >
                    X
                  </button>
                </div>
              ))}

              {/* Talents */}
              <button className={styles.addBtn} onClick={addTalent}>
                <FontAwesomeIcon icon={faPlus} />
                {" Ajouter un talent"}
              </button>
              {talents.map((oneTalent: string, i: number) => (
                <div className={styles.oneLine} style={{ marginLeft: 25 }}>
                  <input
                    type="text"
                    key={i}
                    value={oneTalent}
                    onChange={(e) => handleTalentChange(e, i)}
                    placeholder={`Talent ${i + 1}`}
                    className={styles.input}
                  />
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteTalentInput(i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Background *</h2>
            <div className={styles.backgroundContainer}>
              <textarea
                name="background"
                id="desc"
                maxLength={3000}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className={styles.backgroundArea}
              ></textarea>
            </div>
            <p className={styles.caracLimit}>
              {background.length} / 3000 caractères
            </p>
          </section>
          <div className={styles.submitContainer}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Enregistrer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCharacter;
