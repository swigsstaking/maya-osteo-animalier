import { Phone, MessageCircle, Mail } from 'lucide-react'
import { site } from '../data/site'

/**
 * Les canaux de contact direct : téléphone, WhatsApp, e-mail.
 *
 * La réservation en ligne vit sur sa propre page (voir site.booking.url) ;
 * ce bloc reste la voie directe pour qui préfère écrire ou appeler.
 */
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
            <span className="text-[15px] text-ink [overflow-wrap:anywhere]">{valeur}</span>
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

export default DirectContact
export { DirectContact }
