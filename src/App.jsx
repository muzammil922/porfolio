import { useEffect, useState } from "react";

// replace with your WhatsApp number (Pakistan: drop leading 0, add 92)
const WHATSAPP_NUMBER = "923113840943";
const WHATSAPP_TEXT = "Hey Muzammil, we can work together";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(WHATSAPP_URL)}`;
const GUIDE_KEY = "qr-guide-dismissed";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

const TECH = [
  { name: "React", icon: `${DI}/react/react-original.svg` },
  { name: "Vue", icon: `${DI}/vuejs/vuejs-original.svg` },
  { name: "Next.js", icon: `${DI}/nextjs/nextjs-original.svg` },
  { name: "Nuxt", icon: `${DI}/nuxtjs/nuxtjs-original.svg` },
  { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg` },
  { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg` },
  { name: "HTML", icon: `${DI}/html5/html5-original.svg` },
  { name: "CSS", icon: `${DI}/css3/css3-original.svg` },
  { name: "Tailwind CSS", icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
  { name: "GSAP", icon: `${SI}/greensock/88CE02` },
  { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg` },
  { name: "Express", icon: `${DI}/express/express-original.svg` },
  { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg` },
  { name: "Neon", icon: `${SI}/neon/00E599` },
  { name: "Supabase", icon: `${DI}/supabase/supabase-original.svg` },
  { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
  { name: "Prisma", icon: `${DI}/prisma/prisma-original.svg` },
  { name: "Firebase", icon: `${DI}/firebase/firebase-plain.svg` },
  { name: "Dart", icon: `${DI}/dart/dart-original.svg` },
  { name: "Flutter", icon: `${DI}/flutter/flutter-original.svg` },
  { name: "React Native", icon: `${DI}/react/react-original.svg` },
  { name: "Mobile App", icon: `${DI}/android/android-original.svg` },
  { name: "SaaS Product", icon: `${DI}/googlecloud/googlecloud-original.svg` },
  { name: "REST API", icon: `${DI}/fastapi/fastapi-original.svg` },
  { name: "GraphQL", icon: `${DI}/graphql/graphql-plain.svg` },
  { name: "Docker", icon: `${DI}/docker/docker-original.svg` },
  { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "Vercel", icon: `${DI}/vercel/vercel-original.svg` },
  { name: "Git", icon: `${DI}/git/git-original.svg` },
  { name: "Figma", icon: `${DI}/figma/figma-original.svg` },
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 12.5 12.5 3.5M6.2 3.5H12.5V9.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.22 8.22 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m4.52 10.4c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.49 1.08 2.49.72 2.94.67.45-.05 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28"
      />
    </svg>
  );
}

function readGuideOpen() {
  try {
    return sessionStorage.getItem(GUIDE_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [sent, setSent] = useState(false);
  const [guide, setGuide] = useState(readGuideOpen);

  function openContact() {
    setSent(false);
    setOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDialogShown(true));
    });
  }

  function closeContact() {
    setDialogShown(false);
    window.setTimeout(() => setOpen(false), 300);
  }

  function dismissGuide() {
    setGuide(false);
    try {
      sessionStorage.setItem(GUIDE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (!guide) return undefined;
    function onKey(event) {
      if (event.key === "Escape") dismissGuide();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guide]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") closeContact();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="page">
      <main id="top">
        <div className="frame">
          <section className="hero" aria-label="Muzammil — Full Stack Developer introduction">
            <div className="hero-copy">
              <h1>
                Build Better
                <span>Ship Faster</span>
              </h1>
              <p>
                Full-stack engineer crafting sharp interfaces, solid APIs, and reliable products for ambitious founders and teams.
              </p>
              <dl className="metrics" aria-label="Experience highlights">
                <div>
                  <dt>15+</dt>
                  <dd>Projects completed</dd>
                </div>
                <div>
                  <dt>5yr</dt>
                  <dd>Experience</dd>
                </div>
                <div>
                  <dt>20+</dt>
                  <dd>Happy clients</dd>
                </div>
              </dl>
            </div>

            <div className="hero-media">
              <img
                className="portrait"
                src="/portrait.jpeg"
                alt="Muzammil, full stack developer — professional portrait for international remote software projects"
                width="800"
                height="1000"
              />

              <article className="project-card" aria-label="Start a project with Muzammil">
                <p className="eyebrow">Face value first</p>
                <h2>No project gallery needed</h2>
                <p>
                  We don’t need to show projects. We run on face value — trust, clarity, and results.
                </p>
                <button type="button" className="card-cta" onClick={openContact}>
                  Start project
                  <Arrow />
                </button>
              </article>
            </div>
          </section>

          <section className="marks" id="marks" aria-label="Technologies and tools">
            <div className="marks-track">
              {[...TECH, ...TECH].map((tech, index) => (
                <span key={`${tech.name}-${index}`} className="tech-chip">
                  <span className="tech-icon" aria-hidden="true">
                    <img src={tech.icon} alt="" loading="lazy" />
                  </span>
                  <span className="tech-name">{tech.name}</span>
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="seo-panel" id="services" aria-label="About and services">
          <div className="seo-about">
            <h2>About Muzammil</h2>
            <p>
              Muzammil is a remote full stack developer helping international founders and teams
              ship web apps, mobile products, and SaaS platforms with clean interfaces, solid APIs,
              and reliable delivery.
            </p>
          </div>
          <div className="seo-services">
            <article>
              <h3>Web development</h3>
              <p>React, Vue, Next.js, and Node.js applications built for performance and clarity.</p>
            </article>
            <article>
              <h3>Mobile apps</h3>
              <p>Cross-platform products with Flutter and React Native for iOS and Android.</p>
            </article>
            <article>
              <h3>SaaS &amp; APIs</h3>
              <p>End-to-end SaaS, REST/GraphQL APIs, databases, and cloud-ready deployment.</p>
            </article>
          </div>
        </section>
      </main>

      {guide && <div className="qr-guide-back" role="presentation" onClick={dismissGuide} />}

      <aside
        className={`qr-chip${guide ? " qr-guide-card is-spotlight" : ""}`}
        id="qr-chip"
        aria-label={guide ? "WhatsApp QR guide" : "WhatsApp QR code"}
        role={guide ? "dialog" : undefined}
      >
        <img src={QR_SRC} alt="QR code to chat on WhatsApp" width="96" height="96" />
        {guide ? (
          <>
            <p className="qr-guide-hint">Hold your phone to scan</p>
            <p className="qr-chip-label">Scan to WhatsApp</p>
            <button type="button" className="btn qr-guide-btn" onClick={dismissGuide}>
              Got it
            </button>
          </>
        ) : (
          <p className="qr-chip-label">Scan to WhatsApp</p>
        )}
      </aside>

      {open && (
        <div
          className={`dialog-back${dialogShown ? " is-open" : ""}`}
          role="presentation"
          onClick={closeContact}
        >
          <form
            className={`dialog${dialogShown ? " is-open" : ""}`}
            onClick={(event) => event.stopPropagation()}
            onSubmit={onSubmit}
          >
            <div className="dialog-head">
              <p className="eyebrow">Select project</p>
              <button type="button" className="close" onClick={closeContact} aria-label="Close">
                ×
              </button>
            </div>
            {sent ? (
              <p className="thanks">Thanks. I’ll get back with a clear direction.</p>
            ) : (
              <>
                <h2>Available for projects</h2>
                <label>
                  Name
                  <input name="name" required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required placeholder="you@studio.com" />
                </label>
                <label>
                  Project
                  <textarea name="details" required rows="4" placeholder="Share a few details" />
                </label>
                <div className="dialog-actions">
                  <button type="submit" className="btn dialog-submit">
                    Send
                  </button>
                  <a
                    className="btn dialog-whatsapp"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
