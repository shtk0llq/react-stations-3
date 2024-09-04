import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "../../components/LoginForm";

describe(LoginForm, () => {
  test("ログインフォームが正しくレンダリングされるか？", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("メールアドレス");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    const passwordInput = screen.getByLabelText("パスワード");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute("type", "submit");

    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
