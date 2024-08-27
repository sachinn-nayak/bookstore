const request = require("supertest");
import app from "../../../index";
const prefixUrl = "/book-store";
const jwt = process.env.adminToken;
const id = 1;

describe("Create Book: Test cases for updating book by id", () => {
  test("Update Book: 1. test case without jwt token", async () => {
    const res = await request(app)
      .put(prefixUrl + `/books/${id}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("Update Book: 2. test case with id, which doesn't exist in database", async () => {
    const res = await request(app)
      .put(prefixUrl + `/books/1000`)
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description:
          "A New Earth: Awakening to Your Life's Purpose Eckhart Tolle ; The Four Agreements Miguel Ruiz ; Tao Te Ching Lao Tzu",
        publicationYear: "2005/11/03",
      });
    expect(res.body.code).toBe(404);
    expect(res.body.message).toBe("Record not found to update");
  });
});
