import { Link } from 'react-router-dom'
import { Star, Rabbit, Phone } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { Section, SectionHead, ArrowLink, CtaBand } from '../components/ui'
import Secteur from '../components/Secteur'
import { site } from '../data/site'
import { animaux, etapes, motifs, avis, apropos, osteopathie, valeurs } from '../data/content'
import { localBusinessJsonLd } from '../data/jsonld'

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-sand">
    <div className="container-site grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
      <div>
        <p className="eyebrow">Ostéopathie animale · Suisse romande</p>
        <h1 className="h-display mt-5">
          Maya Arnould,
          <br />
          ostéopathe animalier
        </h1>
        <p className="lede mt-6">
          Une approche douce et globale pour chevaux, chiens, chats, bovins, lapins et hamsters.
          Je me déplace chez vous, dans le canton de Neuchâtel et ses environs.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/rendez-vous.html" className="btn-primary">Prendre rendez-vous</Link>
          <Link to="/tarifs.html" className="btn-outline">Les tarifs</Link>
          <a href={site.phoneHref} className="btn-secondary">
            <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-clay text-clay" strokeWidth={0} />
            ))}
          </span>
          <span>
            {site.google.rating} sur {site.google.reviewCount} avis Google
          </span>
        </p>
      </div>

      <div className="relative">
        <img
          src="/images/maya-portrait.webp"
          alt="Maya Arnould tenant un chat roux dans les bras"
          width="1050"
          height="1400"
          className="aspect-[4/5] w-full rounded-niche object-cover shadow-soft"
          fetchPriority="high"
        />
      </div>
    </div>
  </section>
)

const Osteopathie = () => (
  <Section tone="sand">
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
      <div className="grid grid-cols-2 gap-4 self-start">
        <img
          src="/images/consultation-chien.webp"
          alt="Maya en consultation sur un chien blanc, sous une tente"
          width="760" height="950" loading="lazy"
          className="aspect-[4/5] w-full rounded-niche object-cover"
        />
        <img
          src="/images/patte-chien.webp"
          alt="Patte d’un chien détendu au soleil"
          width="760" height="950" loading="lazy"
          className="mt-10 aspect-[4/5] w-full rounded-niche object-cover"
        />
      </div>
      <div className="self-center">
        <SectionHead overline="L’ostéopathie animale" title={osteopathie.titre} />
        <p className="mt-6 text-base leading-relaxed text-muted">{osteopathie.texte}</p>
        <p className="mt-5 border-l-2 border-powder pl-5 text-sm leading-relaxed text-muted">
          {osteopathie.note}
        </p>
        <ArrowLink to="/motifs.html" className="mt-8">Quand consulter ?</ArrowLink>
      </div>
    </div>
  </Section>
)

const QuiSuisJe = () => (
  <Section>
    <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
      <div className="self-center">
        <SectionHead overline="Qui suis-je" title="Bonjour, moi c’est Maya" />
        <p className="mt-6 text-base leading-relaxed text-muted">{apropos.intro}</p>
        {apropos.paragraphes.map((p) => (
          <p key={p} className="mt-4 text-base leading-relaxed text-muted">{p}</p>
        ))}
        <ArrowLink to="/a-propos.html" className="mt-8">Mon parcours</ArrowLink>
      </div>
      <img
        src="/images/maya-chien-malamute.webp"
        alt="Maya assise dans l’herbe à côté d’un grand chien"
        width="1400" height="1300" loading="lazy"
        className="aspect-square w-full rounded-niche object-cover"
      />
    </div>
  </Section>
)

const PourQuelAnimal = () => (
  <Section>
    <SectionHead
      overline="Pour quel animal"
      title="Je soigne toutes les espèces"
      lede="Du chat de salon au bovin d’élevage, chaque animal a sa manière de compenser une gêne. Les techniques s’adaptent à son espèce, à son gabarit et à son caractère."
      align="center"
      className="max-w-2xl"
    />
    <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
      {animaux.map((a) => (
        <li key={a.id} className="text-center">
          {a.image ? (
            <img
              src={a.image}
              alt={a.alt}
              width="760" height="950" loading="lazy"
              className="aspect-[4/5] w-full rounded-niche object-cover"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-niche bg-blush px-4">
              <Rabbit size={44} strokeWidth={1} className="text-clay" aria-hidden="true" />
              <span className="text-xs leading-snug text-muted">{a.note}</span>
            </div>
          )}
          <p className="mt-4 text-[13px] uppercase tracking-overline text-muted">{a.label}</p>
        </li>
      ))}
    </ul>
  </Section>
)

const Deroulement = () => (
  <Section>
    <SectionHead
      overline="Déroulement"
      title="Comment se passe une consultation ?"
      lede="Six étapes, de la première question posée aux conseils de rééducation."
    />
    <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {etapes.map((e) => (
        <li key={e.num}>
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-medium text-clay">{e.num}</span>
            <h3 className="text-lg">{e.titre}</h3>
          </div>
          <div className="rule my-4" />
          <p className="text-[15px] leading-relaxed text-muted">{e.texte}</p>
        </li>
      ))}
    </ol>
    <ArrowLink to="/deroulement.html" className="mt-12">Le détail de chaque étape</ArrowLink>
  </Section>
)

const Motifs = () => (
  <Section tone="sand">
    <SectionHead
      overline="Motifs de consultation"
      title="Quand faire appel à un ostéopathe ?"
      lede={motifs.intro}
    />
    <ul className="mt-12 grid auto-rows-fr gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {motifs.cas.map((cas) => (
        <li key={cas} className="flex gap-3 border-b border-powder/50 py-3 text-[15px] leading-relaxed text-muted">
          <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
          {cas}
        </li>
      ))}
    </ul>
    <ArrowLink to="/motifs.html" className="mt-12">Tous les motifs en détail</ArrowLink>
  </Section>
)

const Valeurs = () => (
  <Section tone="sand">
    <SectionHead overline="Ma manière de travailler" title="Ce à quoi je tiens" />
    <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {valeurs.map((v) => (
        <li key={v.titre}>
          <h3 className="text-lg">{v.titre}</h3>
          <div className="rule my-4" />
          <p className="text-[15px] leading-relaxed text-muted">{v.texte}</p>
        </li>
      ))}
    </ul>
  </Section>
)

const Avis = () => (
  <Section>
    <SectionHead
      overline="Avis"
      title="Ce que disent les propriétaires"
      align="center"
      className="max-w-2xl"
    />
    <ul className="mt-14 grid gap-6 lg:grid-cols-3">
      {avis.map((a) => (
        <li key={a.auteur} className="card flex flex-col">
          <div className="flex gap-0.5" aria-label="5 étoiles sur 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-clay text-clay" strokeWidth={0} aria-hidden="true" />
            ))}
          </div>
          <p className="mt-5 flex-1 text-[15px] leading-relaxed text-muted">« {a.texte} »</p>
          <p className="mt-6 text-sm text-ink">{a.auteur}</p>
          <p className="text-xs text-clay">{a.animal}</p>
        </li>
      ))}
    </ul>
    <p className="mt-10 text-center text-sm text-muted">
      {site.google.rating} sur {site.google.reviewCount} avis ·{' '}
      <a href={site.google.url} target="_blank" rel="noreferrer noopener" className="text-brick underline underline-offset-4">
        voir la fiche Google
      </a>
    </p>
  </Section>
)

const Zone = () => (
  <Section tone="sand">
    <SectionHead
      overline="Zone de déplacement"
      title="Je viens à vous"
      lede="D’Yverdon-les-Bains à Bienne et jusqu’à Fribourg. Les consultations se déroulent à domicile pour les chiens, les chats et les petits animaux, et dans les installations hébergeant les chevaux et les bovins."
      align="center"
      className="max-w-2xl"
    />
    <Secteur className="mt-14" />
  </Section>
)

const Home = () => (
  <>
    <SEOHead page="home" jsonLd={localBusinessJsonLd} />
    <Hero />
    <PourQuelAnimal />
    <Osteopathie />
    <QuiSuisJe />
    <Motifs />
    <Deroulement />
    <Valeurs />
    <Avis />
    <Zone />
    <CtaBand />
  </>
)

export default Home
