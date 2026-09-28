import SEOHead from '../components/SEOHead'
import { Section, SectionHead, PageHeader, CtaBand } from '../components/ui'
import Secteur from '../components/Secteur'
import { tarifs, tarifPreferentiel, associations } from '../data/content'

const Tarifs = () => (
  <>
    <SEOHead page="tarifs" />
    <PageHeader
      overline="Tarifs"
      title="Tarifs et zones de déplacement"
      lede="Les consultations se déroulent à domicile pour les chiens, les chats et les petits animaux, et dans les installations hébergeant les chevaux ainsi que les bovins."
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
          {tarifPreferentiel} Indiquez-le-moi lors de la prise de rendez-vous, je vous
          confirmerai le montant.
        </p>
      </div>

      <div className="mx-auto mt-4 max-w-3xl rounded-card border border-powder/60 bg-sand p-7">
        <h2 className="text-lg">Associations et centres équestres</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{associations}</p>
      </div>
    </Section>

    <Section tone="sand">
      <SectionHead
        overline="Zone de déplacement"
        title="Où je me déplace"
        lede="Mon secteur s’étend d’Yverdon-les-Bains à Bienne et jusqu’à Fribourg — le canton de Neuchâtel et ses environs."
        align="center"
        className="max-w-2xl"
      />
      <Secteur className="mt-14" />
    </Section>

    <CtaBand secondary={{ to: '/contact.html', label: 'Me contacter' }} />
  </>
)

export default Tarifs
