"use client";

import { signIn, signOut } from "next-auth/react";

type AdminAuthButtonProps = {
  action: "sign-in" | "sign-out";
  callbackUrl?: string;
  label?: string;
  disabled?: boolean;
};

export function AdminAuthButton({
  action,
  callbackUrl,
  label,
  disabled = false,
}: AdminAuthButtonProps) {
  const isSignIn = action === "sign-in";

  async function handleClick() {
    if (disabled) {
      return;
    }

    if (isSignIn) {
      await signIn("github", {
        redirectTo: callbackUrl ?? "/admin",
      });
      return;
    }

    await signOut({
      redirectTo: callbackUrl ?? "/admin/login",
    });
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
        isSignIn
          ? "border border-cyan-300/30 bg-cyan-400/12 text-cyan-100 hover:border-cyan-200/50 hover:bg-cyan-300/18"
          : "border border-white/15 bg-white/8 text-slate-100 hover:border-white/25 hover:bg-white/12"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {label ?? (isSignIn ? "Sign in with GitHub" : "Sign out")}
    </button>
  );
}
