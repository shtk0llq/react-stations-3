import React from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "../api/axios";
import { AxiosError } from "axios";
import styles from "../styles/SignupForm.module.scss"

interface Inputs {
  name: string;
  email: string;
  password: string;
  icon: FileList;
}

type StationError = {
  ErrorCode: number,
  ErrorMessageJP: string,
  ErrorMessageEN: string,
}

export const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [cookies, setCookie, removeCookie] = useCookies();
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

      await axios.post("/uploads",
        {
          icon: imageFile
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
    } catch (error: unknown) {
      error && setError((error as AxiosError<StationError>).response?.data?.ErrorMessageJP!)
    }
  }

  const { ref, ...rest } = register("icon", {
    onChange: handleFileChange,
    required: "アイコンを選択してください"
  })

  return (
    <form role="form" className={styles.signup_form} onSubmit={handleSubmit(handleSignup)}>
      <div className={styles.form_group}>
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
        {errors.icon && <span>アイコン画像を入力してください</span>}
      </div>

      <div className={styles.form_group}>
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>名前を入力してください</span>}
      </div>

      <div className={styles.form_group}>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>メールアドレスを入力してください</span>}
      </div>

      <div className={styles.form_group}>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>パスワードを入力してください</span>}
      </div>

      <div className={styles.form_group}>
        {error && <span>{error}</span>}
      </div>

      <div className={styles.form_group}>
        <button type="submit">新規登録</button>
      </div>

      <Link to="/signin">すでにアカウントをお持ちの方</Link>
    </form>
  )
}
