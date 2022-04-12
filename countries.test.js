const to = require("./lib/to");
const { instance } = require("./lib/setup");

/* ======================= Countries ======================= */
describe("countries", () => {
  describe("with no query parmater", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get(`countries`));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a list of all countries", () =>
      expect(response.status).toBe(200));
    test("should return status text - OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should return an array", () =>
      expect(response.data).toBeInstanceOf(Array));
    test("should contain 76 countries", () =>
      expect(response.data.length).toBe(76));
    test("should have first country of Algeria", () =>
      expect(response.data[0]).toBe("Algeria"));
    test("should have last country of Yemen", () =>
      expect(response.data[75]).toBe("Yemen"));
  });
});
