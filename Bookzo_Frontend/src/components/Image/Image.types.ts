import type { ComponentProps } from 'react';

export interface ImageProps extends ComponentProps<'img'> {
    alt: string; // enforced for accessibility
}
