import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { ScrollToTop } from './components/ui'
import Home from './pages/Home'
import APropos from './pages/APropos'
import Deroulement from './pages/Deroulement'
import Motifs from './pages/Motifs'
import Tarifs from './pages/Tarifs'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import { site } from './data/site'

/** Renvoie vers la page de réservation, qui vit sur une autre adresse. */
const VersReservation = () => {
  if (typeof window !== 'undefined') window.location.replace(site.booking.url)
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos.html" element={<APropos />} />
          <Route path="/deroulement.html" element={<Deroulement />} />
          <Route path="/motifs.html" element={<Motifs />} />
          <Route path="/tarifs.html" element={<Tarifs />} />
          <Route path="/blog.html" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/mentions-legales.html" element={<MentionsLegales />} />
          {/* /rendez-vous.html était une page du site avant que la réservation
              ne migre sur sa propre adresse : on y renvoie qui aurait gardé
              l'ancien lien, plutôt que de le laisser sur un 404. */}
          <Route path="/rendez-vous.html" element={<VersReservation />} />
          <Route path="/rendez-vous" element={<VersReservation />} />

          {/* Une adresse sans .html (ancien lien, saisie manuelle) est
              redirigée vers la page correspondante plutôt que vers l'accueil. */}
          {['a-propos', 'deroulement', 'motifs', 'tarifs', 'blog', 'contact', 'mentions-legales'].map(
            (r) => <Route key={r} path={`/${r}`} element={<Navigate to={`/${r}.html`} replace />} />,
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
