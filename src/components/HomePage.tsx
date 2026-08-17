"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { assets, getHome } from "@/content/home";
import { courseDescription, getNextCourse } from "@/content/education";
import { Testimonials } from "@/components/Testimonials";
import type { Locale } from "@/i18n/routing";

export function HomePage({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const next = getNextCourse(locale);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("infoMailSent") === "true") return;
    if (window.location.search.includes("nomodal")) return;
    setModalOpen(true);
  }, []);

  const price = next?.price.replace(/^Cijena:\s|^Price:\s/, "") ?? "";

  return (
    <>
      {modalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="welcome-modal">
            <div className="welcome-media">
              <img src={assets.modal} alt="" />
            </div>
            <div className="welcome-copy">
              <button type="button" className="close" onClick={() => setModalOpen(false)}>
                ×
              </button>
              <p className="edu-kicker">{home.modalKicker}</p>
              <h2>{home.modalTitle}</h2>
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
              <Link
                href="/prijava"
                className="cta-btn"
                onClick={() => setModalOpen(false)}
              >
                {home.modalCta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <section className="hero-cta">
        <img className="obj-fit-cover" src={assets.hero} alt="" />
        <div className="hero-shade" />
        <div className="hero-cta-inner">
          <h1>{home.hero}</h1>
          {next ? (
            <div className="hero-course">
              <p className="edu-kicker">{home.nextLabel}</p>
              <strong>{next.level}</strong>
              <span>
                {next.start} · {price}
              </span>
              <Link href="/prijava" className="cta-btn">
                {home.modalCta}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" id="tko">
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

      <section className="section path-section" id="wwd">
        <div className="path-grid">
          {home.tiles.map((tile) => (
            <Link href={tile.href} className="path-tile" key={tile.title}>
              <img src={tile.image} alt="" />
              <span style={{ background: tile.color }}>{tile.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section path-section section-soft" id="qualifications">
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

      <section className="section media-band">
        <div className="media-copy">
          <h2>{home.forYou}</h2>
          <p>{home.partner}</p>
          <button type="button" className="ghost-btn" onClick={() => setVideoOpen(true)}>
            {home.watch}
          </button>
        </div>
        <button type="button" className="media-frame" onClick={() => setVideoOpen(true)}>
          <img src={assets.heroEsg} alt="" />
        </button>
      </section>

      {videoOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="video-pop">
            <button type="button" className="close" onClick={() => setVideoOpen(false)}>
              ×
            </button>
            <iframe
              title="ESG Course Example"
              src="https://player.vimeo.com/video/484104679?h=c85870ce38&dnt=1&autoplay=1"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      ) : null}

      <section className="section edu-teaser">
        <div>
          <h2>{home.registerTitle}</h2>
          <p>
            {next
              ? `${next.level} · ${next.start} · ${price} · ${next.hours}`
              : home.whatLead}
          </p>
          {next ? <p>{courseDescription(locale, next)}</p> : null}
        </div>
        <Link href="/prijava" className="cta-btn">
          {home.modalCta}
        </Link>
      </section>

      <Testimonials locale={locale} title={home.testimonialsTitle} />

      <section className="section territory-media" id="ter">
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
