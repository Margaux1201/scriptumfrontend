import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Book.module.css';
import Header from '../../components/Header';

const BookDetail = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [book, setBook] = useState(null);



  return (
    <div className={styles.main}>
        <Header />
        <h1>Page détail livre</h1>
        <p>Test pour accéder à cette page</p>
    </div>
  );
};

export default BookDetail;