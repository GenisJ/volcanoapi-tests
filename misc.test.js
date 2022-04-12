const { instance } = require("./lib/setup");
const to = require("./lib/to");

/* ======================= Misc ======================= */
describe("Miscellaneous", () => {
  describe("with non-existent route", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get(`invalid-route`));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 404", () => expect(response.status).toBe(404));
    test("should return status text - Not Found", () =>
      expect(response.statusText).toBe("Not Found"));
  });

  describe("with swagger docs route", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get());
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 200", () => expect(response.status).toBe(200));
    test("should return status text - OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should return Swagger UI", () =>
      expect(response.data).toContain("Swagger UI"));
  });

  describe("with cors header", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get());
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 200", () => expect(response.status).toBe(200));
    test("should return status text - OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should return access-control-allow-origin in headers", () =>
      expect(response.headers).toHaveProperty("access-control-allow-origin"));
  });

  describe("with supressed x-powered-by header", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get());
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 200", () => expect(response.status).toBe(200));
    test("should return status text - OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should not x-powered-by header property", () =>
      expect(response.headers).not.toHaveProperty("x-powered-by"));
  });
});
