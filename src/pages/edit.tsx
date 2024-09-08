import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import "../styles/Edit.scss";
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useCookies } from 'react-cookie';
import { Book } from './home';
import { AxiosError } from 'axios';

interface Inputs {
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

function Edit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const { data: book } = useSuspenseQuery({
    queryKey: ["bookreview", id],
    queryFn: async () => {
      const { data } = await axios.get<Book>(`/books/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${cookies["token"]}`
          },
        },
      );

      return data;
    },
  });
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ defaultValues: book });
  const [error, setError] = React.useState("");

  const handleUpdateBookReview: SubmitHandler<Inputs> = async function (data) {
    try {
      await axios.put(`/books/${id}`, data,
        {
          headers: {
            "Authorization": `Bearer ${cookies["token"]}`
          },
        },
      );

      await queryClient.invalidateQueries({ queryKey: ["bookreview", id] });

      navigate("/");
    } catch (error: unknown) {
      error && setError((error as AxiosError<StationError>).response?.data?.ErrorMessageJP!);
    }
  }

  return (
    <div className="book-review-form">
      <form onSubmit={handleSubmit(handleUpdateBookReview)}>
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

        {error && (
          <div className="form-group error-message">
            <span>{error}</span>
          </div>
        )}

        <div className="form-group">
          <button type="submit" className="submit-button">
            更新
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit;
