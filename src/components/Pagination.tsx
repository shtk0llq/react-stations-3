import "../styles/Pagination.scss";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { next, prev } from "../stores/paginationSlice";

export const Pagination = () => {
  const page = useAppSelector((state) => state.pagination.value);
  const dispatch = useAppDispatch();

  return (
    <div className="pagination-container">
      <button
        className="pagination-button pagination-button-prev"
        onClick={() => dispatch(prev())}
        disabled={page <= 0}
      >
        前へ
      </button>
      <button
        className="pagination-button pagination-button-next"
        onClick={() => dispatch(next())}
      >
        次へ
      </button>
    </div>
  );
};
