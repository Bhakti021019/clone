import { validateAadhaar, validatePAN } from "../utils/validation";  // Import validation functions

describe("Validation Tests", () => {
  it("should validate correct Aadhaar numbers", () => {
    expect(validateAadhaar("123456789012")).toBe(true);  // Valid Aadhaar
    expect(validateAadhaar("1234")).toBe(false);  // Invalid Aadhaar
  });

  it("should validate correct PAN numbers", () => {
    expect(validatePAN("ABCDE1234F")).toBe(true);  // Valid PAN
    expect(validatePAN("12345ABCDE")).toBe(false);  // Invalid PAN
  });
});
