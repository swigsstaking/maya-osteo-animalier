import SEOHead from '../components/SEOHead'
import { Section, PageHeader } from '../components/ui'
import BookingEmbed from '../components/BookingEmbed'
import { site } from '../data/site'

const RendezVous = () => (
  <>
    <SEOHead page="rendezvous" />
    <PageHeader
      overline="Prendre rendez-vous"
      title="Réserver une consultation"
      lede={
        site.booking.slug
          ? 'Choisissez le créneau qui vous convient. Vous recevrez une confirmation par e-mail.'
          : 'Écrivez-moi ou appelez-moi : je vous propose un créneau et je me déplace chez vous.'
      }
    />

    <Section>
      <div className="mx-auto max-w-3xl">
        <BookingEmbed />
      </div>
    </Section>

    <Section tone="sand">
      <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
        <div>
          <h2 className="eyebrow">Horaires</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{site.hours}</p>
        </div>
        <div>
          <h2 className="eyebrow">Lieu de la séance</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            À votre domicile pour les chiens, les chats et les petits animaux. Sur place pour les chevaux et les bovins.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Après la séance</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Un repos non strict de 48 heures minimum est conseillé, avec des exercices adaptés à
            votre animal.
          </p>
        </div>
      </div>
    </Section>
  </>
)

export default RendezVous
