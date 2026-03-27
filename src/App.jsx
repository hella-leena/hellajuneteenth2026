import { useEffect, useMemo, useState } from 'react'
import { FeatureSteps } from './components/FeatureSteps'
import { ImageAutoSlider } from './components/ImageAutoSlider'

const EVENTBRITE_URL = 'https://hellajuneteenthfestival2026.eventbrite.com'
const SIGNUP_URL = EVENTBRITE_URL === '#' ? '/#tickets' : EVENTBRITE_URL
const BRAND_LOGO_URL = '/images/HJ_2025_logo_full color.png'
const FOOTER_LOGO_URL = BRAND_LOGO_URL
const HERO_VIDEO_EMBED_URL = 'https://player.vimeo.com/video/1166200564?autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0'
const LINEUP_VIDEO_EMBED_URL = 'https://www.youtube.com/embed/_PTOes53f78'

const experienceCards = [
  {
    image: '/images/20240619_JuneteenthCookout_GC-6_qed.jpg',
    title: 'The Cookout',
    byline: 'A curated lineup of Black-owned food vendors',
    imagePosition: '50% 52%',
  },
  {
    image: '/images/20240619_JuneteenthCookout_GC-16_qed-1536x1024.jpg',
    title: 'The Green',
    byline: 'Open space to lounge, connect, and dance',
    imagePosition: '50% 50%',
  },
  {
    image: '/images/DSC_8245.jpg',
    title: 'Hella Games',
    byline: 'Spades, dominoes, and classic lawn games',
    imagePosition: '52% 56%',
  },
  {
    image: '/images/20250619_HELLAJUNETEENTH_GC-48-KQED.jpg',
    title: 'Hella Kids',
    byline: 'Curated programming for kids to learn, play, and explore',
    imagePosition: '50% 18%',
  },
]

const experienceSlides = [
  { image: '/images/20240619_JuneteenthCookout_GC-16_qed-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20240619_JuneteenthCookout_GC-18_qed-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20240619_JuneteenthCookout_GC-37_qed-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20240619_JuneteenthCookout_GC-6_qed.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-11-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-18-KQED-1536x1012.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-30-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-36-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-40-KQED.jpg', shape: 'portrait', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-43-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-48-KQED.jpg', shape: 'portrait', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-8-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/20250619_HELLAJUNETEENTH_GC-9-KQED-1536x1024.jpg', shape: 'landscape', alt: 'Hella Juneteenth festival photo' },
  { image: '/images/DSC_8245.jpg', shape: 'portrait', alt: 'Hella Juneteenth festival photo' },
]

const yesBring = [
  'Good vibes, love, and community.',
  'Blankets no larger than 5 x 7 feet.',
  'Low-profile lawn chairs.',
  'Coolers (outside non-alcoholic beverages welcome).',
  'Strollers (must be folded during performances and keep walkways clear).',
]

const noBring = [
  'Tarps of any size and blankets larger than 5 x 7 feet.',
  'Pets in festival zones (service/support animals allowed).',
  'Large shade structures, high-back chairs, tall tables, umbrellas, tents.',
  'Open flames, grills, fireworks, explosives, or drones.',
  'Weapons, illegal substances, amplified sound systems, and disruptive items.',
]

const ticketTypes = [
  { title: 'General Admission', lines: ['GA Early: $18', 'GA Tier 1: $25', 'GA Tier 2: $40', 'GA Final: $45'], cta: 'Select GA' },
  { title: 'VIP', lines: ['VIP Early: $95', 'VIP Tier 1: $105', 'VIP Final: $115'], cta: 'Select VIP' },
  { title: 'Youth (12+)', lines: ['Youth ticket: $10', 'Ages 12-18'], cta: 'Select Youth' },
  { title: 'Picnic Tables', lines: ['Tables Early: $250', 'Tables Final: $350'], cta: 'Select Table' },
]

const whyAttendFeatures = [
  {
    step: '1',
    title: "What you'll experience",
    content:
      'A family-friendly, high-energy day at Cloud Park with Black musicians, DJs, food vendors, local businesses, art installations, and cultural programming built for joy and connection.',
    image: '/images/20250619_HELLAJUNETEENTH_GC-18-KQED-1536x1012.jpg',
    imagePosition: '50% 38%',
  },
  {
    step: '2',
    title: 'Why it matters',
    content:
      'Hella Juneteenth honors the legacy of Juneteenth while creating intentional space to celebrate Black culture, resilience, and community in Oakland.',
    image: '/images/20250619_HELLAJUNETEENTH_GC-8-KQED-1536x1024.jpg',
    imagePosition: '50% 42%',
  },
  {
    step: '3',
    title: "Who you'll meet",
    content:
      'Families, creatives, professionals, students, and community leaders from across the Bay Area gathering to support Black-owned businesses, discover new artists, and celebrate together.',
    image: '/images/20240619_JuneteenthCookout_GC-37_qed-1536x1024.jpg',
    imagePosition: '50% 45%',
  },
]

const festivalFaqGroups = [
  {
    title: 'General',
    items: [
      {
        q: 'Where is the festival?',
        a: 'Hella Juneteenth 2026 will take place at Cloud Park in Downtown Oakland, in partnership with Oakland School for the Arts.',
      },
      {
        q: 'Is it at OMCA?',
        a: 'No. We are no longer at OMCA. 2026 marks a new chapter as we move to Cloud Park, expanding the footprint and experience.',
      },
      {
        q: 'Why the venue change?',
        a: "We're evolving. Cloud Park allows us to maintain our identity, vision, and control over programming while creating an immersive experience in the heart of downtown Oakland.",
      },
      {
        q: 'Is it the same as last year?',
        a: "It's the same spirit. 2026 includes a new partnership with OSA, a new footprint, and new programming surprises.",
      },
      {
        q: 'Oops, I lost something. Is there a Lost & Found?',
        a: "It happens. Lost & Found form link coming soon, and we'll do our best to reunite you with your items.",
      },
    ],
  },
  {
    title: 'Tickets & Entry',
    items: [
      {
        q: 'Is this a free event?',
        a: 'No. Entry requires a ticket, and purchasing early is highly recommended. Children 12 and under are free with a ticketed adult (add-on required).',
      },
      {
        q: 'How do I get a ticket?',
        a: 'Tickets are sold exclusively at hellajuneteenth.com. Sign up for early access to secure limited tiers.',
      },
      {
        q: 'What ticket types are available?',
        a: 'General Admission, VIP Experience, Reserved Tables (limited).',
      },
      {
        q: 'Are kids free?',
        a: 'Yes. Children 12 and under receive free entry with a ticketed adult (add-on required).',
      },
      {
        q: "What if I can't make it? Can I transfer my ticket?",
        a: "We're working on flexible options. Check back soon for transfer policies and instructions.",
      },
      {
        q: 'Are there any discount codes for OSA members?',
        a: 'Yes. OSA member tickets are limited. Eligible members should have received an email directly from OSA with access details.',
      },
    ],
  },
  {
    title: 'VIP & Reserved Tables',
    items: [
      {
        q: 'Is there a VIP experience?',
        a: 'Yes. VIP includes expedited entry, access to a private area, open bar, prime stage views, and dedicated restrooms.',
      },
      {
        q: 'Are reserved tables available?',
        a: 'Yes. A limited number of reserved tables are available for groups of 6 seeking a guaranteed space.',
      },
      {
        q: 'Do I still need individual tickets if I purchase a reserved picnic table?',
        a: 'No, but if you have questions about your table purchase, please email team@hellajuneteenth.com for clarification.',
      },
      {
        q: 'How much are reserved picnic tables?',
        a: 'Pricing is available at hellajuneteenth.com. Reserved picnic tables sell out quickly.',
      },
      {
        q: 'Do kids count toward table capacity?',
        a: "If they'll need their own seat, yes. Lap infants are the exception.",
      },
      {
        q: 'Can I pick which table I reserve on a map?',
        a: 'While we cannot offer map-based selection, all tables are located in prime viewing areas surrounding the main stage without obstruction. Our team assigns tables based on availability, reservation date, and accessibility needs.',
      },
    ],
  },
  {
    title: 'Food & Drinks',
    items: [
      {
        q: 'Can I bring my own food and drink?',
        a: 'No outside food or beverages are allowed. We curate beloved Black chefs, local food vendors, and full bar experiences on-site.',
      },
      {
        q: 'Will there be drinks?',
        a: "Yes. Beer, wine, specialty beverages, and non-alcoholic options will be available for purchase. A portion of every sip supports the festival's future.",
      },
      {
        q: 'Will there be vegan and vegetarian options?',
        a: 'Yes. We intentionally curate vendors with inclusive menu options.',
      },
      {
        q: 'Will there be alcohol?',
        a: 'Yes. Valid ID required.',
      },
    ],
  },
  {
    title: 'Opportunities',
    items: [
      {
        q: 'How can I apply to be a vendor?',
        a: 'We curate a selective group of vendors each year aligned with our mission and experience design. Please complete the vendor interest form (link coming soon).',
      },
      {
        q: 'Are nonprofit resource tables allowed?',
        a: 'We host a limited number of nonprofit and community partners aligned with our mission. Apply through the vendor form.',
      },
      {
        q: "I'm an artist. How do I get involved?",
        a: 'Please email team@hellajuneteenth.com with your portfolio and relevant details.',
      },
      {
        q: 'Can I volunteer?',
        a: "We'd love that. Volunteers make this celebration possible. Volunteer signup link coming soon.",
      },
      {
        q: 'How can I sponsor the festival?',
        a: 'Request our 2026 sponsorship deck at team@hellajuneteenth.com.',
      },
    ],
  },
  {
    title: 'About',
    items: [
      {
        q: 'What is Hella Juneteenth?',
        a: 'Hella Juneteenth is an annual cultural festival held on June 19 in Oakland, California. It celebrates Black freedom, creativity, resilience, and community through music, food, art, movement, and immersive programming. The initiative began in 2020 as a digital campaign advocating for Juneteenth to be recognized as a paid holiday. Since then, it has evolved into a defining West Coast cultural gathering.',
      },
      {
        q: 'Who produces Hella Juneteenth?',
        a: 'Hella Juneteenth Festival is produced by Hella Creative, a cultural production studio dedicated to building experiences that center community, culture, and creative expression. Hella Creative leads the vision, programming, partnerships, and execution of the festival.',
      },
      {
        q: 'Is Hella Juneteenth a nonprofit?',
        a: "Hella Juneteenth is a project of Sanctuary for Sustainable Artistry, Inc., a registered 501(c)(3) nonprofit organization that serves as the festival's fiscal sponsor. Sanctuary supports the long-term sustainability, stewardship, and charitable alignment of the festival's mission.",
      },
    ],
  },
]

function FlipText({ text }) {
  return (
    <span className="flip-up-clip">
      <span className="flip-up-inner">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </span>
  )
}

function Nav({ light = false }) {
  return (
    <header className={`nav site-nav ${light ? 'nav-light' : 'nav-scrolled'}`}>
      <a href="/" className="wordmark" aria-label="Hella Juneteenth Festival">
        <img src={BRAND_LOGO_URL} alt="Hella Juneteenth Festival logo" className="wordmark-logo" />
      </a>
      <div className="nav-right">
        <a href="/lineup" className="dashed-link flip-up"><FlipText text="Lineup" /></a>
        <a href="/faq" className="dashed-link flip-up"><FlipText text="FAQ" /></a>
        {!light && (
          <a href={SIGNUP_URL} className="register-btn flip-up"><FlipText text="Sign me up" /></a>
        )}
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="footer" id="press">
      <div className="footer-mark">
        {FOOTER_LOGO_URL ? (
          <img src={FOOTER_LOGO_URL} alt="Hella Juneteenth Festival logo" className="footer-logo" />
        ) : (
          'HELLA JUNETEENTH'
        )}
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <a href={SIGNUP_URL} className="dashed-link flip-up" target="_blank" rel="noreferrer"><FlipText text="Get tickets" /></a>
          <a href="https://hellajuneteenth-festival.myflodesk.com/getinvolved" className="dashed-link flip-up" target="_blank" rel="noreferrer"><FlipText text="Get Involved" /></a>
          <a href="/lineup" className="dashed-link flip-up"><FlipText text="Lineup" /></a>
        </div>
        <div className="footer-col">
          <a href="/faq" className="dashed-link flip-up"><FlipText text="FAQ" /></a>
          <a href="https://www.instagram.com/hella__creative" className="dashed-link flip-up" target="_blank" rel="noreferrer"><FlipText text="Instagram" /></a>
          <a href="mailto:team@hellajuneteenth.com" className="dashed-link flip-up"><FlipText text="Contact" /></a>
        </div>
      </div>
      <div className="footer-meta">
        <span>© 2026 Hella Juneteenth Festival. All rights reserved.</span>
        <span>A project of Sanctuary for Sustainable Artistry, Inc. (501(c)(3))</span>
        <span>
          <a href="/code-of-conduct" className="dashed-link flip-up footer-meta-link">
            <FlipText text="Hella Juneteenth Code of Conduct" />
          </a>
        </span>
      </div>
    </footer>
  )
}

function FaqPage() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)
  const [openItemId, setOpenItemId] = useState('')
  const activeGroup = festivalFaqGroups[activeGroupIndex]

  return (
    <div className="page faq-page">
      <Nav light={false} />
      <main className="faq-page-main section-black">
        <section className="faq-config-layout">
          <aside className="faq-side-nav">
            <div className="faq-side-title">FAQ</div>
            <div className="faq-category-list">
              {festivalFaqGroups.map((group, index) => {
                const isActive = index === activeGroupIndex
                return (
                  <button
                    key={group.title}
                    type="button"
                    className={`faq-category-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveGroupIndex(index)}
                    aria-pressed={isActive}
                  >
                    {group.title}
                  </button>
                )
              })}
            </div>
          </aside>

          <div className="faq-config-content">
            <h1>{activeGroup.title}</h1>
            <div className="faq-list faq-list-page">
              {activeGroup.items.map((item, index) => {
                const itemId = `${activeGroupIndex}-${index}`
                const isOpen = openItemId === itemId
                return (
                  <div key={itemId} className={`faq-item faq-item-page ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-toggle"
                      onClick={() => setOpenItemId(isOpen ? '' : itemId)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-arrow" aria-hidden="true">{isOpen ? '↑' : '↓'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function LineupPage() {
  return (
    <div className="page lineup-page">
      <Nav light={false} />
      <main className="lineup-main section-black">
        <section className="lineup-hero">
          <div className="content-grid">
            <div className="side-label">LINEUP</div>
            <div>
              <h1>Hella Juneteenth Festival Lineup Coming Soon</h1>
            </div>
          </div>
        </section>

        <section className="lineup-media">
          <div className="content-grid">
            <div aria-hidden="true" />
            <iframe
              title="Hella Juneteenth lineup preview"
              className="lineup-video"
              src={LINEUP_VIDEO_EMBED_URL}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function CodeOfConductPage() {
  return (
    <div className="page lineup-page">
      <Nav light={false} />
      <main className="lineup-main section-black">
        <section className="lineup-hero">
          <div className="content-grid">
            <div className="side-label">CODE OF CONDUCT</div>
            <div>
              <h1>Hella Juneteenth Code of Conduct</h1>
              <div className="conduct-body">
                <p>
                  Our Code of Conduct exists to help protect that experience and make clear what we expect from everyone who joins
                  us. We all play a role in creating a space that feels safe, welcoming, and full of good energy.
                </p>

                <h2>Lead with Respect</h2>
                <p>
                  We&apos;re all here to have a great time. Treat everyone with kindness and respect, and help us keep Hella
                  Juneteenth Festival welcoming for people of every background and identity. Harassment of any kind isn&apos;t
                  tolerated.
                </p>

                <h2>Protect the Vibe</h2>
                <p>
                  This is a space for joy, connection, and celebration. Aggressive behavior, intimidation, verbal abuse, threats,
                  unwelcome physical contact, or anything that disrupts the experience for others has no place here.
                </p>

                <h2>Honor the Community</h2>
                <p>
                  All attendees, artists, staff, volunteers, vendors, partners, and guests are expected to uphold these values. By
                  participating in Hella Juneteenth Festival, you agree to follow this Code of Conduct. Any violations may result
                  in removal from the event without refund and/or restricted access to future Hella Creative experiences.
                </p>

                <h2>We&apos;re Happy You&apos;re Here</h2>
                <p>
                  Thank you for helping us make Hella Juneteenth Festival safe, joyful, and enjoyable for all. If you witness or
                  experience a concern, notify Staff, Security, or email{' '}
                  <a href="mailto:team@hellajuneteenth.com">team@hellajuneteenth.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function HomePage() {
  const [isLightNav, setIsLightNav] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setIsLightNav(window.scrollY < 520)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page" id="top">
      <Nav light={isLightNav} />

      <section className="hero-top">
        <div className="hero-meta-row">
          <p>BAY AREA&apos;S JUNETEENTH EPICENTER<br />MUSIC, FOOD, ART, AND COMMUNITY</p>
        </div>
        <div className="hero-info">
          <div>
            <p>June 12 - June 19, 2026<br />A Juneteenth week across Oakland awaits</p>
          </div>
          <div>
            <p>Cloud Park<br />Downtown Oakland, CA</p>
          </div>
          <div className="hero-price">
            <p>Can&apos;t wait to see you.<br />Tickets available now</p>
            <a href={SIGNUP_URL} className="register-btn register-dark hero-signup-btn flip-up"><FlipText text="Sign me up" /></a>
          </div>
        </div>
      </section>

      <section className="hero-media">
        <div className="hero-media-frame">
          <iframe
            className="hero-media-video"
            width="560"
            height="315"
            src={HERO_VIDEO_EMBED_URL}
            title="Hella Juneteenth Festival highlight video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="register-callout section-black">
        <div className="side-label">SAVE YOUR SPOT</div>
        <div>
          <h2 className="dashed-heading">
            <span className="callout-title">Pull up to the cookout</span>
            <a
              href={SIGNUP_URL}
              className="callout-ticket-link"
              aria-label="Get your ticket"
              target="_blank"
              rel="noreferrer"
            >
              <span className="ticket-link-clip">
                <span className="ticket-link-inner">
                  <span>Get your ticket →</span>
                  <span aria-hidden="true">Get your ticket →</span>
                </span>
              </span>
            </a>
          </h2>
          <p className="sub-copy">Lineup coming soon.</p>
        </div>
        <div className="big-price">OAK</div>
      </section>

      <section className="experience-slider-section section-black" aria-label="Past festival media">
        <ImageAutoSlider slides={experienceSlides} />
      </section>

      <section className="gallery section-black">
        <div className="stats-row">
          <div className="side-label">Hella Juneteenth is</div>
          <h2>
            <span className="stat-line">An annual celebration of Black freedom, joy, and culture</span>
            <span className="stat-line">Where music, food, art, and movement meet</span>
            <span className="stat-line">Produced by Hella Creative</span>
          </h2>
        </div>
      </section>

      <section className="why section-black" id="about">
        <div className="content-grid">
          <div className="side-label">WHY ATTEND</div>
          <FeatureSteps features={whyAttendFeatures} autoPlayInterval={4500} />
        </div>
      </section>

      <section className="highlights section-black" id="lineup">
        <div className="content-grid">
          <div className="side-label">THE EXPERIENCE</div>
          <div>
            <h2>Hella Juneteenth&apos;s Highlights</h2>
            <div className="cards">
              {experienceCards.map((item) => (
                <article key={item.title} className="card">
                  <div className="thumb-wrap">
                    <img src={item.image} alt={item.title} style={{ objectPosition: item.imagePosition || '50% 50%' }} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.byline}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tickets section-black" id="tickets">
        <div className="content-grid tickets-grid">
          <div className="side-label">TICKETS</div>
          <div className="tickets-center-row">
            <a
              href={SIGNUP_URL}
              className="ticket-primary-cta register-btn flip-up"
              target="_blank"
              rel="noreferrer"
            >
              <FlipText text="Join the Experience" />
            </a>
          </div>
        </div>
      </section>

      <section className="faq section-black" id="faq">
        <div className="content-grid">
          <div className="side-label">FESTIVAL FAQ</div>
          <div>
            <h2>What can I bring?</h2>
            <div className="faq-list">
              {yesBring.map((item) => (
                <div className="faq-item" key={item}>
                  <span>YES - {item}</span>
                </div>
              ))}
            </div>
            <h2 className="faq-subhead">What can I not bring?</h2>
            <div className="faq-list">
              {noBring.map((item) => (
                <div className="faq-item" key={item}>
                  <span>NO - {item}</span>
                </div>
              ))}
            </div>
            <p className="faq-page-link-wrap">
              <a href="/faq" className="dashed-link flip-up"><FlipText text="See full FAQ" /></a>
            </p>
          </div>
        </div>
      </section>

      <section className="map-section section-black" id="map">
        <div className="content-grid">
          <div className="side-label">PLAN YOUR VISIT</div>
          <div>
            <h2>In the heart of the Town</h2>
            <p className="map-intro">
              Cloud Park is our new festival location this year. See you there!
            </p>
            <div className="map-layout">
              <div className="map-embed-wrap">
                <iframe
                  title="Hella Juneteenth Festival map"
                  className="map-embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Cloud+Park+Oakland+CA&z=19&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

function App() {
  const currentPath = useMemo(() => window.location.pathname.replace(/\/$/, '') || '/', [])

  if (currentPath === '/faq') {
    return <FaqPage />
  }

  if (currentPath === '/lineup') {
    return <LineupPage />
  }

  if (currentPath === '/code-of-conduct') {
    return <CodeOfConductPage />
  }

  return <HomePage />
}

export default App
