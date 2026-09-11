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
      <ul className="grid gap-10 md:grid-cols-2 lg:gap-12">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="group block">
              <img
                src={post.image}
                alt={post.imageAlt}
                width="800" height="500" loading="lazy"
                className="aspect-[8/5] w-full rounded-card object-cover"
              />
              <p className="mt-6 text-xs uppercase tracking-overline text-clay">
                {post.dateLisible} · {post.lecture}
              </p>
              <h2 className="mt-3 text-xl transition-colors duration-200 group-hover:text-brick">
                {post.titre}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{post.resume}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>

    <CtaBand />
  </>
)

export default Blog
