const request = require("supertest");
import app from "../../../index";
const prefixUrl = "/book-store";
const jwt = process.env.adminToken;
const id = 1;

describe("Create Book: Test cases for fetching book by id", () => {
  test("Get Book: 1. test case without jwt token", async () => {
    const res = await request(app)
      .get(prefixUrl + `/books/${id}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("Get Book: 2. test case with id, which doesn't exist in database", async () => {
    const res = await request(app)
      .get(prefixUrl + `/books/1000`)
      .set({ jwt })
      .send();
    expect(res.body.code).toBe(404);
    expect(res.body.message).toBe("Record not found");
  });
});
