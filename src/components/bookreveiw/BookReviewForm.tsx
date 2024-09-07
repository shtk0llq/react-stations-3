import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from '../../api/axios';
import { AxiosError } from 'axios';
import './BookReviewForm.scss';

interface BookReviewInputs {
  title: string;
  url: string;
  detail: string;
  review: string;
}

type StationError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export const BookReviewForm = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<BookReviewInputs>();
  const [error, setError] = React.useState("");

  const handleCreateBookReview: SubmitHandler<BookReviewInputs> = async function (data) {
    try {
      await axios.post("/books", data,
        {
          headers: {
            "Authorization": `Bearer ${cookies["token"]}`
          }
        }
      );

      navigate("/");
    } catch (error) {
      error &&
        setError(
          (error as AxiosError<StationError>).response?.data?.ErrorMessageJP!,
        );
    }
  }

  return (
    <div className="book-review-form">
      <form onSubmit={handleSubmit(handleCreateBookReview)}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            {...register("title", { required: true })}
          />
          {errors.title && <span>タイトルを入力してください</span>}
        </div>

        <div className="form-group">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            id="url"
            className="form-input"
            {...register("url", { required: true })}
          />
          {errors.url && <span>URLを入力してください</span>}
        </div>

        <div className="form-group">
          <label htmlFor="detail" className="form-label">
            詳細
          </label>
          <textarea
            id="detail"
            rows={3}
            className="form-textarea"
            {...register("detail", { required: true })}
          ></textarea>
          {errors.detail && <span>詳細を入力してください</span>}
        </div>

        <div className="form-group">
          <label htmlFor="review" className="form-label">
            レビュー
          </label>
          <textarea
            id="review"
            rows={3}
            className="form-textarea"
            {...register("review", { required: true })}
          ></textarea>
          {errors.review && <span>レビューを入力してください</span>}
        </div>

        {error && <div className="form-group error-message"><span>{error}</span></div>}

        <div className="form-group">
          <button
            type="submit"
            className="submit-button"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
};
