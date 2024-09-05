import { useQuery } from "@tanstack/react-query";
import { BookReview } from "../components/BookReview";
import axios from "../api/axios";

export interface Book {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
}

function Home() {
  const { data, status, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await axios.get<Book[]>("/public/books");
      return data;
    },
  });

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      {status === "success" &&
        data.map((book) => <BookReview key={book.id} book={book} />)}
    </div>
  );
}

export default Home;
