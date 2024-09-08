import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useAppSelector } from "../stores/hooks";
import axios from "../api/axios";
import { BookReview } from "../components/BookReview";
import { Pagination } from "../components/Pagination";

export interface Book {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine?: boolean;
}

function Home() {
  const [cookies] = useCookies(["token"]);
  const auth = useAppSelector((state) => state.auth.isSignin);
  const page = useAppSelector((state) => state.pagination.value);

  const { data, status, error } = useQuery({
    queryKey: ["books", page, auth],
    queryFn: async () => {
      if (auth) {
        const { data } = await axios.get<Book[]>(`/books?offset=${0 + page * 10}`,
          {
            headers: {
              "Authorization": `Bearer ${cookies["token"]}`
            },
          },
        );
        return data;
      } else {
        const { data } = await axios.get<Book[]>(`/public/books?offset=${0 + page * 10}`);
        return data;
      }
    },
  });

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {status === "success" &&
          data.map((book) => <BookReview key={book.id} book={book} />)}
      </div>

      <Pagination />
    </div>
  );
}

export default Home;
