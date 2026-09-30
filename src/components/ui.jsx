import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { site } from '../data/site'

/** Remet la page en haut à chaque changement de route. */
export const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export const Section = ({ children, className = '', tone = 'cream', id }) => {
  const tones = { cream: 'bg-cream', sand: 'bg-sand', blush: 'bg-blush' }
  return (
    <section id={id} className={`section ${tones[tone]} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  )
}

/** Surtitre + titre, l'unité de rythme répétée sur tout le site. */
export const SectionHead = ({ overline, title, lede, align = 'left', className = '' }) => (
  <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
    {overline && <p className="eyebrow">{overline}</p>}
    <h2 className={`h-section mt-4 ${align === 'center' ? 'mx-auto' : ''} max-w-2xl`}>{title}</h2>
    {lede && <p className={`lede mt-5 ${align === 'center' ? 'mx-auto' : ''}`}>{lede}</p>}
  </div>
)

/** En-tête de page intérieure. */
export const PageHeader = ({ overline, title, lede }) => (
  <div className="border-b border-powder/50 bg-sand">
    <div className="container-site py-16 md:py-24">
      {overline && <p className="eyebrow">{overline}</p>}
      <h1 className="h-display mt-4 max-w-3xl">{title}</h1>
      {lede && <p className="lede mt-6">{lede}</p>}
    </div>
  </div>
)

export const ArrowLink = ({ to, children, className = '' }) => (
  <Link to={to} className={`link-arrow group ${className}`}>
    {children}
    <ArrowRight size={15} strokeWidth={1.6} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
  </Link>
)

/** Bandeau d'appel à l'action, fermeture de chaque page. */
export const CtaBand = ({
  title = 'Une question sur votre animal ?',
  text = 'Prenez rendez-vous en ligne, ou appelez-moi : je réponds du lundi au vendredi.',
  secondary = { to: '/tarifs.html', label: 'Voir les tarifs' },
}) => (
  <Section tone="blush">
    <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="h-section max-w-xl">{title}</h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{text}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <a href={site.booking.url} className="btn-primary">Prendre rendez-vous</a>
        {secondary && (
          <Link to={secondary.to} className="btn-outline">{secondary.label}</Link>
        )}
      </div>
    </div>
  </Section>
)
