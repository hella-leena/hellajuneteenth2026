const loopMultiplier = 2

export function ImageAutoSlider({ slides }) {
  const trackSlides = Array.from({ length: loopMultiplier }).flatMap(() => slides)

  return (
    <div className="image-slider" aria-label="Past festival highlights slider">
      <div className="image-slider-mask">
        <div className="image-slider-track">
          {trackSlides.map((slide, index) => (
            <article
              key={`${slide.image}-${index}`}
              className={`image-slide ${slide.shape || 'landscape'}`}
            >
              <img src={slide.image} alt={slide.alt || `Festival highlight ${index + 1}`} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
