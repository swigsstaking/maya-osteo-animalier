import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { site } from '../data/site'

// `short` : libellé de la barre de navigation, où la place est comptée.
// `label` : libellé complet, utilisé dans le menu mobile et le pied de page.
export const navigation = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Déroulement d’une séance', short: 'Déroulement', to: '/deroulement' },
  { label: 'Motifs de consultation', short: 'Motifs', to: '/motifs' },
  { label: 'Tarifs', to: '/tarifs' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const Logo = ({ className = '' }) => (
  <Link to="/" className={`flex items-center gap-3 ${className}`} aria-label="Maya Arnould, ostéopathe animalier — accueil">
    <img src="/images/logo-mark.webp" alt="" width="52" height="26" className="h-7 w-auto" />
    <span className="leading-tight">
      <span className="block text-[15px] font-medium tracking-wide text-ink">Maya Arnould</span>
      <span className="block text-[10px] uppercase tracking-overline text-clay">Ostéopathe animalier</span>
    </span>
  </Link>
)

const Header = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap text-[13px] transition-colors duration-200 ${isActive ? 'text-brick' : 'text-muted hover:text-ink'}`

  return (
    <header className="sticky top-0 z-50 border-b border-powder/50 bg-cream/90 backdrop-blur">
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navigation principale">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.short || item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden items-center gap-2 whitespace-nowrap text-[13px] text-muted transition-colors hover:text-ink 2xl:flex">
            <Phone size={14} strokeWidth={1.6} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Link to="/rendez-vous" className="btn-primary hidden whitespace-nowrap px-5 py-2.5 sm:inline-flex">
            Prendre rendez-vous
          </Link>
          {/* Sur mobile, la barre n'a pas la place du bouton : on garde l'appel
              direct, qui est l'action la plus utilisée depuis un téléphone. */}
          <a
            href={site.phoneHref}
            aria-label={`Appeler le ${site.phoneDisplay}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-brick transition-colors hover:bg-powder sm:hidden"
          >
            <Phone size={17} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-powder/50 bg-cream xl:hidden">
          <nav className="container-site flex flex-col py-4" aria-label="Navigation mobile">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `border-b border-powder/40 py-3.5 text-[15px] ${isActive ? 'text-brick' : 'text-ink'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/rendez-vous" className="btn-primary mt-5 w-full">
              Prendre rendez-vous
            </Link>
            <a href={site.phoneHref} className="mt-3 py-2 text-center text-sm text-muted">
              {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

const Footer = () => (
  <footer className="mt-auto border-t border-powder/60 bg-sand">
    <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <div className="sm:col-span-2 lg:col-span-1">
        <img src="/images/logo-maya.webp" alt="Maya Arnould, ostéopathe animalier" width="180" height="150" className="h-24 w-auto" />
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.baseline}</p>
      </div>

      <div>
        <h2 className="eyebrow">Coordonnées</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
              <Phone size={14} strokeWidth={1.6} aria-hidden="true" /> {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-start gap-2 transition-colors hover:text-ink">
              <Mail size={14} strokeWidth={1.6} className="mt-1 shrink-0" aria-hidden="true" />
              <span>
                {site.email.split('@')[0]}
                <wbr />@{site.email.split('@')[1]}
              </span>
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={14} strokeWidth={1.6} className="mt-1 shrink-0" aria-hidden="true" />
            <span>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock size={14} strokeWidth={1.6} className="mt-1 shrink-0" aria-hidden="true" />
            <span>{site.hours}</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="eyebrow">Le site</h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted">
          {navigation.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="transition-colors hover:text-ink">{item.label}</Link>
            </li>
          ))}
          <li>
            <Link to="/rendez-vous" className="transition-colors hover:text-ink">Prendre rendez-vous</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="eyebrow">Suivre mon travail</h2>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <InstagramIcon size={15} strokeWidth={1.6} aria-hidden="true" /> {site.social.instagramHandle}
        </a>
        <p className="mt-6 text-sm text-muted">
          Zone d’intervention&nbsp;: cantons de Neuchâtel, Berne, Fribourg et Vaud.
        </p>
      </div>
    </div>

    <div className="border-t border-powder/50">
      <div className="container-site flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maya Arnould — Ostéopathe animalier</p>
        <Link to="/mentions-legales" className="transition-colors hover:text-ink">Mentions légales</Link>
      </div>
    </div>
  </footer>
)

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brick focus:px-5 focus:py-2 focus:text-sm focus:text-cream">
      Aller au contenu
    </a>
    <Header />
    <main id="contenu" className="flex-1">{children}</main>
    <Footer />
  </div>
)

export default Layout
