import { ExternalLink } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { apropos, valeurs } from '../data/content'

const APropos = () => (
  <>
    <SEOHead page="apropos" />
    <PageHeader
      overline="À propos de moi"
      title="Bonjour, moi c’est Maya"
      lede={apropos.intro}
    />

    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          {apropos.paragraphes.map((p) => (
            <p key={p} className="mb-5 text-base leading-relaxed text-muted">{p}</p>
          ))}

          <h2 className="h-section mt-16">Mon parcours</h2>
          <div className="rule my-6" />
          {apropos.parcours.map((p) => (
            <p key={p} className="mb-5 text-base leading-relaxed text-muted">{p}</p>
          ))}

          <a
            href={apropos.etudeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary mt-4"
          >
            Présentation de mon étude
            <ExternalLink size={15} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        <div className="space-y-4 self-start">
          <img
            src="/images/maya-portrait-lac.webp"
            alt="Maya Arnould en polo de travail au bord du lac"
            width="1050" height="1400" loading="lazy"
            className="aspect-[4/5] w-full rounded-arch object-cover"
          />
          <img
            src="/images/consultation-bovin.webp"
            alt="Maya en consultation sur une vache dans une étable"
            width="900" height="1150" loading="lazy"
            className="aspect-[4/5] w-full rounded-arch object-cover"
          />
        </div>
      </div>
    </Section>

    <Section tone="sand">
      <h2 className="h-section">Ce à quoi je tiens</h2>
      <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {valeurs.map((v) => (
          <li key={v.titre}>
            <h3 className="text-lg">{v.titre}</h3>
            <div className="rule my-4" />
            <p className="text-[15px] leading-relaxed text-muted">{v.texte}</p>
          </li>
        ))}
      </ul>
    </Section>

    <CtaBand />
  </>
)

export default APropos
