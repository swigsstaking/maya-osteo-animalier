import seoData from '../data/seo.json'

export const useSEO = (page = 'home') => seoData.pages[page] || seoData.pages.home
export const siteMeta = seoData.site
