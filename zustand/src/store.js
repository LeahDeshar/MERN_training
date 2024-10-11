import { create } from "zustand";

const store = () => ({
  tasks: [{ title: "TestTask", state: "PLANNED" }],
});
export const useStore = create(store);
