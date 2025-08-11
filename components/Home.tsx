import styles from "../styles/Home.module.css";
import React, { FC, useState } from "react";
import Header from "./Header";
import BookCard from "./BookCard";


const Home: React.FC = () => {

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
  }

  const bookCodeEnDure: Book[] = [{
    id: 85, 
    title: "Harry Potter and the Philosopher's Stone", 
    releaseDate: "1998-10-05", 
    author: "J.K. Rowling", 
    url: "/assets/images/Harry_Potter_and_the_Philosopher's-Stone.jpg",
    description: "When a letter arrives for unhappy but  ordinary Harry Potter, a decade-old secret  is revealed to him. His parents were  wizards, killed by a Dark Lord's curse  when Harry was just a baby, and which he  somehow survived. Escaping from his  unbearable Muggle guardians to Hogwarts,  a wizarding school brimming with ghosts  and enchantments, Harry stumbles into a  sinister adventure when he finds a three- headed dog guarding a room on the third  floor. Then he hears of a missing stone  with astonishing powers which could be  valuable, dangerous, or both.",
    publicType: "Jeunesse",
    genres: ["Fantastique", "Mystère", "Aventure"],
    themes: ["Le bien contre le mal", "Creatures magiques", "Amitié", "École", "Sorcier",],
    state: "Terminé",
    isSaga: true,
    tomeName: "Harry Potter",
    tomeNumber: 1,
    rating: 4.8,
    slug: "Harry-Potter-and-the-Philosopher's-Stone-J.K.-Rowling",
  },
  {
    id: 47, 
    title: "Les sérums du Chaos", 
    releaseDate: "2025-08-08", 
    author: "Emily Ivessons", 
    url: "/assets/images/Evolved_Les_sérums_du_chaos.png",
    description: "Dix ans après la Grande Pandémie qui a ravagé le monde, les survivants se sont reconstruits malgré l'invasion des morts. Mike et Caleb, deux amis liés par les épreuves de cette sombre décennie, prospèrent dans la ville de Mojave où ils ont trouvé refuge avec leur groupe. Pourtant, ils devront affronter une nouvelle menace quand un soldat russe aux capacités surhumaines s'invite sur leur territoire avec d'étranges sérums qui chambouleront leur vie, ainsi que leur ADN. Pourquoi cibler leur camp ? Que cherche cet homme en transformant des innocents en êtres contre-nature ? Qu'a le sérum Amarok de si spécial pour susciter autant de convoitise ? Une chose est certaine : la lutte pour la survie est engagée contre ces forces émergentes aussi puissantes qu'impitoyables.",
    publicType: "Adulte",
    genres: ["Science Fantasy", "Dystopie", "Thriller"],
    themes: ["Post-Apocalypse", "Créature Fantastique", "Surnaturel", "Manipulation génétique", "Zombies", "Pandémie"],
    state: "Terminé",
    isSaga: true,
    tomeName: "Evolved",
    tomeNumber: 1,
    rating: 3.4,
    slug: "Les-sérums-du-Chaos-Emily-Ivessons",
  }];

  const dataBook = bookCodeEnDure.map((e: Book) => {
    let overview = e.description 
    if (overview.length > 250) {
      overview = overview.substring(0, 250) + "...";
    }
    return <BookCard key={e.id} title={e.title} author={e.author} desc={overview} rating={e.rating} url={e.url} slug={e.slug} />
  })

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.title}>
        <h1 className={styles.h1}><span className={styles.yellowWord}>Des histoires</span> à raconter...</h1>
        <h1 className={styles.h1}>Des mondes <span className={styles.yellowWord}>à parcourir.</span></h1>
      </div>
      <h3 className={styles.h3}>Découvrez et lisez des livres captivants, par des auteurs indépendants</h3>
      <input type="text" placeholder="🔍Rechercher..." className={styles.searchInput}/>
      <div className={styles.contentBook} >
        {dataBook}
      </div>
    </div>
  );
}

export default Home;
