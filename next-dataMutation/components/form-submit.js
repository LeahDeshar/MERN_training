"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const { status, message } = useFormStatus();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>{message}</p>;
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
