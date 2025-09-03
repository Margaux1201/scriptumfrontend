import styles from "../styles/PlaceCard.module.css";
import Image from "next/image";

const PlaceCard = (props: {
  title: string;
  image: string;
  id: number;
  content: string;
  isEditable: boolean;
}) => {
  // Styles pour gérer la disposition des éléments dans la carte
  const leftStyle: React.CSSProperties = { flexDirection: "row" };
  const rightStyle: React.CSSProperties = { flexDirection: "row-reverse" };

  //
  const leftBorderText: React.CSSProperties = {
    borderLeft: "solid 1px #0F0F0F ",
    paddingLeft: "20px",
  };
  const rightBorderText: React.CSSProperties = {
    borderRight: "solid 1px #0F0F0F ",
    paddingRight: "20px",
  };

  return (
    <div
      className={styles.card}
      style={props.id % 2 === 0 ? leftStyle : rightStyle}
    >
      <div>
        <Image
          src={props.image}
          width={150}
          height={150}
          alt={props.title}
          className={styles.image}
        />
      </div>
      <div
        className={styles.textContainer}
        style={props.id % 2 === 0 ? leftBorderText : rightBorderText}
      >
        <h4 className={styles.title}>{props.title}</h4>
        <p className={styles.content}>{props.content}</p>
        {props.isEditable && (
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Supprimer</button>
            <button className={styles.button}>Modifier</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
