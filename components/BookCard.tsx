import styles from "../styles/BookCard.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";

const BookCard = (props: {
  title: string;
  url: string;
  author: string;
  desc: string;
  rating: number;
  slug: string;
}) => {
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/book/${props.slug}`);
  };

  // Création des 5 étoiles de notation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < props.rating - 1) {
      // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
      style = { color: "#E28413" };
    }
    stars.push(<FontAwesomeIcon icon={faStar} style={style} />);
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <Image src={props.url} height={300} width={200} alt={props.title} />
      <h2 className={styles.bookTitle}>{props.title}</h2>
      <h3 className={styles.bookAuth}>{props.author}</h3>
      <p className={styles.bookDesc}>{props.desc}</p>
      <div className={styles.bookRate}>
        {stars} {props.rating}
      </div>
    </div>
  );
};

export default BookCard;
