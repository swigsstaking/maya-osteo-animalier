import CarteSecteur from './CarteSecteur'
import { zones } from '../data/site'

/**
 * La carte du secteur, avec les localités repères.
 *
 * La carte garde une largeur minimale et défile horizontalement sur petit
 * écran : réduite à 350 px, ses étiquettes deviendraient illisibles. La liste
 * de localités porte la même information en texte, elle, toujours lisible.
 */
const Secteur = ({ className = '' }) => (
  <div className={className}>
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <CarteSecteur className="mx-auto w-full min-w-[620px] max-w-[880px]" />
    </div>

    <ul className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2">
      {zones.reperes.map((v) => (
        <li
          key={v}
          className="rounded-full border border-powder/70 bg-cream px-4 py-1.5 text-[13px] text-muted"
        >
          {v}
        </li>
      ))}
    </ul>

    <p className="mt-6 text-center text-sm leading-relaxed text-muted">
      Votre localité n’apparaît pas&nbsp;? Écrivez-la-moi&nbsp;: je vous dis tout de suite
      si je me déplace chez vous, et à quelles conditions.
    </p>
  </div>
)

export default Secteur
