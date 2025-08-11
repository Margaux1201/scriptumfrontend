import styles from "../styles/Review.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import dayjs, { Dayjs } from 'dayjs';

const Review = (props : {
    user: string;
    score: number;
    comment: string;
    publicationDate: string;
    }) => {

    // Création des 5 étoiles de notation
    const stars = [];
    for (let i = 0; i < 5; i++) {
        let style = {};
        if (i < props.score) {
        // Si l'indice de l'étoile est inférieur à la note moyenne, on la colore en jaune
            style = { color: "#E28413" };
        }
        stars.push(<FontAwesomeIcon icon={faStar} style={style} />);
    }

    //Conversion de la string en date avec format FR
    const dayString = props.publicationDate;
    const dateFormated = dayjs(dayString).format("DD/MM/YYYY, HH:mm");

    return (
        <div className={styles.main} >
            <div className={styles.commentPart} >
                <h3 className={styles.username} >{props.user}</h3>
                <div>
                    {stars}
                </div>
                {dateFormated}
                <div className={styles.content} >
                    {props.comment}
                </div>
            </div>
            <button className={styles.signalButton} >Signaler</button>
        </div>
    )
}
  
export default Review