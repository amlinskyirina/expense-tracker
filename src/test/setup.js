import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// ניקוי סביבת התצוגה אחרי כל בדיקה
afterEach(() => {
  cleanup();
});