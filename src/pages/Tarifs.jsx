import { MapPin } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { tarifs } from '../data/content'
import { zones } from '../data/site'

const Tarifs = () => (
  <>
    <SEOHead page="tarifs" />
    <PageHeader
      overline="Tarifs"
      title="Tarifs et zones de déplacement"
      lede="Les consultations se déroulent à domicile pour les chiens, les chats et les NAC, et dans les installations hébergeant les chevaux ainsi que les bovins."
    />

    <Section>
      <ul className="mx-auto max-w-3xl">
        {tarifs.map((t, i) => (
          <li
            key={t.animal}
            className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6 ${
              i !== 0 ? 'border-t border-powder/60' : 'pt-0'
            }`}
          >
            <div>
              <h2 className="text-xl">{t.animal}</h2>
              <p className="mt-1 text-sm text-muted">{t.lieu}</p>
            </div>
            <p className="text-xl text-brick">
              {t.prix} <span className="text-sm text-muted">CHF</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-14 max-w-3xl rounded-card border border-powder/60 bg-sand p-7">
        <h2 className="text-lg">Tarif préférentiel</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Un tarif préférentiel s’applique à partir de trois animaux de la même famille.
          Indiquez-le-moi lors de la prise de rendez-vous, je vous confirmerai le montant.
        </p>
      </div>
    </Section>

    <Section tone="sand">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Zone de déplacement</p>
          <h2 className="h-section mt-4">Je viens à vous</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            J’interviens dans le canton de Neuchâtel et ses environs, ainsi que dans les cantons
            limitrophes. Si vous n’êtes pas sûr d’être dans ma zone, écrivez-moi votre localité :
            je vous réponds rapidement, et je vous indique les éventuels frais de déplacement
            avant de fixer le rendez-vous.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 self-center">
          {zones.cantons.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2.5 rounded-card border border-powder/60 bg-cream px-5 py-4 text-[15px]"
            >
              <MapPin size={15} strokeWidth={1.5} className="shrink-0 text-clay" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <CtaBand secondary={{ to: '/contact.html', label: 'Me contacter' }} />
  </>
)

export default Tarifs
