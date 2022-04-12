const to = require("./lib/to");
const { instance, userOne, userTwo, nonExistantUser } = require("./lib/setup");

/* ======================= User Registration & Login ======================= */
describe("user", () => {
  describe("registration", () => {
    describe("with missing email", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            password: userOne.password,
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));
      test("should return status text - Bad Request", () =>
        expect(response.statusText).toBe("Bad Request"));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with missing password", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            email: userOne.email,
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));
      test("should return status text - Bad Request", () =>
        expect(response.statusText).toBe("Bad Request"));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with missing email and password", () => {
      beforeAll(async () => {
        const request = await to.object(instance.post(`user/register`, {}));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));
      test("should return status text - Bad Request", () =>
        expect(response.statusText).toBe("Bad Request"));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with valid email and password", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            email: userOne.email,
            password: userOne.password,
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 201", () =>
        expect(response.status).toBe(201));
      test("should return status text - Created", () =>
        expect(response.statusText).toBe("Created"));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });
  });
});

describe("login", () => {
  describe("with missing email", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          password: userOne.password,
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });
    test("should return status code 400", () =>
      expect(response.status).toBe(400));
    test("should return status text - Created", () =>
      expect(response.statusText).toBe("Bad Request"));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with missing password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, { email: userOne.email })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });
    test("should return status code 400", () =>
      expect(response.status).toBe(400));
    test("should return status text - Created", () =>
      expect(response.statusText).toBe("Bad Request"));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with non-existing user (email)", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: nonExistantUser.email,
          password: nonExistantUser.password,
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 401", () =>
      expect(response.status).toBe(401));
    test("should return status text - Created", () =>
      expect(response.statusText).toBe("Unauthorized"));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with invalid password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: userOne.email,
          password: "invalid-password",
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 401", () =>
      expect(response.status).toBe(401));
    test("should return status text - Created", () =>
      expect(response.statusText).toBe("Unauthorized"));
    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with valid email and password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: userOne.email,
          password: userOne.password,
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));
    test("should return status text - OK", () =>
      expect(response.statusText).toBe("OK"));
    test("should contain token property", () =>
      expect(response.data).toHaveProperty("token"));
    test("should contain token_type property", () =>
      expect(response.data).toHaveProperty("token_type"));
    test("should contain expires_in property", () =>
      expect(response.data).toHaveProperty("expires_in"));
    test("should contain correct token_type", () =>
      expect(response.data.token_type).toBe(`Bearer`));
    test("should contain correct expires_in", () =>
      expect(response.data.expires_in).toBe(86400));
  });
});
