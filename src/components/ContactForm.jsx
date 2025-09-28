import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import './../styles/ContactForm.css';
import { form } from "framer-motion/client";

export default function ContactFormEmailJS() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  
  const publickey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const serviceid = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateid = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const formEl = formRef.current;
    const honey = formEl.querySelector('[name="website"]').value;
    if (honey) { setStatus("success"); return; } // honeypot

    try {
      await emailjs.sendForm(
        serviceid,
        templateid,
        formEl,
        publickey
      );

      formEl.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="contactFormContainer">
    <form ref={formRef} onSubmit={handleSubmit} className="contactForm" noValidate>
      <h2>Contact Us</h2>

      {/* Honeypot */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

      <label>
        Full Name
        <input name="name" type="text" required />
      </label>

      <label>
        Email Address
        <input name="email" type="email" required />
      </label>

      <label>
        Subject
        <input name="title" type="text" required />
      </label>

      <label>
        Message
        <textarea name="message" rows={6} required />
      </label>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send"}
      </button>

      {status === "success" && <p role="status">Thanks! Message sent.</p>}
      {status === "error" && <p role="alert">Couldn’t send. Please try again.</p>}
    </form>
    </div>
  );
}
