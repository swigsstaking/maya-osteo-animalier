import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { motifs, osteopathie } from '../data/content'

const Motifs = () => (
  <>
    <SEOHead page="motifs" />
    <PageHeader
      overline="Motifs de consultation"
      title="Quand consulter un ostéopathe animalier ?"
      lede="Les animaux, comme les humains, peuvent bénéficier des soins ostéopathiques pour une multitude de raisons, toutes visant à améliorer leur bien-être et leur qualité de vie."
    />

    <Section>
      <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
        {motifs.map((m, i) => (
          <li key={m.titre}>
            <p className="text-sm font-medium text-clay">{String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-3 text-xl">{m.titre}</h2>
            <div className="rule my-5" />
            <p className="text-[15px] leading-relaxed text-muted">{m.texte}</p>
            {m.liste && (
              <ul className="mt-5 space-y-2">
                {m.liste.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Section>

    <Section tone="sand">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Bon à savoir</p>
        <p className="mt-5 text-lg leading-relaxed text-muted">{osteopathie.note}</p>
      </div>
    </Section>

    <CtaBand
      title="Un doute sur ce que vous observez ?"
      text="Décrivez-moi la situation : je vous dirai si une séance est indiquée, ou s’il vaut mieux passer d’abord par votre vétérinaire."
    />
  </>
)

export default Motifs
