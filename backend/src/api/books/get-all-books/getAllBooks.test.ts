const request = require("supertest");
import app from "../../../index";
const prefixUrl = "/book-store";
const jwt = process.env.adminToken;

describe("Create Book: Test cases for fetching all books", () => {
  test("Get All Book: 1. test case without jwt token", async () => {
    const res = await request(app)
      .get(prefixUrl + `/books`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("Get All Book: 2. test case with valid request", async () => {
    const res = await request(app)
      .get(prefixUrl + `/books`)
      .set({ jwt })
      .send();
    expect(res.body.code).toBe(200);
    expect(res.body.message).toBe("book fetched successfully");
  });
});
