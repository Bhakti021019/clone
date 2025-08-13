export function validatePAN(pan: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
}

export function validateAadhaar(aadhaar: string): boolean {
  return /^[0-9]{12}$/.test(aadhaar);
}
