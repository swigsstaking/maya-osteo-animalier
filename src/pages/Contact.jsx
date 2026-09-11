import { Link } from 'react-router-dom'
import { MapPin, Clock, Star } from 'lucide-react'
import InstagramIcon from '../components/InstagramIcon'
import SEOHead from '../components/SEOHead'
import { Section, PageHeader } from '../components/ui'
import { DirectContact } from '../components/BookingEmbed'
import { site } from '../data/site'

const Contact = () => (
  <>
    <SEOHead page="contact" />
    <PageHeader
      overline="Contact"
      title="Me contacter"
      lede="Le plus simple reste le téléphone ou WhatsApp. Décrivez-moi votre animal et ce que vous observez, je vous réponds rapidement."
    />

    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
        <div>
          <DirectContact />
          <Link to="/rendez-vous" className="btn-primary mt-8">Prendre rendez-vous</Link>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="eyebrow">Adresse</h2>
            <p className="mt-3 flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
              <MapPin size={15} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                Canton de {site.address.canton}
              </span>
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Horaires</h2>
            <p className="mt-3 flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
              <Clock size={15} strokeWidth={1.5} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
              {site.hours}
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Réseaux</h2>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-ink"
            >
              <InstagramIcon size={15} strokeWidth={1.5} className="shrink-0 text-clay" aria-hidden="true" />
              {site.social.instagramHandle}
            </a>
          </div>

          <div>
            <h2 className="eyebrow">Avis</h2>
            <a
              href={site.google.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2.5 text-[15px] text-muted transition-colors hover:text-ink"
            >
              <Star size={15} className="shrink-0 fill-clay text-clay" strokeWidth={0} aria-hidden="true" />
              {site.google.rating} sur {site.google.reviewCount} avis Google
            </a>
          </div>
        </div>
      </div>
    </Section>
  </>
)

export default Contact
