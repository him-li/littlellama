import type { Variants } from 'motion/react';

export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const pageVariants: Variants = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.28, ease: smoothEase } },
	exit: { opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
};

export const cardVariants: Variants = {
	initial: { opacity: 0, y: 14 },
	enter: { opacity: 1, y: 0, transition: { duration: 0.34, ease: smoothEase } },
	exit: { opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
};
