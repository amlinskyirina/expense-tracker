import { expect, test } from "vitest";

test("verifies that CI detects a failing test", () => {
  expect(true).toBe(false);
});
