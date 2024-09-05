import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "../api/axios";
import styles from "../styles/SigninForm.module.scss";

interface Inputs {
  email: string;
  password: string;
}

export const SigninForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [error, setError] = React.useState("");

  const handleSignup: SubmitHandler<Inputs> = async function (data) {
    try {
      const response = await axios.post("/signin", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      setCookie("token", token);
    } catch (error: unknown) {
      setError(error.response.data.ErrorMessageJP)
    }
  }

  return (
    <form role="form" className={styles.signup_form} onSubmit={handleSubmit(handleSignup)}>
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
        <button type="submit">ログイン</button>
      </div>

      {/* <a href="/signup">まだアカウントをお持ちでない方</a> */}
      <Link to="/signup">まだアカウントをお持ちでない方</Link>
    </form>
  );
};
