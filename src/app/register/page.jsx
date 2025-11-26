"use client";

import { Suspense } from "react";
import RegisterPage from "./registerPage";


export default function RegisterWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}
