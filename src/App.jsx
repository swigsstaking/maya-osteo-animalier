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
import RendezVous from './pages/RendezVous'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'

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
          <Route path="/rendez-vous.html" element={<RendezVous />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/mentions-legales.html" element={<MentionsLegales />} />
          {/* Une adresse sans .html (ancien lien, saisie manuelle) est
              redirigée vers la page correspondante plutôt que vers l'accueil. */}
          {['a-propos', 'deroulement', 'motifs', 'tarifs', 'blog', 'rendez-vous', 'contact', 'mentions-legales'].map(
            (r) => <Route key={r} path={`/${r}`} element={<Navigate to={`/${r}.html`} replace />} />,
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
