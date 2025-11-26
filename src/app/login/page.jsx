"use client";

import { Suspense } from "react";
import LoginPage from "./loginPage";


export default function LoginWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}
