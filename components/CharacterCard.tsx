import styles from "../styles/CharacterCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";

const CharacterCard = (props: {
  url: string;
  name: string;
  slug: string;
  role: string;
  slogan: string;
}) => {
  const router = useRouter();
  const { slug } = router.query;

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

  return (
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
      <FontAwesomeIcon icon={faCircleXmark} className={styles.deleteBtn} />
    </div>
  );
};

export default CharacterCard;
