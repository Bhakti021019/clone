import request from "supertest";
import app from "../index";  // Import your express app

describe("POST /submit", () => {
  it("should return 400 for invalid Aadhaar", async () => {
    const response = await request(app)
      .post("/submit")
      .send({
        aadhaar: "1234",  // Invalid Aadhaar
        pan: "ABCDE1234F",
        pincode: "110001",
        city: "New Delhi",
        state: "Delhi",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid Aadhaar number");
  });

  it("should return 200 for valid data", async () => {
    const response = await request(app)
      .post("/submit")
      .send({
        aadhaar: "123456789012",  // Valid Aadhaar
        pan: "ABCDE1234F",  // Valid PAN
        pincode: "110001",
        city: "New Delhi",
        state: "Delhi",
      });
    expect(response.status).toBe(200);
    expect(response.body.aadhaar).toBe("123456789012");
  });
});
