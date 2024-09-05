import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SigninForm } from "../../components/SigninForm";
import { MemoryRouter } from "react-router-dom";

// submit した結果が正しいものかチェックする
// 正常ケースとエラーケースのチェックする

describe("SigninForm", () => {
  test("ログインフォームが正しくレンダリングされるか？", () => {
    render(
      <MemoryRouter>
        <SigninForm />
      </MemoryRouter>
    );

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
