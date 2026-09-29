import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { Section, PageHeader, CtaBand } from '../components/ui'
import { posts } from '../data/posts'

const Blog = () => (
  <>
    <SEOHead page="blog" />
    <PageHeader
      overline="Blog"
      title="Comprendre l’ostéopathie animale"
      lede="Quelques repères pour mieux lire le corps de votre animal, et pour démêler ce qui relève de l’idée reçue."
    />

    <Section>
      {/* Cartes horizontales : en portrait 4/5, des vignettes pleine largeur
          écrasaient les titres sous 650 px de photo. */}
      <ul className="mx-auto max-w-3xl">
        {posts.map((post, i) => (
          <li key={post.slug} className={i !== 0 ? 'border-t border-powder/60 pt-10' : ''}>
            <Link
              to={`/blog/${post.slug}.html`}
              className="group grid gap-7 pb-10 sm:grid-cols-[168px_1fr] sm:gap-9"
            >
              <img
                src={post.image}
                alt={post.imageAlt}
                width={post.imageW} height={post.imageH} loading="lazy"
                className="aspect-[4/5] w-full rounded-niche object-cover"
              />
              <div className="self-center">
                <p className="text-xs uppercase tracking-overline text-clay">
                  {post.dateLisible} · {post.lecture}
                </p>
                <h2 className="mt-3 text-xl transition-colors duration-200 group-hover:text-brick">
                  {post.titre}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{post.resume}</p>
                <span className="link-arrow mt-5 inline-flex">Lire l’article</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>

    <CtaBand />
  </>
)

export default Blog
