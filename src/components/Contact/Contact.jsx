import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const contactInfo = [
    {
      icon: <FaPhone className="text-accent-blue" size={20} />,
      title: "Phone",
      value: "+923247947566",
      link: "tel:+923247947566",
    },
    {
      icon: <FaWhatsapp className="text-accent-blue" size={20} />,
      title: "WhatsApp",
      value: "+923247947566",
      link: "https://wa.me/923247947566",
    },
    {
      icon: <FaEnvelope className="text-accent-blue" size={20} />,
      title: "Email",
      value: "hamzaarif7102@gmail.com",
      link: "mailto:hamzaarif7102@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-accent-blue" size={20} />,
      title: "Location",
      value: "Lahore, Pakistan",
      link: "https://www.google.com/maps/place/Lahore,+Pakistan",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Prepare form data for Web3Forms
      const submitData = {
        access_key: "e666e0e1-075c-4e61-9ea4-41fc03782ba9",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      
      if (response.status === 200) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-surface dark:bg-dark-bg">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="section-title" data-aos="fade-up">
            Get In Touch
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-6 bg-accent-blue"
            data-aos="fade-up"
            data-aos-delay="100"
          />
          <p
            className="max-w-2xl mx-auto text-lg text-light-text dark:text-dark-text"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Have a project in mind or want to collaborate? Feel free to reach
            out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div
            className="p-8 bg-white/10 dark:bg-dark-surface/20 backdrop-blur-sm rounded-xl shadow-card hover:bg-blue-700"
            data-aos="fade-right"
          >
            <h3 className="mb-6 text-2xl font-semibold text-accent-blue">
              Send Message
            </h3>

            {submitSuccess && (
              <div className="flex items-center p-4 mb-6 border border-green-500 rounded-lg bg-green-500/20 text-light-text dark:text-dark-text">
                <span className="mr-2">✓</span> Your message has been sent
                successfully!
              </div>
            )}

            {submitError && (
              <div className="p-4 mb-6 border border-red-500 rounded-lg bg-red-500/20 text-light-text dark:text-dark-text">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-light-text dark:text-dark-text"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/50 text-light-text dark:text-dark-text"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-light-text dark:text-dark-text"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/50 text-light-text dark:text-dark-text"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/50 text-light-text dark:text-dark-text"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/50 text-light-text dark:text-dark-text"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary flex items-center justify-center hover:bg-blue-700 gap-2 w-full ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-left">
            <h3 className="mb-8 text-2xl font-semibold text-accent-blue">
              Contact Information
            </h3>

            <div className="mb-12 space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="flex items-start group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="p-3 mr-4 transition-all duration-300 rounded-lg bg-light-surface/80 dark:bg-dark-surface/80 group-hover:bg-light-border dark:group-hover:bg-dark-border">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                      {info.title}
                    </h4>
                    <a
                      href={info.link}
                      className="transition-colors text-light-subtle dark:text-dark-subtle hover:text-accent-blue"
                      target={info.title === "Location" ? "_blank" : undefined}
                      rel={
                        info.title === "Location"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div
              className="overflow-hidden shadow-lg rounded-xl h-80"
              data-aos="zoom-in"
            >
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217897.19486131293!2d74.18058331028969!3d31.483104197907182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1715684529981!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lahore, Pakistan Map"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
