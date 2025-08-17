// import React, { useState } from "react";
// import emailjs from "emailjs-com"; // If you're using @emailjs/browser, keep the API the same.
// import "./contact.css";

// const Contact = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [emailError, setEmailError] = useState("");

//   // Email validation regex (unchanged)
//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }
//     setEmailError("");

//     // Prepare EmailJS data
//     const templateParams = {
//       from_name: name,
//       from_email: email,
//       message: message,
//     };

//     try {
//       setIsSending(true);
//       const response = await emailjs.send(
//         "service_mvcfiyi", // Your service ID
//         "template_sf6zwsg", // Your template ID
//         templateParams,
//         "LEoYzPGNQYaYi-3Ma" // Your public key (formerly user ID)
//       );

//       if (response.status === 200) {
//         setSubmitted(true);
//         setName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         throw new Error("Email sending failed.");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       alert("Something went wrong while sending your message. Please try again later.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="contact-page">
//       <header className="heading-container">
//         <div className="heading-heading">
//           <h1 className="pixel-title">CONTACT ME</h1>
//           <p className="pixel-sub">Let’s build something cool together.</p>
//         </div>
//       </header>

//       {!submitted ? (
//         <div className="contact-panel pixel-border">
//           {/* Social links section (above the form) */}
//           <section className="social-section">
//             <h2 className="section-title">Find me online</h2>
//             <ul className="social-list">
//               {/* Replace href values with your actual links */}
//               <li>
//                 <a
//                   className="social-link pixel-chip"
//                   href="https://github.com/yourhandle"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="GitHub"
//                 >
//                   <span className="chip-icon">{"</>"}</span>
//                   <span className="chip-text">GitHub</span>
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="social-link pixel-chip"
//                   href="https://www.linkedin.com/in/yourhandle"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="LinkedIn"
//                 >
//                   <span className="chip-icon">in</span>
//                   <span className="chip-text">LinkedIn</span>
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="social-link pixel-chip"
//                   href="https://twitter.com/yourhandle"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="X"
//                 >
//                   <span className="chip-icon">X</span>
//                   <span className="chip-text">Twitter</span>
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="social-link pixel-chip"
//                   href="https://www.instagram.com/yourhandle"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Instagram"
//                 >
//                   <span className="chip-icon">◎</span>
//                   <span className="chip-text">Instagram</span>
//                 </a>
//               </li>
//             </ul>

//             <div className="pixel-hr" aria-hidden="true" />
//           </section>

//           {/* Contact form */}
//           <form className="contact-form" onSubmit={handleSubmit} noValidate>
//             <h2 className="form-title">Any Questions?</h2>

//             <div className="input-group">
//               <label className="field-label" htmlFor="name">Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="pixel-input"
//               />
//             </div>

//             <div className="input-group">
//               <label className="field-label" htmlFor="email">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`pixel-input ${emailError ? "has-error" : ""}`}
//                 aria-invalid={emailError ? "true" : "false"}
//                 aria-describedby={emailError ? "email-error" : undefined}
//               />
//               {emailError && (
//                 <div id="email-error" className="error" role="alert">
//                   {emailError}
//                 </div>
//               )}
//             </div>

//             <div className="input-group">
//               <label className="field-label" htmlFor="message">Message</label>
//               <textarea
//                 id="message"
//                 placeholder="Enter your message"
//                 required
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="pixel-input textarea"
//               />
//             </div>

//             <button
//               type="submit"
//               className="submit-button pixel-button"
//               disabled={isSending}
//               aria-busy={isSending ? "true" : "false"}
//             >
//               {isSending ? "SENDING..." : "SUBMIT"}
//               <span className="arrow" aria-hidden>&gt;</span>
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="success-wrap">
//           <div className="success-message pixel-border" role="status">
//             Message sent—thanks! I’ll get back to you soon.
//           </div>
//           <button
//             className="pixel-button success-cta"
//             onClick={() => setSubmitted(false)}
//           >
//             Send another
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// Contact.js
import React, { useState } from "react";
import emailjs from "emailjs-com"; // or @emailjs/browser (API stays the same)
import styles from "./contact.module.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  // Honeypot (basic bot trap)
  const [botField, setBotField] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (botField) return; // bot caught

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    try {
      setIsSending(true);
      const response = await emailjs.send(
        "service_mvcfiyi",     // Your EmailJS service ID
        "template_sf6zwsg",    // Your EmailJS template ID
        templateParams,
        "LEoYzPGNQYaYi-3Ma"    // Your EmailJS public key
      );

      if (response.status === 200) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Email sending failed.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setGeneralError("Something went wrong while sending your message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contact" className={styles.contactRoot}><br></br>
      <div className={styles.contactContainer}>
        <header className={styles.headingContainer}>
          <div className={styles.headingHeading}>
            <h1 className={styles.pixelTitle}>Ping Me</h1>
            <p className={styles.pixelSub}>Ready to Co-Op on Something Epic?</p>
          </div>
        </header>

        {!submitted ? (
          <div className={`${styles.contactPanel} ${styles.pixelBorder}`}>
            {/* Socials */}
            <section className={styles.socialSection} aria-label="Social links">
              <h2 className={styles.sectionTitle}>Enter My Virtual Zone</h2><br></br>
              <ul className={styles.socialList}>
                <li>
                  <a
                    className={`${styles.socialLink} ${styles.pixelChip}`}
                    href="https://github.com/CutlassTM"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <span className={styles.chipIcon}>{"</>"}</span>
                    <span className={styles.chipText}>GitHub</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`${styles.socialLink} ${styles.pixelChip}`}
                    href="https://www.linkedin.com/in/sanraj-jp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <span className={styles.chipIcon}>in</span>
                    <span className={styles.chipText}>LinkedIn</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`${styles.socialLink} ${styles.pixelChip}`}
                    href="https://www.instagram.com/nuusanraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <span className={styles.chipIcon}>🅾</span>
                    <span className={styles.chipText}>Instagram</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`${styles.socialLink} ${styles.pixelChip}`}
                    href="https://www.tiktok.com/@nuusanraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <span className={styles.chipIcon}>{"【ꚠ】"}</span>
                    <span className={styles.chipText}>Tiktok</span>
                  </a>
                </li>

                {/* <li>
                  <a
                    className={`${styles.socialLink} ${styles.pixelChip}`}
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    <span className={styles.chipIcon}>X</span>
                    <span className={styles.chipText}>Twitter</span>
                  </a>
                </li> */}
                
                <br></br>
              </ul>

              <div className={styles.pixelHr} aria-hidden="true" />
            </section>

            {/* Status banner */}
            {(generalError || isSending) && (
              <div
                className={`${styles.statusBanner} ${generalError ? styles.isError : styles.isInfo}`}
                role="status"
                aria-live="polite"
              >
                {generalError ? generalError : "Sending your message…"}
              </div>
            )}

            {/* Form */}
            <form className={styles.contactForm} onSubmit={handleSubmit} noValidate><br></br>
              <h2 className={styles.formTitle}>Drop Me A Message</h2><br></br>

              {/* Honeypot (hidden) */}
              <label className={styles.hpLabel} htmlFor="company">
                Company
                <input
                  id="company"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  className={styles.hpInput}
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </label>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel} htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.pixelInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value && !validateEmail(e.target.value)) {
                        setEmailError("Please enter a valid email address.");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={`${styles.pixelInput} ${emailError ? styles.hasError : ""}`}
                    aria-invalid={emailError ? "true" : "false"}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                  {emailError && (
                    <div id="email-error" className={styles.error} role="alert">
                      {emailError}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}><br></br>
                <label className={styles.fieldLabel} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${styles.pixelInput} ${styles.textarea}`}
                  rows={6}
                />
                <div className={styles.helperRow}>
                  <small className={styles.helperText}>
                    I’ll get back to you within 1–2 days.
                  </small>
                </div><br></br>
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${styles.pixelButton}`}
                disabled={isSending}
                aria-busy={isSending ? "true" : "false"}
              >
                {isSending ? "SENDING..." : "SUBMIT"}
                <span className={styles.arrow} aria-hidden>&gt;</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successWrap}>
            <div className={`${styles.successMessage} ${styles.pixelBorder}`} role="status">
              Message sent—thanks! I’ll get back to you soon.
            </div>
            <button
              className={`${styles.pixelButton} ${styles.successCta}`}
              onClick={() => setSubmitted(false)}
            >
              Send another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
