import styles from "../styles/Home.module.css";
import React, { FC, useEffect, useState } from "react";
import Header from "./Header";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteBookStore,
  Favorite,
  removeFavoriteBookStore,
} from "@/reducers/favorite";
import { UserState } from "@/reducers/user";

const Home: React.FC = () => {
  interface Warning {
    categorie: string;
    tag: string[];
  }

  interface Book {
    author: number;
    author_name: string;
    description: string;
    genres: string[];
    id: number;
    image: string;
    is_saga: boolean;
    publicType: string;
    rating: number;
    releaseDate: string;
    slug: string;
    state: string;
    themes: string[];
    title: string;
    tomeName: string;
    tomeNumber: number;
    warnings: Warning[];
  }

  interface FavoriteBook {
    id: number;
    user: number;
    book: string;
    user_pseudo: string;
  }

  const [search, setSearch] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>([]);
  const [favoriteList, setFavoriteList] = useState<FavoriteBook[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useDispatch();
  const favorites = useSelector(
    (store: { favorite: Favorite }) => store.favorite
  );
  const user = useSelector((store: { user: UserState }) => store.user);

  // Fonction pour mettre à jour la liste des livres après suppression d'un livre
  const deleteBook = (slug: string): void => {
    setBookList((prev) => prev.filter((element) => element.slug != slug));
  };

  const fetchBooks = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    params.append("page", page.toString());

    const url = `http://127.0.0.1:8000/api/getallbook/?${params.toString()}`;

    fetch(url).then((response) =>
      response.json().then((data) => {
        if (response.ok) {
          setBookList(data.results);
          setTotalPages(Math.ceil(data.count / 10));
        }
      })
    );
  };

  useEffect(() => {
    fetchBooks();
  }, [search, page]);

  const toggleFavoriteBook = (
    isFavorite: boolean,
    bookSlug: string,
    bookObject: any
  ) => {
    if (isFavorite) {
      dispatch(removeFavoriteBookStore(bookSlug));
      fetch(`http://127.0.0.1:8000/api/deletefavorite/${bookSlug}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token }),
      }).then((response) => {
        if (response.status === 204) {
          console.log("LIVRE RETIREE DES FAVORIS", bookObject);
        } else {
          // S'il y a un body d'erreur, response.json()
          return response.json().then((data) => {
            console.error("Erreur suppression du livre des favoris :", data);
            alert("Erreur lors de la suppression");
          });
        }
      });
    } else {
      dispatch(addFavoriteBookStore(bookObject));
      fetch("http://127.0.0.1:8000/api/newfavorite/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, book: bookSlug }),
      })
        .then((response) =>
          response.json().then((data) => {
            console.log("NEW FAVORI ❤️❤️❤️", data);
          })
        )
        .catch((error) => {
          console.error("Erreur lors de l'ajout du livre en favori :", error);
          alert("Une erreur réseau est survenue");
        });
    }
  };

  console.log("FAVORITE BOOK", favoriteList);

  const dataBook = bookList.map((e: Book, i: number) => {
    let overview = e.description;
    if (overview.length > 250) {
      overview = overview.substring(0, 250) + "...";
    }

    const isFavorite = favorites.favoriteBook.some(
      (element) => element.slug === e.slug
    );

    return (
      <BookCard
        key={i}
        title={e.title}
        author={e.author_name}
        desc={overview}
        rating={e.rating}
        url={e.image}
        slug={e.slug}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavoriteBook}
      />
    );
  });

  return (
    <div className={styles.main}>
      <Header deleteBook={deleteBook} />
      <div className={styles.title}>
        <h1 className={styles.h1}>
          <span className={styles.yellowWord}>Des histoires</span> à raconter...
        </h1>
        <h1 className={styles.h1}>
          Des mondes <span className={styles.yellowWord}>à parcourir.</span>
        </h1>
      </div>
      <h3 className={styles.h3}>
        Découvrez et lisez des livres captivants, par des auteurs indépendants
      </h3>
      <input
        type="text"
        placeholder="🔍Rechercher..."
        className={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.contentBook}>{dataBook}</div>
    </div>
  );
};

export default Home;
