import { Link } from "react-router-dom";
import { Book } from "../pages/home";
import "../styles/BookReview.scss";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

export const BookReview = ({ book }: { book: Book }) => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["token"]);
  const { handleSubmit, formState: { errors } } = useForm();

  const handleDeleteBookReview = async function () {
    try {
      await axios.delete(`/books/${book.id}`,
        {
          headers: {
            "Authorization": `Bearer ${cookies["token"]}`,
          },
        },
      );

      queryClient.invalidateQueries({ queryKey: ["books"] });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="book-review-container">
      <div className="book-review-content">
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

      {book.isMine && (
        <div className="book-review-buttons">
          <Link to={`/edit/${book.id}`}>
            <button className="book-review-edit-button">
              編集
            </button>
          </Link>
          <form onSubmit={handleSubmit(handleDeleteBookReview)}>
            <button className="book-review-delete-button">
              削除
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
