import SEOHead from '../components/SEOHead'
import { Section, PageHeader } from '../components/ui'
import { site } from '../data/site'

const Bloc = ({ titre, children }) => (
  <div className="border-t border-powder/60 py-8 first:border-0 first:pt-0">
    <h2 className="text-lg">{titre}</h2>
    <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
  </div>
)

const MentionsLegales = () => (
  <>
    <SEOHead page="mentions" />
    <PageHeader overline="Informations légales" title="Mentions légales" />

    <Section>
      <div className="mx-auto max-w-prose">
        <Bloc titre="Éditeur du site">
          <p>
            {site.name}, {site.role.toLowerCase()}
            <br />
            {site.address.street}, {site.address.postalCode} {site.address.city} (Suisse)
            <br />
            Téléphone : {site.phoneDisplay}
            <br />
            E-mail : {site.email}
          </p>
        </Bloc>

        <Bloc titre="Nature de l’activité">
          <p>
            L’ostéopathie animale est une thérapie manuelle de confort. Elle ne constitue ni un
            acte de médecine vétérinaire, ni un diagnostic, et ne remplace en aucun cas le suivi
            de votre vétérinaire. En cas d’urgence ou de doute sur l’état de santé de votre animal,
            contactez votre vétérinaire.
          </p>
        </Bloc>

        <Bloc titre="Propriété intellectuelle">
          <p>
            L’ensemble des textes, photographies et éléments graphiques de ce site est la propriété
            de {site.name}. Toute reproduction, même partielle, est soumise à autorisation
            préalable.
          </p>
        </Bloc>

        <Bloc titre="Données personnelles">
          <p>
            Ce site ne dépose aucun cookie de mesure d’audience ni de publicité, et ne collecte
            aucune donnée à votre insu. Les informations que vous transmettez par téléphone,
            WhatsApp ou e-mail servent uniquement à organiser votre rendez-vous et le suivi de
            votre animal. Elles ne sont ni revendues, ni transmises à des tiers.
          </p>
          <p>
            Conformément à la loi fédérale sur la protection des données (LPD), vous pouvez
            demander l’accès, la rectification ou la suppression de vos données en écrivant à{' '}
            {site.email}.
          </p>
        </Bloc>

        <Bloc titre="Hébergement">
          <p>Site hébergé en Suisse par Swigs Cloud.</p>
        </Bloc>
      </div>
    </Section>
  </>
)

export default MentionsLegales
