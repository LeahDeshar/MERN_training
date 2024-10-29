import request from "supertest";
import app from "./index";
import { Server } from "http";

describe("GET /", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it("should return Hello World", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
