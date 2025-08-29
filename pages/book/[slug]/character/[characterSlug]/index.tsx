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

  interface Character {
    name: string;
    slug: string;
    slogan: string;
    url: string;
    role: string;
    age: number;
    gender: string;
    height: string;
    species: string;
    dayBirth: number;
    monthBirth: number;
    astro: string;
    hometown: string;
    language: string[];
    study: Study[];
    job: Job;
    relation: string;
    family: Family[];
    religion: string;
    addictions: Addiction[];
    traits: Trait[];
    fears: string[];
    talents: string[];
    background: string;
  }

  const Sasha: Character = {
    name: "Sasha Manners",
    slug: "sasha-manners",
    slogan: "Rien n'est magique, mais tout n'est pas explicable",
    url: "/assets/images/Sasha réaliste.png",
    role: "allié",
    age: 34,
    gender: "femme",
    height: "1m65",
    species: "Humain",
    dayBirth: 12,
    monthBirth: 3,
    astro: "♓",
    hometown: "Portland",
    language: ["Anglais"],
    study: [
      { domain: "Science Génétique", level: "Doctorat", state: "Interrompu" },
    ],
    job: { job: "Fille d'écurie", place: "Mojave" },
    relation: "marié.e",
    family: [
      {
        member: "Père",
        fullname: "Arthur Manners",
        deceased: true,
        cause: "Pandémie",
      },
      {
        member: "Mère",
        fullname: "Mary Manners",
        deceased: true,
        cause: "Pandémie",
      },
      {
        member: "Epoux.se",
        fullname: "Kinzie O'Donnell",
        deceased: false,
        cause: "",
      },
    ],
    religion: "Agnostique",
    addictions: [{ type: "Marijuana", intensity: "Récréatif" }],
    traits: [
      { id: 187, trait: "intelligent", type: "positif" },
      { id: 46, trait: "chaleureux", type: "positif" },
      { id: 325, trait: "curieux", type: "neutre" },
      { id: 103, trait: "maladroit", type: "négatif" },
    ],
    fears: ["chauve-souris", "eaux profondes"],
    talents: ["DJ"],
    background: `
    Elle grandit dans une famille aimante et connut une enfance heureuse, jusqu’à ses 17 ans où ses parents la chassèrent du foyer. Sans ressources, elle passa plusieurs mois sous un pont avant d’obtenir une bourse et un logement étudiant à Portland. Déterminée, elle poursuivit des études brillantes, visant un doctorat.

    Deux ans avant son examen final, la Grande Pandémie frappa. Elle survécut plusieurs semaines sur le campus avec d’autres étudiants et professeurs, jusqu’à ce qu’un groupe hostile renverse la communauté. En fuite, elle trouva refuge dans un immeuble de bureaux et y rencontra Kinzie O’Donnell. Ensemble, elles volèrent un camping-car de luxe et prirent la route, traversant un Ouest américain dévasté.

    Leur périple les mena finalement à la base de Mojave, où elles décidèrent de poser leurs bagages. C’est là qu’elles se marièrent, scellant leur lien après tant d’épreuves.
    `,
  };

  // Styles pour adapter le tag au rôle
  let roleStyles = {};
  if (Sasha.role === "protagoniste") {
    roleStyles = {
      backgroundColor: "rgba(45, 125, 201, 0.5)",
      border: "solid 2px rgb(45, 125, 201)",
    };
  } else if (Sasha.role === "allié") {
    roleStyles = {
      backgroundColor: "rgba(16, 126, 125, 0.5)",
      border: "solid 2px rgb(16, 126, 125)",
    };
  } else if (Sasha.role === "neutre") {
    roleStyles = {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      border: "solid 2px grey",
    };
  } else if (Sasha.role === "adversaire") {
    roleStyles = {
      backgroundColor: "rgba(32, 32, 32, 0.5)",
      border: "solid 2px rgba(32, 32, 32, 1)",
    };
  } else if (Sasha.role === "antagoniste") {
    roleStyles = {
      backgroundColor: "rgba(203, 49, 56, 0.5)",
      border: "solid 2px rgb(203, 49, 56)",
    };
  } else {
    roleStyles = {
      backgroundColor: "#e2851393",
      border: "solid 2px #E28413",
    };
  }

  // Conversion du mois chiffré en mois
  let monthInString = "";
  switch (Sasha.monthBirth) {
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
  Sasha.language.sort();
  // converstion tableau language en composant
  const langues = Sasha.language.map((element: string, i: number) => {
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
  Sasha.study.sort((a: Study, b: Study): any => {
    const priorityDiff = studyLevelOrder[a.level] - studyLevelOrder[b.level];
    if (priorityDiff !== 0) return priorityDiff;

    if (a.state === "Diplômé" && b.state !== "Diplômé") return -1;
    if (a.state !== "Diplômé" && b.state === "Diplômé") return 1;
  });
  // Convertion tableau language en composant
  const etudes = Sasha.study.map((element: Study, i: number) => {
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
  Sasha.family.sort(
    (a, b) =>
      priorityOrder[String(a.deceased)] - priorityOrder[String(b.deceased)]
  );
  // Convertion tableau Family en composant
  const familyMembers = Sasha.family.map((element: Family, i: number) => {
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
  Sasha.addictions.sort(
    (a, b) => intensityOrder[a.intensity] - intensityOrder[b.intensity]
  );
  // Convertion tableau Addictions en composant
  const dependances = Sasha.addictions.map((element: Addiction, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.type}</h6>
        <h6 className={styles.strictSquare}>{element.intensity}</h6>
      </div>
    );
  });

  // Tri des traits par ordre alphabéthique
  Sasha.traits.sort((a, b) => a.trait.localeCompare(b.trait));
  // Convertion tableau Traits en composant
  const Caracteres = Sasha.traits.map((element: Trait, i: number) => {
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
  Sasha.fears.sort();
  // Conversion tableau Fear en composant
  const peurs = Sasha.fears.map((element: string, i: number) => {
    return (
      <h6 key={i} className={styles.strictSquare}>
        {element[0].toUpperCase()}
        {element.slice(1)}
      </h6>
    );
  });

  // Tri des talents pas ordre alphabétique
  Sasha.talents.sort();
  // Conversion tableau Talent en composant
  const hobbies = Sasha.talents.map((element: string, i: number) => {
    return (
      <h6 key={i} className={styles.strictSquare}>
        {element[0].toUpperCase()}
        {element.slice(1)}
      </h6>
    );
  });

  return (
    <div className={styles.global}>
      <Header />
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
            <Image
              src={Sasha.url}
              alt={Sasha.name}
              width={300}
              height={300}
              className={styles.photo}
            />
            <div className={styles.rightBasic}>
              <h1 className={styles.characterName}>{Sasha.name}</h1>
              <h6 className={styles.characterRole} style={roleStyles}>
                {Sasha.role[0].toUpperCase()}
                {Sasha.role.slice(1)}
              </h6>
              <div className={styles.subBasic}>
                <h6 className={styles.flexibleSquare}>{Sasha.age} ans</h6>
                <h6 className={styles.flexibleSquare}>
                  {Sasha.gender[0].toUpperCase()}
                  {Sasha.gender.slice(1)}
                </h6>
                <h6 className={styles.flexibleSquare}>{Sasha.height}</h6>
              </div>
            </div>
          </section>
          {/* INFORMATIONS DE BASES */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Informations générales</h2>
            <div className={styles.oneLine}>
              <h4 className={styles.titleLine}>Espèce :</h4>
              <h6 className={styles.strictSquare}>{Sasha.species}</h6>
            </div>
            {/* Date de naissance */}
            {Sasha.dayBirth && Sasha.monthBirth && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Naissance :</h4>
                <div className={styles.severalSquares}>
                  <h6
                    className={styles.strictSquare}
                  >{`${Sasha.astro} ${Sasha.dayBirth} ${monthInString}`}</h6>
                  <h6 className={styles.strictSquare}>{Sasha.hometown}</h6>
                </div>
              </div>
            )}
            {/* Langues parlés */}
            {Sasha.language.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Langues :</h4>
                <div>{langues}</div>
              </div>
            )}
            {/* Etudes */}
            {Sasha.study.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Etudes :</h4>
                <div>{etudes}</div>
              </div>
            )}
            {/* Travail ou métier */}
            {Sasha.job && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Profession :</h4>
                <div className={styles.severalSquares}>
                  <h6 className={styles.strictSquare}>{Sasha.job.job}</h6>
                  <h6 className={styles.strictSquare}>{Sasha.job.place}</h6>
                </div>
              </div>
            )}
          </section>

          {/* VIE PERSONNELLE */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Vie Personnelle</h2>
            {!Sasha.relation &&
              Sasha.family.length === 0 &&
              !Sasha.religion &&
              Sasha.addictions.length === 0 && (
                <p className={styles.noInfo}>
                  {`Aucune information n'a été trouvée sur la vie personnelle de ce personnage.
                  L'histoire vous apportera peut-être plus de réponse. 😉`}
                </p>
              )}
            {/* Situation Matrimoniale */}
            {Sasha.relation && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Situation Matriomaniale :</h4>
                <h6 className={styles.strictSquare}>
                  {Sasha.relation[0].toUpperCase()}
                  {Sasha.relation.slice(1)}
                </h6>
              </div>
            )}
            {/* Situation familiale */}
            {Sasha.family.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLinesInTwo}>
                  Situation Familiale :
                </h4>
                <div>{familyMembers}</div>
              </div>
            )}
            {/* Religion */}
            {Sasha.religion && (
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Religion :</h4>
                <h6 className={styles.strictSquare}>{Sasha.religion}</h6>
              </div>
            )}
            {/* Dépendances */}
            {Sasha.addictions.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Dépendances :</h4>
                <div>{dependances}</div>
              </div>
            )}
          </section>
          {/* PERSONNALITE */}
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Personnalité</h2>
            {Sasha.traits.length === 0 &&
              Sasha.fears.length === 0 &&
              Sasha.talents.length === 0 && (
                <p
                  className={styles.noInfo}
                >{`Aucune information n'a été trouvée sur la personnalité de ce personnage.
                  L'histoire vous apportera peut-être plus de réponse. 😉`}</p>
              )}
            {/* Traits de caractère */}
            {Sasha.traits.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>
                  Trait de caractères :
                </h4>
                <div className={styles.severalSquares}>{Caracteres}</div>
              </div>
            )}
            {/* Peurs et phobies */}
            {Sasha.fears.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Peurs/Phobies :</h4>
                <div className={styles.severalSquares}>{peurs}</div>
              </div>
            )}
            {/* Talents */}
            {Sasha.talents.length > 0 && (
              <div className={styles.severalLines}>
                <h4 className={styles.titleForSeveralLines}>Talents :</h4>
                <div className={styles.severalSquares}>{hobbies}</div>
              </div>
            )}
          </section>
          <section className={styles.section}>
            <h2 className={styles.titleSection}>Background</h2>
            <div className={styles.backgroundContainer}>
              <p className={styles.background}>{Sasha.background}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Character;
