import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { lastNote, imageCredits } from '../trip-content'

export function FinalNote({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.04, shouldReduceMotion ? 1.04 : 1],
  )

  return (
    <section className="final-note" id="last-note" ref={ref}>
      <motion.img
        alt={lastNote.image.alt}
        className="final-note-image"
        loading="lazy"
        src={lastNote.image.src}
        style={{ scale: imageScale }}
      />
      <div className="final-note-overlay" />
      <div className="final-note-content">
        <p className="hero-edition">{lastNote.eyebrow}</p>
        <h2>{lastNote.title}</h2>
        <p>{lastNote.body}</p>
        <a className="hero-cta final-note-cta" href="#top">
          Наверх
        </a>
        <div className="credits-strip">
          {imageCredits.map((image) => (
            <a
              key={image.src}
              href={image.creditUrl}
              rel="noreferrer"
              target="_blank"
            >
              {image.creditLabel}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
