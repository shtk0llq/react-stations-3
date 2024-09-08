import { Book } from "../../pages/home";
import "./BookReviewDetail.scss";

export const BookReviewDetail = ({ book }: { book: Book }) => {
  return (
    <div className="detail-book-review-container">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-url">
        URL：<a href={book.url}>{book.url}</a>
      </p>
      <p className="reviewer">
        レビュワー：<span>{book.reviewer}</span>
      </p>

      <div className="review-section">
        <p className="section-title">詳細</p>
        <p className="detail-text">{book.detail}</p>
      </div>

      <div className="review-section">
        <p className="section-title">レビュー</p>
        <p className="review-text">{book.review}</p>
      </div>
    </div>
  );
};
