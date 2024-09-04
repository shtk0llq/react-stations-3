import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test.beforeEach("ログインページが存在するか？", async ({ page }) => {
    await page.goto(`/login`);
  });

  test("メールアドレス入力フォームが存在するか？", async ({ page }) => {
    const emailInput = page.getByLabel("メールアドレス");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("type", "email");
  });

  test("パスワード入力フォームが存在するか？", async ({ page }) => {
    const passwordInput = page.getByLabel("パスワード");
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("ログインボタンが存在するか？", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "ログイン" });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });
});
