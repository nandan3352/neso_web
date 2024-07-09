import React, { useEffect } from "react";
import "./RightBooks.css";
import Book from "../Book/Book";

function Books({ course, books }) {

  return (
    <section className="books-details-section">
      <p className="books-section-header">
        Recommended Books For {course}
      </p>

      <div className="books-details-book-section">
        {books.map((book, index) => {
          return <Book book={book} />;
        })}
      </div>
    </section>
  );
}

export default Books;
