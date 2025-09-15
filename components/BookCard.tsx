import styles from "../styles/BookCard.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useSelector, UseSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import { useRouter } from "next/router";

const BookCard = (props: {
  title: string;
  url: string;
  author: string;
  desc: string;
  rating: number;
  slug: string;
  isFavorite: boolean;
  toggleFavorite: Function;
}) => {
  const router = useRouter();

  const user = useSelector((store: { user: UserState }) => store.user);

  const handleClick = (): void => {
    router.push(`/book/${props.slug}`);
  };

  //Fonction pour gérer les favoris
  const handleFavoriteClick = (): void => {
    if (!user.token) {
      alert("Vous devez vous connecter pour ajouter des livres en favoris");
      return;
    }
    const bookObject = {
      title: props.title,
      author: props.author,
      url: props.url,
      rating: props.rating,
      slug: props.slug,
    };
    props.toggleFavorite(props.isFavorite, props.slug, bookObject);
  };

  // Création des 5 étoiles de notation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i <= props.rating - 1) {
      // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
      style = { color: "#E28413" };
    }
    stars.push(<FontAwesomeIcon icon={faStar} style={style} />);
  }

  return (
    <div className={styles.card}>
      <FontAwesomeIcon
        icon={props.isFavorite ? faHeartSolid : faHeartRegular}
        className={styles.heartFavorite}
        onClick={handleFavoriteClick}
      />
      <div onClick={handleClick}>
        <Image src={props.url} height={300} width={200} alt={props.title} />
        <h2 className={styles.bookTitle}>{props.title}</h2>
        <h3 className={styles.bookAuth}>{props.author}</h3>
        <p className={styles.bookDesc}>{props.desc}</p>
        <div className={styles.bookRate}>
          {stars} {props.rating}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
