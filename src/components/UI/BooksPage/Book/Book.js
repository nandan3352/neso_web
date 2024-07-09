import React from "react";
import "./Book.css";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core";
import { Star } from "@material-ui/icons";


const useStyle = makeStyles(theme => ({
  icon: {
    color: "rgba(242, 153, 74, 1) !important",
    htmlColor: "rgba(242, 153, 74, 1) !important",
  }
}))

function Book({ book }) {
  var stars = [];
  var ratings = book.rating.split(".");
  for (var i = 0; i < ratings[0]; i++) {
    stars[i] = i;
  }

  const classes = useStyle()

  return (
    <section className="book-section">
      <a href={book.url ? book.url : "/"} target='_blank' rel='noopener noreferrer'>
        <img src={book.img} className="book-thumbnail" alt="" />
        <div className="book-details">
          <p className="book-author">{book.author ? book.author : ""}</p>
          <p className="book-name">{book.name}</p>
          <div style={{ display: "flex" }}>
            <Tooltip title={book.rating} arrow>
              <div className="book-rating">
                <Rating
                  icon={ <Star fontSize="inherit" htmlColor={""} />}
                  classes={{ iconFilled: classes.icon }}
                  name="half-rating-read"
                  defaultValue={book.rating}
                  precision={0.1}
                  readOnly
                />
              </div>
            </Tooltip>
            <span className="b-rcount">({book.rcount})</span>
          </div>
        </div>
      </a>
    </section>
  );
}

export default Book;
