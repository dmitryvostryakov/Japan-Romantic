import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { afterDark } from '../trip-content'
import { ChapterHeader } from './SectionPrimitives'

export function AfterDarkSection({
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
    [1.06, shouldReduceMotion ? 1.06 : 1],
  )

  return (
    <section className="after-dark" id="after-dark" ref={ref}>
      <motion.img
        alt={afterDark.image.alt}
        className="after-dark-image"
        loading="lazy"
        src={afterDark.image.src}
        style={{ scale: imageScale }}
      />
      <div className="after-dark-content">
        <ChapterHeader
          eyebrow="ПОСЛЕ ЗАКАТА"
          page="14"
          title="Когда город засыпает — вы только начинаете"
          description="Интимная часть поездки. Без расписания, без камер, без свидетелей. Всё, что здесь — только для вас двоих."
        />

        <p className="after-dark-intro">{afterDark.intro}</p>

        <div className="after-dark-grid">
          {afterDark.moments.map((moment) => (
            <motion.article
              key={moment.title}
              className="after-dark-card"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
            >
              <h3>{moment.title}</h3>
              <div className="after-dark-divider" />
              <p>{moment.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
