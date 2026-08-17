import { assets } from "@/content/home";

export function PageHero({
  title,
  image,
}: {
  title?: string;
  image?: string;
}) {
  return (
    <section className="hero is-large page-hero">
      <img className="obj-fit-cover" src={image ?? assets.hero} alt="" />
      <div className="hero-body">
        {title ? (
          <div className="container has-text-centered">
            <h1 className="title">{title}</h1>
          </div>
        ) : null}
      </div>
    </section>
  );
}
