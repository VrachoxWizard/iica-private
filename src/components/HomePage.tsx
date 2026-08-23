"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { assets, getHome } from "@/content/home";
import { getNextCourse } from "@/content/education";
import { EducationCarousel } from "@/components/EducationCarousel";
import { Testimonials } from "@/components/Testimonials";
import { Modal } from "@/components/Modal";
import type { Locale } from "@/i18n/routing";

const DISMISS_KEY = "iica-welcome-dismissed";

export function HomePage({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const next = getNextCourse(locale);
  const a11y = useTranslations("a11y");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const closeWelcome = useCallback(() => {
    setModalOpen(false);
    window.localStorage.setItem(DISMISS_KEY, "true");
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("infoMailSent") === "true") return;
    if (window.localStorage.getItem(DISMISS_KEY) === "true") return;
    if (window.location.search.includes("nomodal")) return;
    const timer = window.setTimeout(() => setModalOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={closeWelcome}
        labelledBy="welcome-title"
        className="welcome-modal"
      >
        <div className="welcome-media">
          <img src={assets.modal} alt="" />
        </div>
        <div className="welcome-copy">
          <button type="button" className="close" onClick={closeWelcome} aria-label={a11y("close")}>
            ×
          </button>
          <p className="edu-kicker">{home.modalKicker}</p>
          <h2 id="welcome-title">{home.modalTitle}</h2>
          <p>{home.modalLead}</p>
          <div className="welcome-tracks">
            {home.modalCourses.map((course, index) => (
              <button
                type="button"
                key={course}
                className={index === selectedCourse ? "is-active" : ""}
                onClick={() => setSelectedCourse(index)}
              >
                {course}
              </button>
            ))}
          </div>
          <Link href="/prijava" className="cta-btn" onClick={closeWelcome}>
            {home.modalCta}
          </Link>
        </div>
      </Modal>

      <section className="hero-cta">
        <img className="obj-fit-cover" src={assets.hero} alt="" />
        <div className="hero-shade" />
        <div className="hero-cta-inner">
          <div className="hero-headline">
            <p className="edu-kicker hero-kicker">{home.modalKicker}</p>
            <h1>{home.hero}</h1>
          </div>
          <EducationCarousel locale={locale} />
        </div>
      </section>

      <section className="section reveal" id="tko">
        <div className="about-split">
          <div className="about-photo" style={{ backgroundImage: `url(${assets.about})` }} />
          <div className="about-copy">
            <h2>{home.aboutTitle}</h2>
            {home.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section path-section reveal" id="wwd">
        <div className="path-grid">
          {home.tiles.map((tile) => (
            <Link href={tile.href} className="path-tile" key={tile.title}>
              <img src={tile.image} alt="" />
              <span
                className="path-tile-label"
                style={{ "--tile-accent": tile.color } as CSSProperties}
              >
                {tile.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section path-section section-soft reveal" id="qualifications">
        <div className="path-heading">
          <h2>{home.whatTitle}</h2>
          <a className="ghost-btn" href={assets.ethics}>
            {home.ethics}
          </a>
        </div>
        <p className="path-lead">{home.whatLead}</p>
        <ol className="learning-path">
          {home.path.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <strong>{step.title}</strong>
              <em>{step.role}</em>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section media-band reveal">
        <div className="media-copy">
          <h2>{home.forYou}</h2>
          <p>{home.partner}</p>
        </div>
        <button
          type="button"
          className="media-frame"
          onClick={() => setVideoOpen(true)}
          aria-label={a11y("play")}
        >
          <img src={assets.heroEsg} alt="" />
          <span className="play-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v13.72L19.5 12 8 5.14z" />
            </svg>
          </span>
        </button>
      </section>

      <Modal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        labelledBy="video-title"
        className="video-pop"
      >
        <button
          type="button"
          className="close"
          onClick={() => setVideoOpen(false)}
          aria-label={a11y("close")}
        >
          ×
        </button>
        <h2 id="video-title" className="visually-hidden">
          {home.watch}
        </h2>
        <iframe
          title="ESG Course Example"
          src="https://player.vimeo.com/video/484104679?h=c85870ce38&dnt=1&autoplay=1"
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </Modal>

      <section className="section edu-teaser reveal">
        <div>
          <h2>{home.registerTitle}</h2>
          <p>
            {next
              ? `${next.level} · ${next.start} · ${next.price.replace(/^Cijena:\s|^Price:\s/, "")} · ${next.hours}`
              : home.whatLead}
          </p>
        </div>
        <Link href="/prijava" className="cta-btn">
          {home.modalCta}
        </Link>
      </section>

      <Testimonials locale={locale} title={home.testimonialsTitle} />

      <section className="section territory-media reveal" id="ter">
        <div>
          <h2>{home.territoryTitle}</h2>
          <p>{home.territoryBody}</p>
          <div className="flag-grid">
            {assets.flags.map((flag) => (
              <img key={flag.src} src={flag.src} alt={flag.alt} />
            ))}
          </div>
        </div>
        <video controls poster={assets.about}>
          <source src={assets.video} type="video/mp4" />
        </video>
      </section>
    </>
  );
}
