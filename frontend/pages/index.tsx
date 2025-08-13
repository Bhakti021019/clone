import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import ProgressTracker from "../components/ProgressBar";

export default function Step1Page() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [aadhaar, setAadhaar] = useState(""); // ✅ Aadhaar state

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    alert("OTP sent! (Dummy)");
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setOtpVerified(true);

      // ✅ Save Aadhaar to localStorage so Step 2 can access it
      localStorage.setItem("aadhaar", aadhaar);

      alert("OTP Verified!");
      router.push("/step2");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container">
      <Navbar />

      <div className="heading-container">
        <div className="heading">
          <h2 className="page-title">
            UDYAM REGISTRATION FORM – For New Enterprise who are not Registered yet as MSME
          </h2>
        </div>
      </div>

      <main className="form-main">
        <div className="form-container">
          <div className="blue-heading">Aadhaar Verification With OTP</div>

          <div className="form-content">
            <div className="form-grid">
              {/* ✅ Aadhaar Number */}
              <div className="input-group">
                <label className="label">
                  1. Aadhaar Number / <span className="subtitle">आधार संख्या</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Aadhaar No"
                  className="input"
                  maxLength={12}
                  value={aadhaar}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setAadhaar(onlyNums);
                  }}
                />
              </div>

              {/* Name */}
              <div className="input-group">
                <label className="label">
                  2. Name of Entrepreneur / <span className="subtitle">उद्योगी का नाम</span>
                </label>
                <input
                  type="text"
                  placeholder="Name as per Aadhaar"
                  className="input"
                />
              </div>
            </div>

            {/* OTP Section */}
            <div className="otp-section">
              <button
                className="button"
                onClick={handleSendOtp}
                disabled={otpSent}
              >
                {otpSent ? "OTP Sent" : "Send OTP"}
              </button>
              {otpSent && (
                <>
                  <div className="otp-input-group">
                    <label className="label">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter 6-digit OTP"
                      className="input"
                    />
                  </div>
                  <button
                    className="button"
                    onClick={handleVerifyOtp}
                    disabled={!otp}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>

            {/* Instructions */}
            <ul className="instructions">
              <li>Aadhaar number shall be required for Udyam Registration.</li>
              <li>
                The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm, and of a karta in the case of a Hindu Undivided Family (HUF).
              </li>
              <li>
                In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN (As per applicability of CGST Act 2017) and PAN along with its Aadhaar number as notified by the ministry of MSME{" "}
                <a href="#" className="link">
                  vide S.O. 1055(E) dated 05th March 2021
                </a>
                .
              </li>
            </ul>

            {/* Consent */}
            <div className="consent">
              <input type="checkbox" className="checkbox" />
              <p className="consent-text">
                I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as allotted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared.
              </p>
            </div>

            {/* Submit Button */}
            <button className="button">
              Validate &amp; Generate OTP
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2 className="footer-title">UDYAM REGISTRATION</h2>
            <p>Ministry of MSME</p>
            <p>Udyog Bhawan – New Delhi</p>
            <p><strong>Email:</strong> champions@gov.in</p>
            <p className="footer-link">Contact Us</p>
            <p className="footer-link">For Grievances / Problems</p>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li>CHAMPIONS</li>
              <li>MSME Samadhaan</li>
              <li>MSME Sambandh</li>
              <li>MSME Dashboard</li>
              <li>Entrepreneurship Skill Development Programme (ESDP)</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Video</h3>
            <video width="250" controls>
              <source src="https://www.udyamregistration.gov.in/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © Copyright <strong>Udyam Registration</strong>. All Rights Reserved. Website Content Managed by Ministry of Micro Small and Medium Enterprises, GoI
          </p>
          <p>
            Website hosted & managed by National Informatics Centre, Ministry of Communications and IT, Government of India
          </p>
        </div>
      </footer>

      <style jsx>{`
        /* General styling */
        .container {
          background-color: #f9fafb;
          min-height: 100vh;
        }
        .heading-container {
          background-color: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .heading {
          text-align: center;
          padding: 20px;
        }
        .page-title {
          font-size: 24px;
          font-weight: 600;
          color: #4a4a4a;
        }
        .form-main {
          padding: 30px;
        }
        .form-container {
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }
        .blue-heading {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          font-weight: 600;
        }
        .form-content {
          padding: 20px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }
        .subtitle {
          color: #4a4a4a;
        }
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        .instructions {
          list-style-type: disc;
          padding-left: 20px;
          color: #4a4a4a;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .link {
          color: #007bff;
          text-decoration: underline;
        }
        .consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
        }
        .checkbox {
          margin-top: 4px;
          transform: scale(0.8);
        }
        .consent-text {
          font-size: 15px;
          color: #4a4a4a;
        }
        .button {
          background-color: #007bff;
          color: white;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          width: auto;
          font-size: 16px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        .otp-section {
          margin-top: 20px;
        }
        .otp-input-group {
          margin-top: 10px;
        }
        .otp-input-group .label {
          font-size: 16px;
          font-weight: 600;
        }
        .footer {
          background: linear-gradient(135deg, #001f54, #142850);
          color: white;
          padding: 40px 20px;
        }
        .footer-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          max-width: 1200px;
          margin: auto;
        }
        .footer-title {
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .footer-column h3 {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 700;
        }
        .footer-column p, 
        .footer-column li {
          font-size: 15px;
          margin-bottom: 6px;
        }
        .footer-link {
          font-weight: bold;
          cursor: pointer;
        }
        .footer-column ul {
          list-style: none;
          padding: 0;
        }
        .footer-column li::before {
          content: "› ";
          color: #00d4ff;
        }
        .footer-divider {
          border: none;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin: 20px 0;
        }
        .footer-bottom {
          font-size: 13px;
          color: #dcdcdc;
          text-align: center;
          line-height: 1.5;
        }
        video {
          border-radius: 6px;
          border: 2px solid #00d4ff;
        }
      `}</style>
    </div>
  );
}
