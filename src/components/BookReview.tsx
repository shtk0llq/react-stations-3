import { Link } from "react-router-dom";
import { Book } from "../pages/home";
import "../styles/BookReview.scss";

export const BookReview = ({ book }: { book: Book }) => {
  return (
    <div className="book-review-container">
      <h2 className="book-title">
        <Link to={`/detail/${book.id}`}>{book.title}</Link>
      </h2>
      <p className="book-url">
        URL：<a href={book.url}>{book.url}</a>
      </p>
      <p className="reviewer">
        レビュワー：<span>{book.reviewer}</span>
      </p>
      <p className="review-text">{book.review}</p>
    </div>
  );
};
