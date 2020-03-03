import { useAsyncSelector } from ".";

describe("use async selector", () => {
  test("initial state", () => {});

  test("loading state", async () => {
    const neverEndingSelector = state => new Promise();

    const { loading, error, data } = useAsyncSelector(neverEndingSelector);

    expect(loading).toBe(true);
    expect(error).toBe(false);
    expect(data).toBe(null);
  });
});
