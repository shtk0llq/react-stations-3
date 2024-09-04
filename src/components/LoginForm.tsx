export const LoginForm = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" name="password" id="password" />
        </div>

        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </>
  );
};
