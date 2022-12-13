// mocked localStorage in setupTests.js
test("mocked localStorage works", () => {
  localStorage.setItem("apiKey", "12345");
  expect(localStorage.getItem("apiKey")).toEqual("12345");
});
