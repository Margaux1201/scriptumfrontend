import styles from "../../../../styles/NewCharacter.module.css";
import Header from "../../../../components/Header";
import ToggleButton from "../../../../components/ToggleButton";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

  // Etat pour gérer les états d'inputs
  const [fullName, setFullName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [specie, setSpecie] = useState<string>("");
  const [isRace, setIsRace] = useState<boolean>(false);
  const [race, setRace] = useState<string>("");
  const [dayBirth, setDayBirth] = useState<number>(0);
  const [monthBirth, setMonthBirth] = useState<number>(0);
  const [hometown, setHometown] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [studies, setStudies] = useState<Study[]>([
    { domain: "", level: "", state: "" },
  ]);
  const [jobs, setJobs] = useState<Job | null>(null);

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
  const addLanguageInput = () => {
    setLanguages((prev) => [...prev, ""]);
  };
  // Fonction pour supprimer un input Langue
  const deleteLanguageInput = (i: number) => {
    setLanguages((prev) => prev.filter((_, index) => index !== i));
  };
  // Fonction pour changer la valeur de chaque input Language
  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newLanguages = [...languages];
    newLanguages[i] = e.target.value;
    setLanguages(newLanguages);
  };

  console.log(languages);

  return (
    <div className={styles.global}>
      <Header />
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
              <div>
                <button onClick={addLanguageInput}>Ajouter une langue</button>
                <div>
                  {languages.map((language: string, i: number) => (
                    <div>
                      <input
                        type="text"
                        key={i}
                        value={language}
                        onChange={(e) => handleLanguageChange(e, i)}
                        placeholder={`Langue ${i + 1}`}
                        className={styles.inputFacult}
                      />
                      <button onClick={() => deleteLanguageInput(i)}>X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default NewCharacter;
