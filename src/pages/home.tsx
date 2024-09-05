import { useQuery } from "@tanstack/react-query";
import { BookReview } from "../components/BookReview";
import axios from "../api/axios";
import { useAppSelector } from "../stores/hooks";
import { Pagination } from "../components/Pagination";

export interface Book {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
}

function Home() {
  const page = useAppSelector((state) => state.pagination.value);
  const { data, status, error } = useQuery({
    queryKey: ["books", page],
    queryFn: async () => {
      const { data } = await axios.get<Book[]>(`/public/books?offset=${page}`);
      return data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {status === "success" &&
          data.map((book) => <BookReview key={book.id} book={book} />)}
      </div>

      <Pagination />
    </div>
  );
}

export default Home;
