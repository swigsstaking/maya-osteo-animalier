import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { motifs, osteopathie } from '../data/content'

const Motifs = () => (
  <>
    <SEOHead page="motifs" />
    <PageHeader
      overline="Motifs de consultation"
      title="Quand consulter un ostéopathe animalier ?"
      lede={motifs.intro}
    />

    <Section>
      <h2 className="h-section">{motifs.titre}</h2>
      <ul className="mt-10 grid auto-rows-fr gap-x-12 sm:grid-cols-2">
        {motifs.cas.map((cas) => (
          <li
            key={cas}
            className="flex gap-4 border-b border-powder/60 py-5 text-base leading-relaxed text-muted"
          >
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
            {cas}
          </li>
        ))}
      </ul>
    </Section>

    <Section tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Format horizontal demandé : la niche s'écrase sur une image large,
            on garde donc le rectangle arrondi. */}
        <img
          src="/images/chat-endormi-large.webp"
          alt="Chat tigré endormi contre une couverture"
          width="1300" height="731" loading="lazy"
          className="order-2 mx-auto aspect-[16/9] w-full max-w-[640px] rounded-panel object-cover lg:order-1 lg:max-w-none"
        />
        <div className="order-1 lg:order-2">
          <p className="eyebrow">Bon à savoir</p>
          <h2 className="h-section mt-4">Dans le doute, décrivez-moi ce que vous voyez</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Un changement d’attitude, une hésitation devant un escalier, une raideur au
            réveil : ce sont souvent ces petits signes qui amènent à consulter. Si vous
            hésitez, écrivez-moi — je vous dirai si une séance est indiquée.
          </p>
          <p className="mt-5 border-l-2 border-powder pl-5 text-sm leading-relaxed text-muted">
            {osteopathie.note}
          </p>
        </div>
      </div>
    </Section>

    <CtaBand
      title="Un doute sur ce que vous observez ?"
      text="Décrivez-moi la situation : je vous dirai si une séance est indiquée, ou s’il vaut mieux passer d’abord par votre vétérinaire."
    />
  </>
)

export default Motifs
