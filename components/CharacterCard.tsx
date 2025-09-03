import styles from "../styles/CharacterCard.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { UserState } from "@/reducers/user";
import Image from "next/image";

const CharacterCard = (props: {
  id: number;
  url: string;
  name: string;
  slug: string;
  role: string;
  slogan: string;
  isEditable: boolean;
  deleteCharacter: Function;
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const user = useSelector((store: { user: UserState }) => store.user);

  let roleStyles = {};
  if (props.role === "protagoniste") {
    roleStyles = {
      backgroundColor: "rgba(45, 125, 201, 0.5)",
      border: "solid 2px rgb(45, 125, 201)",
    };
  } else if (props.role === "allié") {
    roleStyles = {
      backgroundColor: "rgba(16, 126, 125, 0.5)",
      border: "solid 2px rgb(16, 126, 125)",
    };
  } else if (props.role === "neutre") {
    roleStyles = {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      border: "solid 2px grey",
    };
  } else if (props.role === "adversaire") {
    roleStyles = {
      backgroundColor: "rgba(203, 49, 56, 0.5)",
      border: "solid 2px rgb(203, 49, 56)",
    };
  } else if (props.role === "antagoniste") {
    roleStyles = {
      backgroundColor: "rgba(32, 32, 32, 0.5)",
      border: "solid 2px rgba(32, 32, 32, 1)",
    };
  } else {
    roleStyles = {
      backgroundColor: "#e2851393",
      border: "solid 2px #E28413",
    };
  }

  const handleClick = (): void => {
    router.push(`/book/${slug}/character/${props.slug}`);
  };

  const handleEdit = (): void => {
    router.push(`/book/${slug}/character/${props.slug}/editcharacter`);
  };

  const handleDelete = (): void => {
    if (!props.isEditable) {
      alert("Vous n'êtes pas autorisé à supprimer ce personnage");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/deletecharacter/${props.slug}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => {
        if (res.status === 204) {
          props.deleteCharacter(props.id);
          alert("Le personnage a bien été supprimé");
        } else {
          // S'il y a un body d'erreur, response.json()
          return res.json().then((data) => {
            console.error("Erreur suppression :", data);
            alert("Erreur lors de la suppression");
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppresion de compte :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  return (
    <div className={styles.global}>
      <div style={roleStyles} className={styles.card} onClick={handleClick}>
        <Image
          src={props.url}
          alt={props.name}
          height={100}
          width={100}
          className={styles.image}
        />
        <div className={styles.lineCard} style={roleStyles}></div>
        <h2 className={styles.titleCard}>{props.name}</h2>
        <p className={styles.sloganCard}>"{props.slogan}"</p>
      </div>
      {props.isEditable && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleDelete}>
            Supprimer
          </button>
          <button className={styles.button} onClick={handleEdit}>
            Modifier
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
