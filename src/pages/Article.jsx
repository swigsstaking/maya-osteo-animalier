import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { Section, CtaBand } from '../components/ui'
import { posts, getPost } from '../data/posts'
import { articleJsonLd } from '../data/jsonld'

const Article = () => {
  const { slug } = useParams()
  // Les URL se terminent en .html (voir App.jsx) ; React Router ne sait pas
  // capturer un segment partiel, on retire donc l'extension ici.
  const post = getPost(slug.replace(/\.html$/, ''))

  if (!post) return <Navigate to="/blog.html" replace />

  const autres = posts.filter((p) => p.slug !== post.slug)

  return (
    <>
      <SEOHead
        page="blog"
        title={`${post.titre} — Blog de Maya Arnould`}
        description={post.resume}
        path={`/blog/${post.slug}.html`}
        image={post.image}
        jsonLd={articleJsonLd(post)}
      />

      <div className="border-b border-powder/50 bg-sand">
        <div className="container-site py-16 md:py-24">
          <Link to="/blog.html" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" /> Tous les articles
          </Link>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1fr_0.4fr] md:gap-16">
            <div>
              <p className="eyebrow">{post.dateLisible} · {post.lecture}</p>
              <h1 className="h-display mt-4">{post.titre}</h1>
            </div>
            <img
              src={post.image}
              alt={post.imageAlt}
              width={post.imageW} height={post.imageH}
              className="aspect-[4/5] w-full rounded-niche object-cover"
            />
          </div>
        </div>
      </div>

      <Section>
        <article className="mx-auto max-w-prose">
          <div>
            {post.blocs.map((bloc, i) =>
              bloc.type === 'ul' ? (
                <ul key={i} className="my-6 space-y-2.5">
                  {bloc.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                      <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mb-5 text-base leading-relaxed text-muted">{bloc.texte}</p>
              ),
            )}
          </div>
        </article>
      </Section>

      {autres.length > 0 && (
        <Section tone="sand">
          <h2 className="eyebrow">À lire aussi</h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-2">
            {autres.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}.html`} className="group block">
                  <h3 className="text-xl transition-colors duration-200 group-hover:text-brick">{p.titre}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.resume}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand />
    </>
  )
}

export default Article
