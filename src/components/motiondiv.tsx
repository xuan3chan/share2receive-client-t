'use client'

import { motion, MotionProps } from 'framer-motion'

export default function MotionDiv({ children, ...props }: { children: React.ReactNode } & MotionProps) {
  return <motion.div {...props}>{children}</motion.div>
}
