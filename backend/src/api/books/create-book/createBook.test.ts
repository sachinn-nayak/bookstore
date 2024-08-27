const request = require("supertest");
import app from "../../../index";
import { createBookJoiValidationMessages } from "./CreateBookJoiValidation";
const prefixUrl = "/book-store";
const jwt = process.env.adminToken;

describe("Book store: Test cases for creating book", () => {
  test("Create Book: 1. test case without jwt token", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("Create Book: 2. test case for empty request body", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.title.required
    );
  });

  test("Create Book: 3. test case with title as empty string", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(createBookJoiValidationMessages.title.empty);
  });

  test("Create Book: 4. test case with title as empty object", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(createBookJoiValidationMessages.title.base);
  });

  test("Create Book: 5. test case with valid title and without remaining attributes", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.author.required
    );
  });

  test("Create Book: 6. test case with valid title and author as empty string", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(createBookJoiValidationMessages.author.empty);
  });

  test("Create Book: 7. test case with valid title and author as empty object", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(createBookJoiValidationMessages.author.base);
  });

  test("Create Book: 8. test case with valid title, author and without remaining attributes", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.description.required
    );
  });

  test("Create Book: 9. test case with valid title, author and description as empty string", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description: "",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.description.empty
    );
  });

  test("Create Book: 10. test case with valid title and author and description as empty object", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.description.base
    );
  });

  test("Create Book: 11. test case with valid title, author, description and without publicationYear ", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description:
          "A New Earth: Awakening to Your Life's Purpose Eckhart Tolle ; The Four Agreements Miguel Ruiz ; Tao Te Ching Lao Tzu",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.yearOfPublication.required
    );
  });

  test("Create Book: 12. test case with valid title, author, description and with publicationYear as empty string", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description:
          "A New Earth: Awakening to Your Life's Purpose Eckhart Tolle ; The Four Agreements Miguel Ruiz ; Tao Te Ching Lao Tzu",
        publicationYear: "",
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.yearOfPublication.empty
    );
  });

  test("Create Book: 13. test case with valid title, author, description and with publicationYear as empty object", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description:
          "A New Earth: Awakening to Your Life's Purpose Eckhart Tolle ; The Four Agreements Miguel Ruiz ; Tao Te Ching Lao Tzu",
        publicationYear: {},
      });
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe(
      createBookJoiValidationMessages.yearOfPublication.base
    );
  });

  test("Create Book: 13. test case with valid title, author, description, publicationYear. this test case will pass only if title is unique and which should be not be in database", async () => {
    const res = await request(app)
      .post(prefixUrl + "/books")
      .set({ jwt })
      .send({
        title: "A New Earth: Awakening to Your Life’s Purpose",
        author: "Eckhart Tolle",
        description:
          "A New Earth: Awakening to Your Life's Purpose Eckhart Tolle ; The Four Agreements Miguel Ruiz ; Tao Te Ching Lao Tzu",
        publicationYear: "2005/11/03",
      });
    expect(res.body.code).toStrictEqual(200);
    expect(res.body.message).toStrictEqual("book created successfully");
  });
});
