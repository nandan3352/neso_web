import React, { useEffect, useRef, useState } from "react";
import RightBooks from "../RightBooks/RightBooks";
import LeftContent from "../LeftContents/LeftContents";
import "./BooksMain.css";
import { useDatabase, useDatabaseOnce } from "../../../../Services/Database";
import BookMainEmpty from "./BookMainEmpty";
import BookEmpty from "./BookEmpty";
import { Skeleton } from "@material-ui/lab";

function BooksPage(props) {
  const books = useDatabase(`/Books`).data;
  const Subjects = useDatabaseOnce("/Courses").data
  const [currentBookSection, setCurrentBookSection] = useState("")
  const [iobserver, setIobserver] = useState(null);
  const scrollRef = useRef(null);

  let sectionRefs;

  const filterSubjectsFromAvailableBooks = () => {
    let coursesAvailable = {}
    const availableBooks = Object.keys(books)
    Object.keys(Subjects).forEach(v => {
      const availableCourses = Object.entries(Subjects[v]).filter(e => availableBooks.includes(e[0])).map(e => ({ [e[0]]: e[1] }))
      if (Object.keys(availableCourses).length !== 0)
        coursesAvailable[v] = Object.assign({}, ...availableCourses)
    });

    return coursesAvailable
  }

  const refUpdate = (id) => ref => {
    if (!ref) return;
    if (sectionRefs) sectionRefs[id] = ref;
    else sectionRefs = { [id]: ref };
    if (iobserver) iobserver.observe(ref);
  }


  useEffect(() => {

    if (!books || !Subjects) {
      return
    }

    const options = {
      threshold: [0.4],
    };

    const callback = (e, o) => {
      const intersectedPages = e.filter((p) => p.isIntersecting);
      const visiblePages = intersectedPages.map((e) => e.target.id);
      const bestMiddleElement = visiblePages[0];
      if (bestMiddleElement)
        setCurrentBookSection(bestMiddleElement);
    };

    const iObserver = new IntersectionObserver(callback, options);

    setIobserver(iObserver);

    return () => {
      iObserver.disconnect();
    };
  }, [books, Subjects])


  const RightSectionPlaceholder = (
    <div>
      <section className="books-details-section">
        <Skeleton variant="rect" width="60%" style={{ height: "50px" }} />
        <div className="books-details-book-section">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((book, index) => {
            return <BookEmpty book={book} />;
          })}
        </div>
      </section>
    </div>
  )

  const LeftSectionPlaceholder = (
    <div style={{ width: "30%" }}>
      <section className="left-content-section" >
        <Skeleton variant="rect" width="60%" style={{ height: "20px" }} />{" "}
        <br />
        <Skeleton
          variant="rect"
          width="60%"
          style={{ height: "20px" }}
        />{" "}
        <br />
        <Skeleton
          variant="rect"
          width="60%"
          style={{ height: "20px" }}
        />{" "}
        <br />
        <Skeleton variant="rect" width="60%" style={{ height: "20px" }} />
      </section>
    </div>
  )

  const handleItemClick = (id) => (e) => {
    if (sectionRefs[id]) {
      window.scrollTo({ top: sectionRefs[id].offsetTop - 84, behavior: "auto" });
    }
  }

  const courses = books && Subjects && filterSubjectsFromAvailableBooks()

  const left = courses? (<div className="books-left-section" ref={scrollRef} ><LeftContent parentScroll={scrollRef.current} onItemClick={handleItemClick} highlight={currentBookSection} courses={courses} /></div>) : LeftSectionPlaceholder;

  const right = courses && iobserver ? (
    <div className="books-right-section" style={{ width: "50%" }} >
      {
        Object.entries(courses).map(([subjectName, courses]) => {
          return Object.entries(courses).map(([bookId, courseData], i) => {
            return (
              <div id={bookId} ref={refUpdate(bookId)} key={bookId}>
                <RightBooks course={courseData.name} books={books[bookId]} />
              </div>
            );
          });
        })
      }
    </div>
  ) : RightSectionPlaceholder;

  return (
    <section className="books-page">
      {left}
      {right}
    </section>
  );
}

export default BooksPage;
