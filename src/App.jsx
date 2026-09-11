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
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/deroulement" element={<Deroulement />} />
          <Route path="/motifs" element={<Motifs />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
