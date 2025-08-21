import styles from "../styles/Home.module.css";
import React, { FC, useEffect, useState } from "react";
import Header from "./Header";
import BookCard from "./BookCard";

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

  const [search, setSearch] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const dataBook = bookList.map((e: Book) => {
    let overview = e.description;
    if (overview.length > 250) {
      overview = overview.substring(0, 250) + "...";
    }
    return (
      <BookCard
        key={e.id}
        title={e.title}
        author={e.author_name}
        desc={overview}
        rating={e.rating}
        url={e.image}
        slug={e.slug}
      />
    );
  });

  return (
    <div className={styles.main}>
      <Header />
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
