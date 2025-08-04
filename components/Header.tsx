import styles from "../styles/Header.module.css";
import Link from "next/link";
import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import type { MenuProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Dropdown, Button, Modal, DatePicker } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser, UserState } from "../reducers/user";

const Header: React.FC = () => {
  // Etats pour le formulaire de connexion
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [loginPseudo, setLoginPseudo] = useState<string>("");
  const [loginPassword, setLoginPassword] =useState<string>("");

  // Etats pour le formulaire d'inscription
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [signupName, setSignupName] = useState<string>("");
  const [signupLastname, setSignupLastname] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPseudo, setSignupPseudo] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState<string>("");
  const [signupBirthdate, setSignupBirthdate] = useState<string>("");

  const onChange = (date: Dayjs | null, dateString: string | string[]) => {
  if (date && typeof dateString === 'string') {
    const dateForBackend = date.format("YYYY-MM-DD");
    setSignupBirthdate(dateForBackend);
  }
};

  // Redux user
  const dispatch = useDispatch();
  const user = useSelector((store: {user: UserState}) => store.user)

  // Fonctions pour ouvrir et fermer la modale de connexion  
  const showLoginModal = () => {
    setOpenLogin(true);
  };
  const handleLoginCancel = () => {
    setLoginPseudo("");
    setLoginPassword("");
    setOpenLogin(false);
  };

  // Fonctions pour ouvrir et fermer la modale d'inscription  
  const showSignupModal = () => {
    setOpenSignup(true);
  };
  const handleSignupCancel = () => {
    setSignupName("");
    setSignupLastname("");
    setSignupEmail("");
    setSignupPseudo("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupBirthdate("");
    setOpenSignup(false);
  };



  const testToken = "dwgrhhtw467"

  // Fonction pour se connecter
  const handleLogin = () => {
    if (!loginPseudo || !loginPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    dispatch(setUser({ pseudo: loginPseudo, token: testToken}));
    setLoginPseudo("");
    setLoginPassword("");
    setOpenLogin(false);
  }


  // Fonction pour s'inscrire
  const handleSignup = () => {
    if (!signupPseudo || !signupPassword || !signupConfirmPassword || !signupName || !signupLastname || !signupEmail || !signupBirthdate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    dispatch(setUser({ pseudo: signupPseudo, token: testToken}));
    setSignupName("");
    setSignupLastname("");
    setSignupEmail("");
    setSignupPseudo("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupBirthdate("");
    setOpenSignup(false);
  }

  const userMenu: MenuProps = {
  items: [
    {
      key: '1',
      label: "Mon profil",
    },
    {
      key: '2',
      label: "Se déconnecter",
      onClick: () => {
        dispatch(clearUser());
      },
    },
  ],
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.title}>SCRIPTUM</Link>
          {user.token ?  
          <div className={styles.headerRight}>
            <Link href="/browse" className={styles.link}>Parcourir 🔍</Link>
            <button className={styles.button}>Ma Bibliothèque</button>
            <div>
              <p className={styles.greetingUser}>Bienvenue</p>
              <p className={styles.greetingUser}>{user.pseudo} !</p>
            </div>
            <Dropdown 
              menu={userMenu} 
              placement="bottomRight" 
              trigger={['click']} 
              className={styles.dropdown}>
              <Button icon={<FontAwesomeIcon icon={faUser} className={styles.profile} />} />
            </Dropdown>
          </div>
          :
          <div className={styles.headerRight}>
            <Link href="/browse"  className={styles.link}>Parcourir 🔍</Link>
            <button className={styles.button}>Ma Bibliothèque</button>

            {/* CONNEXION */}
            <button className={styles.button} onClick={() => showLoginModal()}>Se connecter</button>
            <Modal
              closable= {false}
              open={openLogin}
              footer={null}
            >
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Se Connecter</h2>
                <input 
                  type="text" 
                  placeholder="Pseudo"
                  className={styles.modalInput}
                  value= {loginPseudo}
                  onChange={e => setLoginPseudo(e.target.value)}
                />
                <input
                  type="password" 
                  placeholder="Mot de passe" 
                  className={styles.modalInput}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}  
                />
              </div>
              <div className={styles.modalButtons}>
                <Button key="back" onClick={handleLoginCancel} className={styles.modalButtonEmpty}>
                  Annuler
                </Button>
                <Button key="submit" onClick={handleLogin} className={styles.modalButtonFull}>
                  Valider
                </Button>
              </div>
            </Modal>

            {/* INSCRIPTION */}
            <button className={styles.button} onClick={() => showSignupModal()}>S'inscrire</button>
            <Modal
              closable= {false}
              open={openSignup}
              footer={null}
            >
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>S'inscrire</h2>
                <input 
                  type="text" 
                  placeholder="Nom"
                  className={styles.modalInput}
                  value= {signupLastname}
                  onChange={e => setSignupLastname(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Prénom"
                  className={styles.modalInput}
                  value= {signupName}
                  onChange={e => setSignupName(e.target.value)}
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className={styles.modalInput}
                  value= {signupEmail}
                  onChange={e => setSignupEmail(e.target.value)} />
                <input 
                  type="text" 
                  placeholder="Pseudo"
                  className={styles.modalInput}
                  value= {signupPseudo}
                  onChange={e => setSignupPseudo(e.target.value)}
                />
                <input
                  type="password" 
                  placeholder="Mot de passe" 
                  className={styles.modalInput}
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}  
                />
                <input
                  type="password" 
                  placeholder="Confirmer le mot de passe" 
                  className={styles.modalInput}
                  value={signupConfirmPassword}
                  onChange={e => setSignupConfirmPassword(e.target.value)}  
                />
              
                <DatePicker
                  onChange={onChange}
                  format="DD/MM/YYYY"
                  placeholder="Date de naissance"
                  className={styles.modalDatePicker}
                />
              </div>
              <div className={styles.modalButtons}>
                <Button key="back" onClick={handleSignupCancel} className={styles.modalButtonEmpty}>
                  Annuler
                </Button>
                <Button key="submit" onClick={handleSignup} className={styles.modalButtonFull}>
                  Valider
                </Button>
              </div>
            </Modal>
          </div>
          }
      </header>
    </>
  );
}

export default Header;
