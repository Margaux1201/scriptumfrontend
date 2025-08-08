import styles from '../styles/BookCard.module.css';
import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const BookCard = (props: {
    title: string;
    url: string;
    author: string;
    desc: string;
    rating: number;
    }) => {

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
        <div className={styles.card} >
            <Image src={props.url} layout='responsive' height={300} width={200} alt={props.title}/>
            <h2 className={styles.bookTitle} >{props.title}</h2>
            <h3 className={styles.bookAuth} >{props.author}</h3>
            <p className={styles.bookDesc} >{props.desc}</p>
            <div className={styles.bookRate} >
                {stars} {props.rating}
            </div>
        </div>
    )
}

export default BookCard