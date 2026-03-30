import { motion } from 'framer-motion'

export const appleEase = [0.16, 1, 0.3, 1] as const

export const appleReveal = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: appleEase },
  },
}

export const appleRevealFast = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: appleEase },
  },
}

export const appleStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

export const appleChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: appleEase },
  },
}

export const appleScale = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: appleEase },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ScrollBlock({
  children,
  variants,
  className,
  delay,
}: {
  children: React.ReactNode
  variants?: any
  className?: string
  delay?: number
}) {
  const base = variants || appleReveal
  const v = delay
    ? {
        ...base,
        visible: {
          ...base.visible,
          transition: { ...base.visible.transition, delay },
        },
      }
    : base
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={v}
      className={className}
    >
      {children}
    </motion.div>
  )
}
