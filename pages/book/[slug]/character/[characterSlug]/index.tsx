import styles from "../../../../../styles/Character.module.css";
import Header from "../../../../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UseSelector } from "react-redux";

const Character = () => {
  const router = useRouter();
  const { slug, characterSlug } = router.query;

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

  const [addictions, setAddictions] = useState<Addiction[]>([]);
  const [age, setAge] = useState<number>(0);
  const [background, setBackground] = useState<string>("");
  const [dayBirth, setDayBirth] = useState<number>(0);
  const [monthBirth, setMonthBirth] = useState<number>(0);
  const [family, setFamily] = useState<Family[]>([]);
  const [fears, setFears] = useState<string[]>([]);
  const [height, setHeight] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isRace, setIsRace] = useState<boolean>(false);
  const [job, setJob] = useState<Job>({ job: "", place: "" });
  const [languages, setLanguages] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [relation, setRelation] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [studies, setStudies] = useState<Study[]>([]);
  const [surname, setSurname] = useState<string>("");
  const [talents, setTalents] = useState<string[]>([]);
  const [traits, setTraits] = useState<Trait[]>([]);
  const [zodiac, setZodiac] = useState<string>("");

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${slug}/getcharacterinfo/${characterSlug}/`
    )
      .then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            console.log(data);
            setAddictions(data.addictions);
            setAge(data.age);
            setBackground(data.background);
            setDayBirth(data.day_birth);
            setMonthBirth(data.month_birth);
            setFamily(data.family);
            setFears(data.fears);
            setHeight(data.height);
            setHometown(data.hometown);
            setImage(data.image);
            setIsRace(data.is_there_race);
            setJob(data.job);
            setLanguages(data.languages);
            setName(data.name);
            setRace(data.race);
            setRelation(data.relation);
            setReligion(data.religion);
            setRole(data.role);
            setGender(data.sexe);
            setSpecies(data.species);
            setStudies(data.studies);
            setSurname(data.surname);
            setTalents(data.talents);
            setTraits(data.traits);
            setZodiac(data.zodiac_sign);
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
  }, [name]);

  // Styles pour adapter le tag au rôle
  let roleStyles = {};
  if (role === "protagoniste") {
    roleStyles = {
      backgroundColor: "rgba(45, 125, 201, 0.5)",
      border: "solid 2px rgb(45, 125, 201)",
    };
  } else if (role === "allié") {
    roleStyles = {
      backgroundColor: "rgba(16, 126, 125, 0.5)",
      border: "solid 2px rgb(16, 126, 125)",
    };
  } else if (role === "neutre") {
    roleStyles = {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      border: "solid 2px grey",
    };
  } else if (role === "adversaire") {
    roleStyles = {
      backgroundColor: "rgba(203, 49, 56, 0.5)",
      border: "solid 2px rgb(203, 49, 56)",
    };
  } else if (role === "antagoniste") {
    roleStyles = {
      backgroundColor: "rgba(32, 32, 32, 0.5)",
      border: "solid 2px rgba(32, 32, 32, 1)",
    };
  } else {
    roleStyles = {
      backgroundColor: "#e2851393",
      border: "solid 2px #E28413",
    };
  }

  // Conversion du mois chiffré en mois
  let monthInString = "";
  switch (monthBirth) {
    case 1:
      monthInString = "Janvier";
      break;
    case 2:
      monthInString = "Février";
      break;
    case 3:
      monthInString = "Mars";
      break;
    case 4:
      monthInString = "Avril";
      break;
    case 5:
      monthInString = "Mai";
      break;
    case 6:
      monthInString = "Juin";
      break;
    case 7:
      monthInString = "Juillet";
      break;
    case 8:
      monthInString = "Août";
      break;
    case 9:
      monthInString = "Septembre";
      break;
    case 10:
      monthInString = "Octobre";
      break;
    case 11:
      monthInString = "Novembre";
      break;
    case 12:
      monthInString = "Décembre";
      break;
    default:
      monthInString = "Inconnu";
  }

  // Tri des langues par odre alphabétique
  languages?.sort();
  // converstion tableau language en composant
  const langues = languages.map((element: string, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element}</h6>
      </div>
    );
  });

  // Tri des études par niveau d'études
  const studyLevelOrder: Record<string, number> = {
    Doctorat: 1,
    Master: 2,
    Université: 3,
    Lycée: 4,
    Collège: 5,
    Primaire: 6,
  };
  studies?.sort((a: Study, b: Study): any => {
    const priorityDiff = studyLevelOrder[a.level] - studyLevelOrder[b.level];
    if (priorityDiff !== 0) return priorityDiff;

    if (a.state === "Diplômé" && b.state !== "Diplômé") return -1;
    if (a.state !== "Diplômé" && b.state === "Diplômé") return 1;
  });
  // Convertion tableau language en composant
  const etudes = studies?.map((element: Study, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.domain}</h6>
        <h6 className={styles.strictSquare}>{element.level}</h6>
        <h6 className={styles.strictSquare}>{element.state}</h6>
      </div>
    );
  });

  // Tri des familles par les décès
  const priorityOrder: Record<string, number> = {
    false: 1,
    true: 2,
  };
  family?.sort(
    (a, b) =>
      priorityOrder[String(a.deceased)] - priorityOrder[String(b.deceased)]
  );
  // Convertion tableau Family en composant
  const familyMembers = family?.map((element: Family, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.member}</h6>
        <h6 className={styles.strictSquare}>{element.fullname}</h6>
        {element.deceased && (
          <h6 className={styles.strictSquare}>{`✝️ ${element.cause}`}</h6>
        )}
      </div>
    );
  });

  // Tri des addictions par ordre d'intensité
  const intensityOrder: Record<string, number> = {
    Récréatif: 1,
    Régulière: 2,
    Fréquente: 3,
    Quotidienne: 4,
    Excessive: 5,
    Sévère: 6,
  };
  addictions &&
    addictions.sort(
      (a, b) => intensityOrder[a.intensity] - intensityOrder[b.intensity]
    );
  // Convertion tableau Addictions en composant
  const dependances = addictions?.map((element: Addiction, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.type}</h6>
        <h6 className={styles.strictSquare}>{element.intensity}</h6>
      </div>
    );
  });

  // Tri des traits par ordre alphabéthique
  traits?.sort((a, b) => a.trait.localeCompare(b.trait));
  // Convertion tableau Traits en composant
  const Caracteres = traits?.map((element: Trait, i: number) => {
    //Adapte la couleur du tag avec le type de Traits
    let traitStyle = {};
    if (element.type === "positif") {
      traitStyle = { backgroundColor: "#107E7D" };
    } else if (element.type === "neutre") {
      traitStyle = { backgroundColor: "grey" };
    } else if (element.type === "négatif") {
      traitStyle = { backgroundColor: "#CB3138" };
    }

    return (
      <h6 style={traitStyle} className={styles.tag}>
        {element.trait}
      </h6>
    );
  });

  // Tri des phobies par ordre alphabétique
  fears?.sort();
  // Conversion tableau Fear en composant
  const peurs = fears?.map((element: string, i: number) => {
    return (
      <h6 key={i} className={styles.strictSquare}>
        {element[0].toUpperCase()}
        {element.slice(1)}
      </h6>
    );
  });

  // Tri des talents pas ordre alphabétique
  talents?.sort();
  // Conversion tableau Talent en composant
  const hobbies = talents?.map((element: string, i: number) => {
    return (
      <h6 key={i} className={styles.strictSquare}>
        {element[0].toUpperCase()}
        {element.slice(1)}
      </h6>
    );
  });

  const deleteBook = (bookSlug: string): void => {
    bookSlug === slug && router.push("/");
  };

  return (
    <div className={styles.global}>
      <Header deleteBook={deleteBook} />
      <main className={styles.main}>
        <button
          onClick={() => router.push(`/book/${slug}/bookuniverse`)}
          className={styles.backLink}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={styles.backArrow} />
          {"Retour sur la découverte de l'univers"}
        </button>
        <div className={styles.form}>
          <section className={styles.basic}>
            {image && (
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className={styles.photo}
              />
            )}
            <div className={styles.rightBasic}>
              <h1 className={styles.characterName}>{name}</h1>
              <h6 className={styles.characterRole} style={roleStyles}>
                {role && role[0].toUpperCase()}
                {role.slice(1)}
              </h6>
              <div className={styles.subBasic}>
                <h6 className={styles.flexibleSquare}>{age} ans</h6>
                <h6 className={styles.flexibleSquare}>
                  {gender && gender[0].toUpperCase()}
                  {gender.slice(1)}
                </h6>
                <h6 className={styles.flexibleSquare}>{height}</h6>
              </div>
            </div>
          </section>
          {/* INFORMATIONS DE BASES */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Informations générales</h2>
            {/* Surnom */}
            {surname && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Surnom :</h4>
                <h6 className={styles.strictSquare}>{surname}</h6>
              </div>
            )}
            {/* Espèce */}
            {species && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Espèce :</h4>
                <h6 className={styles.strictSquare}>
                  {species[0].toUpperCase()}
                  {species.slice(1)}
                </h6>
              </div>
            )}
            {/* Race */}
            {isRace && race && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Race :</h4>
                <h6 className={styles.strictSquare}>
                  {race[0].toUpperCase()}
                  {race.slice(1)}
                </h6>
              </div>
            )}
            {/* Date de naissance */}
            {dayBirth && monthBirth && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Naissance :</h4>
                <div className={styles.severalSquares}>
                  <h6
                    className={styles.strictSquare}
                  >{`${zodiac} ${dayBirth} ${monthInString}`}</h6>
                  <h6 className={styles.strictSquare}>{hometown}</h6>
                </div>
              </div>
            )}
            {/* Langues parlés */}
            {languages?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Langues :</h4>
                <div>{langues}</div>
              </div>
            )}
            {/* Etudes */}
            {studies?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Etudes :</h4>
                <div>{etudes}</div>
              </div>
            )}
            {/* Travail ou métier */}
            {job.job && job.place && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Profession :</h4>
                <div className={styles.severalSquares}>
                  <h6 className={styles.strictSquare}>{job.job}</h6>
                  <h6 className={styles.strictSquare}>{job.place}</h6>
                </div>
              </div>
            )}
          </section>

          {/* VIE PERSONNELLE */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Vie Personnelle</h2>
            {!relation &&
              family?.length === 0 &&
              !religion &&
              addictions?.length === 0 && (
                <p className={styles.noInfo}>
                  {`Aucune information n'a été trouvée sur la vie personnelle de ce personnage.
                  L'histoire vous apportera peut-être plus de réponse. 😉`}
                </p>
              )}
            {/* Situation Matrimoniale */}
            {relation && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Situation Matriomaniale :</h4>
                <h6 className={styles.strictSquare}>
                  {relation[0].toUpperCase()}
                  {relation.slice(1)}
                </h6>
              </div>
            )}
            {/* Situation familiale */}
            {family?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLinesInTwo}>
                  Situation Familiale :
                </h4>
                <div>{familyMembers}</div>
              </div>
            )}
            {/* Religion */}
            {religion && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Religion :</h4>
                <h6 className={styles.strictSquare}>{religion}</h6>
              </div>
            )}
            {/* Dépendances */}
            {addictions?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Dépendances :</h4>
                <div>{dependances}</div>
              </div>
            )}
          </section>
          {/* PERSONNALITE */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Personnalité</h2>
            {traits?.length === 0 &&
              fears?.length === 0 &&
              talents?.length === 0 && (
                <p
                  className={styles.noInfo}
                >{`Aucune information n'a été trouvée sur la personnalité de ce personnage.
                  L'histoire vous apportera peut-être plus de réponse. 😉`}</p>
              )}
            {/* Traits de caractère */}
            {traits?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>
                  Trait de caractères :
                </h4>
                <div className={styles.severalSquares}>{Caracteres}</div>
              </div>
            )}
            {/* Peurs et phobies */}
            {fears?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Peurs/Phobies :</h4>
                <div className={styles.severalSquares}>{peurs}</div>
              </div>
            )}
            {/* Talents */}
            {talents?.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Talents :</h4>
                <div className={styles.severalSquares}>{hobbies}</div>
              </div>
            )}
          </section>
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Background</h2>
            <div className={styles.backgroundContainer}>
              <p className={styles.background}>{background}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Character;
