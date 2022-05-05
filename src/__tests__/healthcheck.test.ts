import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("GET /api/v1/healthcheck", () => {
  it("should return 200 OK", async () => {
    await supertest(app).get("/api/v1/healthcheck").expect(200);
  });
});
