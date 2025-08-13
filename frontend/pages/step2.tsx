import { useState, useEffect } from "react";
import schemaData from "../public/udyam_schema.json";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

type FormField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  pattern?: string;
};

export default function Step2() {
  const router = useRouter();
  const schema = schemaData as { step2: { fields: FormField[] } };

  const [formData, setFormData] = useState<Record<string, string>>({
    pincode: "",
    city: "",
    state: "",
    pan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prevData, setPrevData] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  // Load Step 1 data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("step1Data");
    if (saved) {
      setPrevData(JSON.parse(saved));
    }
  }, []);

  // Fetch city & state from India Post API
  const handlePincodeChange = async (pin: string) => {
    const cleanPin = pin.replace(/\D/g, ""); // only digits
    setFormData((prev) => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${cleanPin}`
        );
        const data = await res.json();

        if (data[0]?.Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          alert("Invalid Pincode");
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
        }
      } catch (err) {
        console.error("Error fetching pincode data:", err);
      }
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stepSchema = schema.step2;
    const newErrors: Record<string, string> = {};

    // Validate against schema
    stepSchema.fields
      .filter((f) => f.name !== "aadhaar") // Aadhaar excluded from frontend validation
      .forEach((field) => {
        const value = formData[field.name] || "";
        if (field.required && !value) {
          newErrors[field.name] = "Required";
        } else if (field.pattern && !new RegExp(field.pattern).test(value)) {
          newErrors[field.name] = "Invalid format";
        }
      });

    // Additional custom validation for PAN
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (formData.pan && !panRegex.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload without Aadhaar
    const payload = { ...prevData, ...formData };
    delete payload.aadhaar;

    console.log("Submitting payload:", payload);

    alert("Form submitted successfully");

    // try {
    //   await axios.post("http://localhost:4000/submit", payload);
    //   alert("Form submitted successfully!");
    //   localStorage.removeItem("step1Data");
    //   router.push("/step3");
    // } catch (err: any) {
    //   console.error(err.response?.data || err.message);
    //   alert(err.response?.data?.message || "Error submitting form");
    // }
  };

  return (
    <div className="form-container">
      <Navbar />
      <h1 className="title">Step 2: Address Details</h1>

      <form onSubmit={handleSubmit}>
        {schema.step2.fields
          .filter((field) => field.name !== "aadhaar") // Exclude Aadhaar
          .map((field) => (
            <div key={field.name} className="input-group">
              <label className="label">{field.label}</label>
              <input
                className="input-field"
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  field.name === "pincode"
                    ? handlePincodeChange(e.target.value)
                    : handleFieldChange(field.name, e.target.value)
                }
                readOnly={field.name === "city" || field.name === "state"}
                maxLength={field.name === "pincode" ? 6 : undefined}
              />
              {errors[field.name] && (
                <p className="error-text">{errors[field.name]}</p>
              )}
            </div>
          ))}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }
        .input-field {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          font-size: 16px;
        }
        .error-text {
          color: #f44336;
          font-size: 14px;
        }
        .submit-button {
          background-color: #007bff;
          color: white;
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          width: 100%;
        }
        .submit-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
