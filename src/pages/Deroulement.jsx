import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { etapes } from '../data/content'

const Deroulement = () => (
  <>
    <SEOHead page="deroulement" />
    <PageHeader
      overline="Déroulement d’une séance"
      title="Les six étapes d’une consultation"
      lede="Une séance d’ostéopathie animale se décompose en plusieurs étapes. Compter environ une heure, selon l’animal et le motif."
    />

    <Section>
      <ol className="mx-auto max-w-3xl">
        {etapes.map((e, i) => (
          <li
            key={e.num}
            className={`grid gap-x-8 gap-y-3 py-10 sm:grid-cols-[auto_1fr] ${
              i !== 0 ? 'border-t border-powder/60' : 'pt-0'
            }`}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-sm text-brick"
              aria-hidden="true"
            >
              {e.num}
            </span>
            <div>
              <h2 className="text-xl">{e.titre}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{e.texte}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>

    <Section tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <img
          src="/images/patte-chien.webp"
          alt="Patte d’un chien détendu au soleil"
          width="1200" height="1200" loading="lazy"
          className="aspect-square w-full rounded-panel object-cover"
        />
        <div>
          <p className="eyebrow">Après la séance</p>
          <h2 className="h-section mt-4">48 heures de repos, sans immobiliser</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Le corps a besoin d’un peu de temps pour assimiler les changements : nouvelles
            possibilités de mouvement, disparition d’une douleur. Un repos non strict de 48 heures
            minimum est conseillé — pas d’enfermement, simplement pas d’effort intense.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            La rééducation, elle, est adaptée à chaque animal, à son mode de vie et à ses propres
            spécificités. Je vous laisse toujours des conseils concrets à appliquer à la maison.
          </p>
        </div>
      </div>
    </Section>

    <CtaBand />
  </>
)

export default Deroulement
