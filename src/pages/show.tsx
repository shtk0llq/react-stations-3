import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { BookReviewDetail } from "../components/bookreveiw/BookReviewDetail";
import { Book } from "./home";

function Show() {
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);

  const { data: book } = useSuspenseQuery({
    queryKey: ["bookreview", id],
    queryFn: async () => {
      const { data } = await axios.get<Book>(`books/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });
      return data;
    },
  });

  return <BookReviewDetail book={book} />;
}

export default Show;
