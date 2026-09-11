/**
 * lucide-react v1 ne fournit plus les icônes de marque : on dessine celle-ci.
 * `size` et `strokeWidth` suivent la même convention que les icônes lucide.
 */
const InstagramIcon = ({ size = 16, strokeWidth = 1.6, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export default InstagramIcon
