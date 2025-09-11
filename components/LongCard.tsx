import styles from "../styles/LongCard.module.css";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import Image from "next/image";

const LongCard = (props: {
  cardType: string;
  title: string;
  image: string;
  id: number;
  content: string;
  bookSlug: string;
  slug: string;
  deleteCard: Function;
  updateCard: Function;
  isEditable: boolean;
}) => {
  const user = useSelector((store: { user: UserState }) => store.user);

  // Styles conditionnels pour gérer la disposition des éléments dans la carte
  const leftStyle: React.CSSProperties = { flexDirection: "row" };
  const rightStyle: React.CSSProperties = { flexDirection: "row-reverse" };

  const leftBorderText: React.CSSProperties = {
    borderLeft: "solid 1px #0F0F0F ",
    paddingLeft: "20px",
  };
  const rightBorderText: React.CSSProperties = {
    borderRight: "solid 1px #0F0F0F ",
    paddingRight: "20px",
  };

  // Fonction pour supprimer la carte
  const handleDeleteCard = (): void => {
    if (!props.isEditable) {
      alert("Vous n'êtes pas autorisé à supprimer cette carte");
      return;
    }

    // Si la carte est un lieu
    if (props.cardType === "place") {
      fetch(
        `http://127.0.0.1:8000/api/${props.bookSlug}/deleteplace/${props.slug}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
        }
      )
        .then((response) => {
          if (response.status === 204) {
            props.deleteCard(props.title);
            alert("Le lieu a bien été supprimé");
          } else {
            // S'il y a un body d'erreur, response.json()
            return response.json().then((data) => {
              console.error("Erreur suppression :", data);
              alert("Erreur lors de la suppression");
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion de compte :", error);
          alert("Une erreur réseau est survenue");
        });
    }

    // Si la carte est une créature
    if (props.cardType === "creature") {
      fetch(
        `http://127.0.0.1:8000/api/${props.bookSlug}/deletecreature/${props.slug}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
        }
      )
        .then((response) => {
          if (response.status === 204) {
            props.deleteCard(props.title);
            alert("La créature a bien été supprimée");
          } else {
            // S'il y a un body d'erreur, response.json()
            return response.json().then((data) => {
              console.error("Erreur suppression :", data);
              alert("Erreur lors de la suppression");
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppresion de compte :", error);
          alert("Une erreur réseau est survenue");
        });
    }
  };

  // Fonction pour modifier la carte
  const handleUpdateCard = (): void => {
    props.updateCard(props.slug);
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
            <button className={styles.button} onClick={handleDeleteCard}>
              Supprimer
            </button>
            <button className={styles.button} onClick={handleUpdateCard}>
              Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LongCard;
