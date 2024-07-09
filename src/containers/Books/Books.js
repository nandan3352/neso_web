import React from "react";
import BooksMain from "../../components/UI/BooksPage/BooksMain/BooksMain";
import "../../components/UI/BooksPage/BooksMain/BooksMain.css";

function Books() {

  React.useEffect(() => {
    document.title = "Recommended Books | Neso Academy"
  }, []);

  return (
    <section className="books-section">
      <BooksMain />
    </section>
  );
}

export default Books;
