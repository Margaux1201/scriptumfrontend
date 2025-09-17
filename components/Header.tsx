import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import type { MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dropdown, Button, Modal, DatePicker, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser, UserState } from "../reducers/user";
import {
  removeFavoriteBookStore,
  removeFavoriteAuthorStore,
  clearFavorite,
} from "@/reducers/favorite";
import { Favorite } from "@/reducers/favorite";

const Header = (props: { deleteBook: Function }) => {
  const router = useRouter();

  // Redux user
  const dispatch = useDispatch();
  const user = useSelector((store: { user: UserState }) => store.user);
  const favorite = useSelector(
    (store: { favorite: Favorite }) => store.favorite
  );

  interface Book {
    image: string;
    title: string;
    state: string;
    slug: string;
  }

  // Etats pour le formulaire de connexion
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [loginPseudo, setLoginPseudo] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  // Etats pour le formulaire d'inscription
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [signupName, setSignupName] = useState<string>("");
  const [signupLastname, setSignupLastname] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPseudo, setSignupPseudo] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupConfirmPassword, setSignupConfirmPassword] =
    useState<string>("");
  const [signupBirthdate, setSignupBirthdate] = useState<string>("");

  // Etats pour la modale de validation de suppression de compte
  const [openSignout, setOpenSignout] = useState<boolean>(false);

  // Etats pour la modale de modification de profil
  const [openUpdateProfile, setOpenUpdateProfile] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>("");
  const [updateLastname, setUpdateLastname] = useState<string>("");
  const [updateEmail, setUpdateEmail] = useState<string>("");
  const [updatePseudo, setUpdatePseudo] = useState<string>("");
  const [updateBirthdate, setUpdateBirthdate] = useState<string>("");
  const [updateAuthorname, setUpdateAuthorname] = useState<string>("");

  // Etat pour ouvrir le formulaire d'ajout de nom d'auteur
  const [openAddAuthorName, setOpenAddAuthorName] = useState<boolean>(false);

  // Etat pour gérer la bibliothèque
  const [openUserLibrary, setOpenUserLibrary] = useState<boolean>(false);
  const [allMyBooks, setAllMyBooks] = useState<Book[]>([]);

  // PARTIE BIBLIOTHEQUE

  // Fonction pour ouvrir la modale "Ma bibliothèque"
  const handleOpenLibraryModal = (): void => {
    setOpenUserLibrary(true);
    if (user.token) {
      fetch(`http://127.0.0.1:8000/api/${user.token}/getallauthorbook/`).then(
        (response) =>
          response.json().then((data) => {
            if (response.ok) {
              console.log("MES LIVRES 📘📘📘", data.results);
              setAllMyBooks([]);
              for (let oneBook of data.results) {
                const newBookObject = {
                  image: oneBook.image,
                  title: oneBook.title,
                  state: oneBook.state,
                  slug: oneBook.slug,
                };
                setAllMyBooks((prev) => [...prev, newBookObject]);
              }
            }
          })
      );
    }
  };

  const handleCloseLibraryModal = (): void => {
    setOpenUserLibrary(false);
  };

  // Fonction pour supprimer un livre
  const handleDeleteBook = (slug: string): void => {
    if (!user.token) {
      alert("Vous devez être connecté pour supprimer ce livre");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/deletebook/${slug}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => {
        if (response.status === 204) {
          setAllMyBooks((prev) =>
            prev.filter((element) => element.slug != slug)
          );
          props.deleteBook(slug);
          alert("Le livre a bien été supprimé");
          router.push("/");
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
  };

  // PARTIE GESTION UTILISATEUR

  // Fonction pour stocker la date depuis DatePicker (Inscription)
  const onChange = (date: Dayjs | null, dateString: string | string[]) => {
    if (date && typeof dateString === "string") {
      const dateForBackend = date.format("YYYY-MM-DD");
      setSignupBirthdate(dateForBackend);
    }
  };

  // Fonction pour stocker la date depuis DatePicker (Modification profil)
  const onChangeUpdate = (
    date: Dayjs | null,
    dateString: string | string[]
  ) => {
    if (date && typeof dateString === "string") {
      const dateForBackend = date.format("YYYY-MM-DD");
      setUpdateBirthdate(dateForBackend);
    }
  };

  // Fonctions pour ouvrir et fermer la modale de connexion
  const showLoginModal = (): void => {
    setOpenLogin(true);
  };
  const handleLoginCancel = (): void => {
    setLoginPseudo("");
    setLoginPassword("");
    setOpenLogin(false);
  };

  // Fonctions pour ouvrir et fermer la modale d'inscription
  const showSignupModal = (): void => {
    setOpenSignup(true);
  };
  const handleSignupCancel = (): void => {
    setSignupName("");
    setSignupLastname("");
    setSignupEmail("");
    setSignupPseudo("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupBirthdate("");
    setOpenSignup(false);
  };

  // Fonctions pour ouvrir et fermer la modale de suppression de compte
  const showSignoutModal = (): void => {
    setOpenSignout(true);
  };
  const handleSignoutCancel = (): void => {
    setOpenSignout(false);
  };

  // Fonctions pour ouvrir et fermer la modale de modification de profil
  const showUpdateProfileModal = (): void => {
    setOpenUpdateProfile(true);
    fetch("http://127.0.0.1:8000/api/getinfo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) =>
        response
          .json()
          .then(
            (data: {
              first_name: string;
              last_name: string;
              pseudo: string;
              author_name?: string;
              email: string;
              birth_date: string;
            }) => {
              if (response.ok) {
                setUpdateName(data.first_name);
                setUpdateLastname(data.last_name);
                setUpdatePseudo(data.pseudo);
                setUpdateAuthorname(data.author_name ?? "");
                setUpdateEmail(data.email);
                setUpdateBirthdate(data.birth_date);
              } else {
                const errors = Object.values(data).flat().join("\n");
                alert("Erreur :\n" + errors);
                return;
              }
            }
          )
      )
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données utilisateurs :",
          error
        );
        alert("Une erreur réseau est survenue");
      });
  };

  const handleUpdateProfileCancel = (): void => {
    setOpenUpdateProfile(false);
  };

  // Fonction pour se connecter
  const handleLogin = (): void => {
    if (!loginPseudo || !loginPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: loginPseudo,
        password: loginPassword,
      }),
    })
      .then((response) =>
        response.json().then((data: { pseudo: string; token: string }) => {
          if (response.ok) {
            dispatch(setUser({ pseudo: data.pseudo, token: data.token }));
            setLoginPseudo("");
            setLoginPassword("");
            setOpenLogin(false);
          } else {
            const errors = Object.values(data).flat().join("\n");
            alert("Erreur :\n" + errors);
            return;
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  // Fonction pour s'inscrire
  const handleSignup = (): void => {
    if (
      !signupPseudo ||
      !signupPassword ||
      !signupConfirmPassword ||
      !signupName ||
      !signupLastname ||
      !signupEmail ||
      !signupBirthdate
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: signupPseudo,
        first_name: signupName,
        last_name: signupLastname,
        email: signupEmail,
        birth_date: signupBirthdate,
        password: signupPassword,
      }),
    })
      .then((response) =>
        response.json().then((data: { pseudo: string; token: string }) => {
          if (response.ok) {
            dispatch(setUser({ pseudo: data.pseudo, token: data.token }));
            setSignupName("");
            setSignupLastname("");
            setSignupEmail("");
            setSignupPseudo("");
            setSignupPassword("");
            setSignupConfirmPassword("");
            setSignupBirthdate("");
            setOpenSignup(false);
            alert("Inscription réussie");
          } else {
            const errors = Object.values(data).flat().join("\n");
            alert("Erreur :\n" + errors);
            return;
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  // Fonction pour créer un roman
  const createNewBook = (): void => {
    // vérifie si l'utilisateur à un nom d'auteur
    fetch("http://127.0.0.1:8000/api/getinfo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) =>
        response.json().then((data: { author_name?: string }) => {
          if (response.ok) {
            // Si pas de nom d'auteur, ouvre la modale pour en créer un.
            if (!data.author_name) {
              setOpenAddAuthorName(true);
            } else {
              // Si nom d'auteur, va sur la page de création de roman
              router.push(`/book/newbook`);
            }
          } else {
            const errors = Object.values(data).flat().join("\n");
            alert("Erreur :\n" + errors);
            return;
          }
        })
      )
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données utilisateurs :",
          error
        );
        alert("Une erreur réseau est survenue");
      });
  };

  // Fonction pour modifier son profil
  const handleUpdateProfile = (): void => {
    if (
      !updateName ||
      !updatePseudo ||
      !updateLastname ||
      !updateEmail ||
      !updateBirthdate
    ) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/updateinfo/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        first_name: updateName,
        last_name: updateLastname,
        email: updateEmail,
        pseudo: updatePseudo,
        author_name: updateAuthorname,
        birth_date: updateBirthdate,
      }),
    })
      .then((response) =>
        response.json().then((data: { pseudo: string; token: string }) => {
          if (response.ok) {
            dispatch(setUser({ pseudo: data.pseudo, token: data.token }));
            setUpdateName("");
            setUpdateLastname("");
            setUpdatePseudo("");
            setUpdateAuthorname("");
            setUpdateEmail("");
            setUpdateBirthdate("");
            setOpenUpdateProfile(false);
            alert("Modification profil enregistrée");
          } else {
            const errors = Object.values(data).flat().join("\n");
            alert("Erreur :\n" + errors);
            return;
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de la modification du profil :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  const handleAddAuthorNameCancel = (): void => {
    setUpdateAuthorname("");
    setOpenAddAuthorName(false);
  };

  const handleAddAuthorName = (): void => {
    if (!updateAuthorname) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/updateinfo/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        author_name: updateAuthorname,
      }),
    })
      .then((response) =>
        response.json().then((data: { pseudo: string; token: string }) => {
          if (response.ok) {
            setUpdateAuthorname("");
            setOpenAddAuthorName(false);
            alert(
              "Nom d'auteur enregistrée. Vous pouvez désormais créer un roman"
            );
          } else {
            const errors = Object.values(data).flat().join("\n");
            alert("Erreur :\n" + errors);
            return;
          }
        })
      )
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur réseau est survenue");
      });
  };

  // Fonction pour supprimer son compte
  const handleSignout = () => {
    fetch("http://127.0.0.1:8000/api/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => {
        if (response.status === 204) {
          // Pas de body à lire, donc pas de response.json()
          alert("Le compte a bien été supprimé");
          dispatch(clearUser());
          setOpenSignout(false);
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
  };

  const userMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "Modifier mon profil",
        onClick: () => {
          showUpdateProfileModal();
        },
      },
      {
        key: "2",
        label: "Créer un roman",
        onClick: () => {
          createNewBook();
        },
      },
      {
        key: "3",
        label: "Me déconnecter",
        onClick: () => {
          dispatch(clearUser());
          dispatch(clearFavorite());
        },
      },
      {
        key: "4",
        label: "Supprimer mon compte",
        onClick: () => {
          showSignoutModal();
        },
      },
    ],
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.title}>
          SCRIPTUM
        </Link>
        {user.token ? (
          // SI USER CONNECTÉ
          <div className={styles.headerRight}>
            <Link href="/browse" className={styles.link}>
              Parcourir 🔍
            </Link>
            <button className={styles.button} onClick={handleOpenLibraryModal}>
              Ma Bibliothèque
            </button>
            <div>
              <p className={styles.greetingUser}>Bienvenue</p>
              <p className={styles.greetingUser}>{user.pseudo} !</p>
            </div>
            <Dropdown
              menu={userMenu}
              placement="bottomRight"
              trigger={["click"]}
              className={styles.dropdown}
            >
              <Button
                icon={
                  <FontAwesomeIcon icon={faUser} className={styles.profile} />
                }
              />
            </Dropdown>

            {/* MODALE MA BIBLIOTHEQUE */}
            <Modal
              open={openUserLibrary}
              footer={null}
              onCancel={handleCloseLibraryModal}
            >
              <Tabs
                type="card"
                items={[
                  { titre: "Mes Livres", content: allMyBooks },
                  { titre: "Mes Favoris", content: allMyBooks },
                  { titre: "Mes Auteurs", content: allMyBooks },
                ].map((element, i) => {
                  const id = String(i + 1);
                  const myContent =
                    element.content?.length > 0 ? (
                      <div className={styles.modaleLibraryContainer}>
                        {element.content.map((oneBook) => (
                          <div className={styles.cardMyLibrary}>
                            {/* Bouton supprimer pour Mes Livres */}
                            {element.titre === "Mes Livres" && (
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                className={styles.deleteBookBtn}
                                onClick={() => handleDeleteBook(oneBook.slug)}
                              />
                            )}
                            {/* Bouton Favoris pour Mes Favoris */}
                            {element.titre === "Mes Favoris" && (
                              <FontAwesomeIcon
                                icon={faHeartSolid}
                                className={styles.favoriteBtn}
                              />
                            )}
                            <div key={oneBook.slug}>
                              <Image
                                src={oneBook.image}
                                alt={oneBook.title}
                                height={150}
                                width={100}
                              />
                              <h3 className={styles.libraryTitle}>
                                {oneBook.title}
                              </h3>
                              <h5
                                style={
                                  oneBook.state === "En cours"
                                    ? { color: "#E28413" }
                                    : { color: "#107E7D" }
                                }
                                className={styles.libraryState}
                              >
                                {oneBook.state.toUpperCase()}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Aucun livre disponible</p>
                    );
                  return {
                    label: `${element.titre}`,
                    key: `${id}`,
                    children: myContent,
                  };
                })}
              ></Tabs>
            </Modal>

            {/* MODIFICATION DE PROFILE */}
            <Modal closable={false} open={openUpdateProfile} footer={null}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Modification de Profil</h2>
                <input
                  type="text"
                  placeholder="Nom"
                  className={styles.modalInput}
                  value={updateLastname}
                  onChange={(e) => setUpdateLastname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  className={styles.modalInput}
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.modalInput}
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Pseudo"
                  className={styles.modalInput}
                  value={updatePseudo}
                  onChange={(e) => setUpdatePseudo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nom d'auteur"
                  className={styles.modalInput}
                  value={updateAuthorname}
                  onChange={(e) => setUpdateAuthorname(e.target.value)}
                />
                <DatePicker
                  onChange={onChangeUpdate}
                  value={updateBirthdate ? dayjs(updateBirthdate) : null}
                  format="DD/MM/YYYY"
                  placeholder="Date de naissance"
                  className={styles.modalDatePicker}
                />
                <div className={styles.modalButtons}>
                  <Button
                    key="back"
                    onClick={handleUpdateProfileCancel}
                    className={styles.modalButtonEmpty}
                  >
                    Annuler
                  </Button>
                  <Button
                    key="submit"
                    onClick={handleUpdateProfile}
                    className={styles.modalButtonFull}
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </Modal>

            {/* CREER SON NOM D'AUTEUR */}
            <Modal closable={false} open={openAddAuthorName} footer={null}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Créer ton nom d'auteur</h2>
                <input
                  type="text"
                  placeholder="Nom d'auteur"
                  className={styles.modalInput}
                  value={updateAuthorname}
                  onChange={(e) => setUpdateAuthorname(e.target.value)}
                />
                <div className={styles.modalButtons}>
                  <Button
                    key="back"
                    onClick={handleAddAuthorNameCancel}
                    className={styles.modalButtonEmpty}
                  >
                    Annuler
                  </Button>
                  <Button
                    key="submit"
                    onClick={handleAddAuthorName}
                    className={styles.modalButtonFull}
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </Modal>

            {/* SUPPRESSION DE COMPTE */}
            <Modal closable={false} open={openSignout} footer={null}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Suppression de Compte</h2>
                <p>
                  Êtes-vous sûr de vouloir supprimer votre compte ? Toutes les
                  données vous concernant seront effacées de la plateforme.
                </p>
                <div className={styles.modalButtons}>
                  <Button
                    key="back"
                    onClick={handleSignoutCancel}
                    className={styles.modalButtonEmpty}
                  >
                    Annuler
                  </Button>
                  <Button
                    key="submit"
                    onClick={handleSignout}
                    className={styles.modalButtonFull}
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          // SI USER NON CONNECTÉ
          <div className={styles.headerRight}>
            <Link href="/browse" className={styles.link}>
              Parcourir 🔍
            </Link>

            {/* CONNEXION */}
            <button className={styles.button} onClick={() => showLoginModal()}>
              Se connecter
            </button>
            <Modal closable={false} open={openLogin} footer={null}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Se Connecter</h2>
                <input
                  type="text"
                  placeholder="Pseudo"
                  className={styles.modalInput}
                  value={loginPseudo}
                  onChange={(e) => setLoginPseudo(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className={styles.modalInput}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className={styles.modalButtons}>
                <Button
                  key="back"
                  onClick={handleLoginCancel}
                  className={styles.modalButtonEmpty}
                >
                  Annuler
                </Button>
                <Button
                  key="submit"
                  onClick={handleLogin}
                  className={styles.modalButtonFull}
                >
                  Valider
                </Button>
              </div>
            </Modal>

            {/* INSCRIPTION */}
            <button className={styles.button} onClick={() => showSignupModal()}>
              S'inscrire
            </button>
            <Modal closable={false} open={openSignup} footer={null}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>S'inscrire</h2>
                <input
                  type="text"
                  placeholder="Nom"
                  className={styles.modalInput}
                  value={signupLastname}
                  onChange={(e) => setSignupLastname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  className={styles.modalInput}
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.modalInput}
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Pseudo"
                  className={styles.modalInput}
                  value={signupPseudo}
                  onChange={(e) => setSignupPseudo(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className={styles.modalInput}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  className={styles.modalInput}
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />

                <DatePicker
                  onChange={onChange}
                  format="DD/MM/YYYY"
                  placeholder="Date de naissance"
                  className={styles.modalDatePicker}
                />
              </div>
              <div className={styles.modalButtons}>
                <Button
                  key="back"
                  onClick={handleSignupCancel}
                  className={styles.modalButtonEmpty}
                >
                  Annuler
                </Button>
                <Button
                  key="submit"
                  onClick={handleSignup}
                  className={styles.modalButtonFull}
                >
                  Valider
                </Button>
              </div>
            </Modal>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
