import emailjs from "@emailjs/browser";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const MAX_NAME_LENGTH = 50;
  const MAX_MESSAGE_LENGTH = 2000;
  const ids = ["name", "email", "message"];

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    for (let i = 0; i < ids.length; i++) {
      const elem = document.getElementById(ids[i]);
      elem.classList.remove("container-error");
    }

    if (name && name.length > MAX_NAME_LENGTH) {
      formErrors.names = `Names must be under ${MAX_NAME_LENGTH} characters`;
      document.getElementById("name").classList.toggle("container-error");
      valid = false;
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
      document.getElementById("email").classList.toggle("container-error");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
      document.getElementById("email").classList.toggle("container-error");
      valid = false;
    }

    if (!message.trim()) {
      formErrors.message = "Message is required";
      document.getElementById("message").classList.toggle("container-error");
      valid = false;
    } else if (message && message.length > MAX_MESSAGE_LENGTH) {
      formErrors.message = `Message should be under ${MAX_MESSAGE_LENGTH} characters`;
      document.getElementById("message").classList.toggle("container-error");
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_iu4kme9";
    const templateId = "template_b4y2vyy";
    const publicKey = "9eg31SGGnOYt6jxnF";

    const templateParams = {
      user_name: name,
      user_email: email,
      message: message,
    };

    if (validateForm()) {
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log("email sent successfully", response);
          setName("");
          setEmail("");
          setMessage("");
          setErrors({});
        })
        .catch((error) => {
          console.log("error sending email", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[575px] h-fit">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent border-b-2 border-b-neutral-400 mb-9 font-Source-Sans-Pro text-3xl text-[#D9D9D9] placeholder-neutral-400 focus:outline-none focus:border-b-[#D9D9D9]"
        id="name"
      />
      {errors.name && <p className="error">{errors.names}</p>}
      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-transparent border-b-2 border-b-neutral-400 mb-9 font-Source-Sans-Pro text-3xl text-[#D9D9D9] placeholder-neutral-400 focus:outline-none focus:border-b-[#D9D9D9]"
        id="email"
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <div
        className="bg-transparent flex flex-col border-b-2 border-b-neutral-400 mb-9 font-Source-Sans-Pro placeholder-neutral-400 focus-within:border-b-[#D9D9D9] text-neutral-400 focus-within:text-[#D9D9D9]"
        id="message"
      >
        <textarea
          placeholder="Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent font-Source-Sans-Pro text-3xl text-[#D9D9D9] placeholder-neutral-400 focus:outline-none"
          rows={7}
        ></textarea>
        <span className="text-right text-2xl">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>
      {errors.message && <p className="error">{errors.message}</p>}
      <p className="font-Source-Sans-Pro text-neutral-400 text-lg">
        Please include your contact information when you write me :)
      </p>
      <button
        type="submit"
        className="border border-[#459DDE] text-[#459DDE] flex flex-row justify-center items-center fill-[#459DDE] hover:bg-[#459DDE] hover:fill-[#252525] hover:text-[#252525] transition-all text-4xl font-Nunito mb-[33px] h-[75px] w-[300px] mx-auto"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
