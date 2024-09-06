import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "../api/axios";
import Header, { User } from "../components/Header";
import "../styles/Profile.scss";

interface Inputs {
  name: string;
  icon: File;
}

type StationError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

function UserForm({
  user,
  handleUserUpdate,
  error,
}: {
  user: User;
  handleUserUpdate: SubmitHandler<Inputs>;
  error: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: user });

  return (
    <form onSubmit={handleSubmit(handleUserUpdate)} className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          名前
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="form-input"
        />
        {errors.name && (
          <span className="error-message">名前を入力してください</span>
        )}
      </div>

      <div className="form-group">
        {error && <span className="common-error">{error}</span>}
      </div>

      <div>
        <button type="submit" className="submit-button">
          更新
        </button>
      </div>
    </form>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [error, setError] = React.useState("");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get<User>("/users", {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });
      return data;
    },
  });

  const handleUserUpdate: SubmitHandler<Inputs> = async function (data) {
    try {
      await axios.put(
        "/users",
        {
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies["token"]}`,
          },
        },
      );

      navigate("/");
    } catch (error: unknown) {
      error &&
        setError(
          (error as AxiosError<StationError>).response?.data?.ErrorMessageJP!,
        );
    }
  };

  return (
    <>
      <Header />

      {user && (
        <UserForm
          user={user}
          handleUserUpdate={handleUserUpdate}
          error={error}
        />
      )}
    </>
  );
}

export default Profile;
