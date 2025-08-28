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
    addictions: [{ type: "Marijuana", intensity: "Occasionnelle" }],
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

  // converstion tableau language en composant
  const langues = Sasha.language.map((element: string, i: number) => {
    return (
      <h6 key={i} className={styles.strictSquare}>
        {element}
      </h6>
    );
  });

  // converstion tableau language en composant
  const etudes = Sasha.study.map((element: Study, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.domain}</h6>
        <h6 className={styles.strictSquare}>{element.level}</h6>
        <h6 className={styles.strictSquare}>{element.state}</h6>
      </div>
    );
  });

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

  const dependances = Sasha.addictions.map((element: Addiction, i: number) => {
    return (
      <div className={styles.severalSquares} key={i}>
        <h6 className={styles.strictSquare}>{element.type}</h6>
        <h6 className={styles.strictSquare}>{element.intensity}</h6>
      </div>
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
              <div className={styles.oneLine}>
                <h4 className={styles.titleLine}>Langues :</h4>
                <div className={styles.severalSquares}>{langues}</div>
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
                <h6 className={styles.strictSquare}>{Sasha.relation}</h6>
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
        </div>
      </main>
    </div>
  );
};

export default Character;
