import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import "./SignupForm.scss";

interface Inputs {
  name: string;
  email: string;
  password: string;
  icon: FileList;
}

type StationError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [cookies, setCookie] = useCookies(["token"]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.files && setImageFile(e.target.files[0]);
  }

  const handleSignup: SubmitHandler<Inputs> = async function (data) {
    try {
      const response = await axios.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      setCookie("token", token);

      if (imageFile) {
        const formData = new FormData();
        formData.append("icon", imageFile);

        await axios.post("/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate("/");
    } catch (error: unknown) {
      error &&
        setError(
          (error as AxiosError<StationError>).response?.data?.ErrorMessageJP!,
        );
    }
  };

  const { ref, ...rest } = register("icon", {
    onChange: handleFileChange,
    required: "アイコンを選択してください",
  });

  return (
    <form
      role="form"
      className="signup-form"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="form-group">
        <label htmlFor="icon">アイコン</label>
        <input
          type="file"
          id="icon"
          accept=".jpg, .jpeg, .png"
          {...rest}
          ref={(e) => {
            ref(e);
            fileInputRef.current = e;
          }}
        />
        {errors.icon && <span>{errors.icon.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "名前を入力してください" })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレスを入力してください" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "パスワードを入力してください" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {error && <div className="form-group error-message"><span>{error}</span></div>}

      <div className="form-group">
        <button type="submit">新規登録</button>
      </div>

      <Link to="/signin">すでにアカウントをお持ちの方</Link>
    </form>
  );
};
