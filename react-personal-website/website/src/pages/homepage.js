import React, { useState } from "react";
import styles from "./single.module.css";
import emailjs from "emailjs-com";

const Icons = {
  MapPin: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  User: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Message: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Send: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Loader: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
};

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/CutlassTM",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sanraj-jp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nuusanraj",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@nuusanraj",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    ),
  },
];

export default function Homepage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [botField, setBotField] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setEmailError("");

    if (botField) return;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    try {
      setIsSending(true);
      const response = await emailjs.send(
        "service_mvcfiyi",
        "template_sf6zwsg",
        templateParams,
        "LEoYzPGNQYaYi-3Ma"
      );

      if (response.status === 200) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Email service returned non-200 status");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setGeneralError("Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={`${styles.root} ${styles.homeRoot}`}>
      <div className={styles.ambientBackground}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
      </div>
      <div className={styles.pageOverlay} />
      <div className={styles.gridBackground} />
      <div className={styles.scanline} />
      <div className={`${styles.scanline} ${styles.scanlineDelay}`} />

      <div className={styles.homeContentWrapper}>
        <div className={styles.homeContentGrid}>
          
          <section className={`${styles.profileSection} ${styles.revealOnLoad}`}>
            <div className={styles.sysIdCard}>
              <div className={styles.idCardTop}>
                <div className={styles.idAvatarWrapper}>
                  <img src="/avatar.jpeg" alt="Sanraj" className={styles.idAvatar} />
                  <div className={styles.idScannerLine}></div>
                </div>
                <div className={styles.idDetails}>
                  <h1 className={styles.idName}>Sanraj</h1>
                  <div className={styles.idRole}>Full-Stack Developer</div>
                  <div className={styles.idMeta}><Icons.MapPin />Singapore</div>
                </div>
              </div>
              <hr className={styles.cardDivider} />
              <p className={styles.leadText}>
                Freelancer | Currently in NS. Passionate about crafting seamless, aesthetic, and user-centric digital experiences.
              </p>
            </div>

            <nav className={styles.socials} aria-label="Social links">
              {SOCIALS.map((s, index) => (
                <a
                  key={s.id}
                  className={styles.socialCard}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                >
                  <div className={styles.socialIconWrapper}>
                    <span className={styles.socialIcon} aria-hidden>{s.icon}</span>
                  </div>
                  <span className={styles.socialLabel}>{s.label}</span>
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </nav>
          </section>

          <section className={`${styles.contactSection} ${styles.revealOnLoad}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.metaBox}>
              <h3 className={styles.metaTitle}>Get in Touch</h3>
              <p className={styles.contactDesc}>Interested in collaborating? Contact me below!</p>

              {!submitted ? (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <input className={styles.hp} type="text" name="company" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />

                  {(generalError || isSending) && (
                    <div role="status" aria-live="polite" className={`${styles.statusContainer} ${generalError ? styles.statusError : ''}`}>
                      <div className={styles.statusText}>
                        {generalError ? generalError : "Sending mesage..."}
                      </div>
                      {!generalError && isSending && (
                        <div className={styles.loadingBarContainer}>
                          <div className={styles.loadingBar}></div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.fieldGroup}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Name</span>
                      <div className={styles.inputWrapper}>
                        <Icons.User />
                        <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                      </div>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Email</span>
                      <div className={styles.inputWrapper}>
                        <Icons.Mail />
                        <input
                          className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={(e) => {
                            if (e.target.value && !validateEmail(e.target.value)) setEmailError("Invalid email protocol.");
                            else setEmailError("");
                          }}
                          placeholder="user@email.com"
                          required
                        />
                      </div>
                      {emailError && <span className={styles.errorText}>{emailError}</span>}
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Message</span>
                    <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
                      <Icons.Message />
                      <textarea className={styles.textarea} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Drop me a message..." required />
                    </div>
                  </label>

                  <button type="submit" className={styles.primaryActionBtn} disabled={isSending} aria-busy={isSending}>
                    {isSending ? <Icons.Loader /> : <Icons.Send />}
                    <span className={styles.btnText}>{isSending ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              ) : (
                <div className={styles.successState} role="status">
                  <div className={styles.successIconWrapper}>
                    <div className={styles.successRings}></div>
                    <div className={styles.successIcon}>
                      <Icons.Check />
                    </div>
                  </div>
                  <h4 className={styles.successTitle}>Successful</h4>
                  <p className={styles.successDesc}>Got your message! I'll get back to you in a bit.</p>
                  <button className={styles.resetButton} onClick={() => setSubmitted(false)}>
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}