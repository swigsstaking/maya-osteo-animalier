import { Phone, MessageCircle, Mail } from 'lucide-react'
import { site } from '../data/site'

/**
 * Agenda de prise de rendez-vous, servi par Swigs Studio.
 *
 * Tant que `site.booking.slug` est vide, la page affiche les canaux de contact
 * direct : le visiteur peut toujours joindre Maya. Renseigner le slug de son
 * profil de réservation suffit à activer l'agenda.
 *
 * Intégré en iframe plutôt qu'en script : le widget vit sur un autre domaine,
 * et une iframe l'isole complètement — son CSS ne peut pas déteindre sur le
 * site, et une panne de son côté n'emporte pas la page.
 */

// Le widget ne communique pas sa hauteur au parent : on réserve de quoi
// afficher ses quatre étapes, il défile à l'intérieur si besoin.
const HAUTEUR = 820

const AgendaSwigs = ({ slug }) => (
  <iframe
    src={
      `https://calendar.swigs.online/book/${encodeURIComponent(slug)}` +
      `?embed=1&primary=${encodeURIComponent(site.booking.couleur)}`
    }
    title="Prendre rendez-vous avec Maya Arnould"
    loading="lazy"
    className="w-full rounded-panel border border-powder/60 bg-white"
    style={{ height: HAUTEUR }}
  />
)

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

const BookingEmbed = () => {
  const { slug } = site.booking
  return slug ? <AgendaSwigs slug={slug} /> : <DirectContact />
}

export default BookingEmbed
export { DirectContact }
