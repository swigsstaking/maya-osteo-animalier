import { useEffect, useRef } from 'react'
import { Phone, MessageCircle, Mail } from 'lucide-react'
import { site } from '../data/site'

/**
 * Agenda de prise de rendez-vous.
 *
 * Tant que `site.booking.url` est vide, on affiche les canaux de contact direct :
 * le visiteur peut toujours joindre Maya. Renseigner l'URL de l'agenda
 * (Calendly ou Reservio) dans src/data/site.js suffit à activer le widget.
 */

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

const CalendlyWidget = ({ url }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      document.head.appendChild(link)
    }
    if (!document.querySelector(`script[src="${CALENDLY_JS}"]`)) {
      const script = document.createElement('script')
      script.src = CALENDLY_JS
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="calendly-inline-widget overflow-hidden rounded-panel border border-powder/60 bg-white"
      data-url={url}
      style={{ minWidth: '320px', height: '760px' }}
    />
  )
}

const DirectContact = () => {
  // L'adresse se coupait au milieu de « gmail.com » : on force la coupure
  // juste avant l'arobase.
  const [avant, apres] = site.email.split('@')
  const canaux = [
    { icon: Phone, label: 'Appeler', valeur: site.phoneDisplay, href: site.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', valeur: 'Écrire un message', href: site.whatsapp, ext: true },
    {
      icon: Mail,
      label: 'E-mail',
      href: `mailto:${site.email}`,
      valeur: (
        <>
          {avant}
          <wbr />@{apres}
        </>
      ),
    },
  ]

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {canaux.map(({ icon: Icon, label, valeur, href, ext }) => (
          <a
            key={label}
            href={href}
            {...(ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="card flex flex-col gap-3 transition-colors duration-200 hover:border-brick/60"
          >
            <Icon size={20} strokeWidth={1.4} className="text-clay" aria-hidden="true" />
            <span className="eyebrow">{label}</span>
            <span className="text-[15px] text-ink">{valeur}</span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Je réponds du lundi au vendredi, de 8h00 à 18h30. Pour aller plus vite, indiquez-moi
        l’espèce et l’âge de votre animal, le motif de la consultation et votre localité.
      </p>
    </div>
  )
}

const BookingEmbed = () => {
  const { url, provider } = site.booking

  if (!url) return <DirectContact />
  if (provider === 'calendly') return <CalendlyWidget url={url} />

  return (
    <iframe
      src={url}
      title="Prise de rendez-vous en ligne"
      loading="lazy"
      className="h-[760px] w-full rounded-panel border border-powder/60 bg-white"
    />
  )
}

export default BookingEmbed
export { DirectContact }
