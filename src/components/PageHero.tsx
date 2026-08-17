import { assets } from "@/content/home";

export function PageHero({
  title,
  image,
  kicker,
}: {
  title?: string;
  image?: string;
  kicker?: string;
}) {
  return (
    <section className="hero-cta page-hero-cta">
      <img className="obj-fit-cover" src={image ?? assets.hero} alt="" />
      <div className="hero-shade" />
      {title ? (
        <div className="hero-cta-inner page-hero-inner">
          {kicker ? <p className="edu-kicker hero-kicker">{kicker}</p> : null}
          <h1>{title}</h1>
        </div>
      ) : null}
    </section>
  );
}
