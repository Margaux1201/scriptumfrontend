import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Book.module.css';
import Header from '../../components/Header';
import Review from '../../components/Review';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;


  interface Warning {
    categorie: string;
    tags: string[];
  }

  interface Book {
    id: number;
    title: string;
    releaseDate: string;
    author: string;
    url: string;
    description: string;
    publicType: string;
    genres: string[];
    themes: string[];
    state: string;
    isSaga: boolean;
    tomeName: string;
    tomeNumber: number;
    rating: number;
    slug: string;
    warning: Warning[];
  }

  const bookEnDure : Book = {
    id: 47, 
    title: "Les sérums du Chaos", 
    releaseDate: "2025-08-08", 
    author: "Emily Ivessons", 
    url: "/assets/images/Evolved_Les_sérums_du_chaos.png",
    description: `Dix ans après la Grande Pandémie qui a ravagé le monde, les survivants se sont reconstruits malgré l'invasion des morts. Mike et Caleb, deux amis liés par les épreuves de cette sombre décennie, prospèrent dans la ville de Mojave où ils ont trouvé refuge avec leur groupe. Pourtant, ils devront affronter une nouvelle menace quand un soldat russe aux capacités surhumaines s'invite sur leur territoire avec d'étranges sérums qui chambouleront leur vie, ainsi que leur ADN.

    Pourquoi cibler leur camp ? Que cherche cet homme en transformant des innocents en êtres contre-nature ? Qu'a le sérum Amarok de si spécial pour susciter autant de convoitise ? Une chose est certaine : la lutte pour la survie est engagée contre ces forces émergentes aussi puissantes qu'impitoyables.`,
    publicType: "Adulte",
    genres: ["Science Fantasy", "Dystopie", "Thriller"],
    themes: ["Post-Apocalypse", "Créature Fantastique", "Surnaturel", "Manipulation génétique", "Zombies", "Pandémie"],
    state: "Terminé",
    isSaga: true,
    tomeName: "Evolved",
    tomeNumber: 1,
    rating: 3.4,
    slug: "Les-sérums-du-Chaos-Emily-Ivessons",
    warning: [{
      categorie: "🩸 Violence",
      tags: ["Violence graphique", "Meurtres ou assassinats"]},
      {
        categorie: "🧠 Santé mentale",
        tags: ["Anxiété", "Schizophrénie / hallucinations"]
      }, {
        categorie: "💔 Thèmes émotionnels difficiles",
        tags: ["Perte d'un proche / deuil", "Traumatisme / PTSD"]
      }, {
        categorie: "🐾 Autres avertissements",
        tags: ["Maltraitance animale", "Cannibalisme", "Gore / body horror", "Épidémie / pandémie", "Enlèvement"]
      }
    ]
  }


  interface Chapter {
    title: string | null;
    content: string;
    type: string;
    chapterNumber: number | null;
  }

  const chapterEnDure : Chapter[] = [{
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Prologue",
    chapterNumber: null,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 1,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 2,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 3,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 4,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 5,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Chapitre",
    chapterNumber: 6,
  },
  {
    title: null,
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat unde culpa ad laudantium. Id, dolorum? Dolores accusamus rerum voluptatem cumque facilis, modi esse asperiores maiores odio ipsum! Esse, incidunt eligendi.",
    type: "Epilogue",
    chapterNumber: null,
  },
  ]

  interface Review {
    user: string;
    score: number;
    comment: string;
    publicationDate: string;
  }

  const reviewsEnDure : Review[] = [{
    user: "Coco l'asticot",
    score: 4,
    comment: "Pas mal du tout !",
    publicationDate: "2025-06-11T09:18:27"
  },
  {
    user: "Caleb B.",
    score: 1,
    comment: "Une vraie merde. Je n'ai jamais lu autant de connerie sur cette supposée fiction. Respectez les victimes, bordel !",
    publicationDate: "2025-06-27T15:20:00"
  },
  {
    user: "Mimi",
    score: 5,
    comment: "Incroyable ! J'ai été pris du début à la fin. Hâte de lire le tome 2.",
    publicationDate: "2025-07-17T11:08:48"
  },
  {
    user: "Iamabeautifullunicorn",
    score: 3,
    comment: "Plutôt cool ! Un peu déçu que les minorités ne soient pas beaucoup représentées, mais l'histoire était bien et les personanges attachants.😇",
    publicationDate: "2025-08-07T06:38:07"
  },
  ]

  // états
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Création des 5 étoiles de notation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < bookEnDure.rating - 1) {
    // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
      style = { color: "#E28413" };
    }
    stars.push(<FontAwesomeIcon icon={faStar} style={style} />);
  };

  // Création des tags genres
  const genres = [];
  for (let genre of bookEnDure.genres) {
    genres.push(<h5>{genre}</h5>)
  };

  // Création des tags themes
  const themes = [];
  for (let theme of bookEnDure.themes) {
    themes.push(<h5>{theme}</h5>)
  };

  // Liste des avertissements affichés
  const warnings = bookEnDure.warning.map((oneWarning, i) => (
    <div key={i}>
      <h4>{oneWarning.categorie}</h4>
      <div className={styles.warningLine} >
        {oneWarning.tags.map((oneTag, j) => (
          <h5 key={j}>{oneTag}</h5>
        ))}
      </div>
    </div>
  ));

  //  fonction pour afficher les avertissements
  const handleShowWarning = () => {
    setShowWarning(true);
  };

  // Liste des boutons de chapitre
  const chapters = chapterEnDure.map((oneChapter, i) =>(
    <Button>{oneChapter.type} {oneChapter.chapterNumber}</Button>
  ))

  // Liste des reviews
  const reviews = reviewsEnDure.map((e,i) =>(
    <Review key={i} user={e.user} comment={e.comment} publicationDate={e.publicationDate} score={e.score} />
  ))



  return (
    <div className={styles.main}>
        <Header />
        <div className={styles.gridContent} >
          <div className={styles.leftPart} >
            <Image src={bookEnDure.url} height={500} width={300} alt={bookEnDure.title}/>
            <h4>Statut: {bookEnDure.state}</h4>
            <button>Découvrir l'univers</button>
            <button>Commencer la lecture</button>
            <button>Evaluer l'histoire</button>
            {chapters}
          </div>
          <div className={styles.rightPart} >
            <h1>{bookEnDure.tomeName} - Tome {bookEnDure.tomeNumber}</h1>
            <h1>{bookEnDure.title} </h1>
            <div>
              {stars}
            </div>
            <div className={styles.authorLine} >
              <h2>{bookEnDure.author}</h2>
              <button>SUIVRE</button>
              <button>Signaler</button>
            </div>
            <div className={styles.genreLine}>
              {genres}
            </div>
            <h3>Description</h3>
            {bookEnDure.description}
            <h3>Tags</h3>
            <div className={styles.themeLine}>
              {themes}
            </div>
            <h3>Avertissement</h3>
            {showWarning ? 
              warnings
            : <button onClick={handleShowWarning}>Voir les avertissements de contenu</button>}
            <h3>Evaluations</h3>
            {reviews}
          </div>
        </div>
    </div>
  );
};

export default BookDetail;