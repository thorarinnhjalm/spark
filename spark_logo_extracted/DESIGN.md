---
name: Illuminated Intelligence
colors:
  surface: '#fef7ff'
  surface-dim: '#ded7e4'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1fe'
  surface-container: '#f3ebf8'
  surface-container-high: '#ede5f3'
  surface-container-highest: '#e7e0ed'
  on-surface: '#1d1a23'
  on-surface-variant: '#494454'
  inverse-surface: '#322f39'
  inverse-on-surface: '#f5eefb'
  outline: '#7b7486'
  outline-variant: '#cbc3d7'
  surface-tint: '#6d3bd7'
  primary: '#6b38d4'
  on-primary: '#ffffff'
  primary-container: '#8455ef'
  on-primary-container: '#fffbff'
  inverse-primary: '#d0bcff'
  secondary: '#b4136d'
  on-secondary: '#ffffff'
  secondary-container: '#fd56a7'
  on-secondary-container: '#600037'
  tertiary: '#855000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a76500'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#fef7ff'
  on-background: '#1d1a23'
  surface-variant: '#e7e0ed'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 64px
  gutter: 16px
  margin-page: 32px
---

## Brand & Style

This design system centers on the concept of "Illuminated Intelligence"—a visual metaphor for the clarity and spark of curiosity that AI fluency provides to young learners. The brand personality is high-end yet accessible, balancing the structured expectations of parents with the imaginative world of children. 

The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes heavy whitespace and a clean Bento-box grid to maintain a premium feel, while employing translucent layers and vibrant background blurs to create a sense of depth and magic. The interface should feel "airy" and "weightless," as if the UI elements are floating in an illuminated space. For the parent persona, the system leans into the structured grid; for the child persona, the system amplifies the glass effects and gradient intensities to feel more gamified and reactive.

## Colors

The palette is anchored by a sophisticated light mode that uses **Bright White** for the primary surfaces and **Off-White (#f8fafc)** for background depth to distinguish between Bento tiles. The primary accent is a vibrant "Electric Violet" (#8b5cf6) which transitions into a "Pulse Pink" (#ec4899) via linear gradients.

These gradients are reserved for high-impact moments: primary call-to-action buttons, progress indicators, and active states. For the parent-facing side, the gradients are used sparingly as thin accents or small icons. For the child-facing side, gradients can be applied to larger surfaces and backgrounds of interactive cards to increase engagement and visual delight.

## Typography

The design system utilizes **Plus Jakarta Sans** for its exceptional balance of professional geometry and friendly, open apertures. It provides the "modern and intelligent" look required for an AI platform while remaining highly legible for younger readers.

Headlines are set with tight tracking and heavy weights to create a strong visual hierarchy. Body text is prioritized for comfort, with generous line heights to accommodate long-form learning content. In the parent persona, typography is used to create a clean, editorial layout. In the child persona, larger font sizes and bolder weights are utilized to make navigation intuitive and playful.

## Layout & Spacing

The system is built on a **Bento-box layout**, utilizing a 12-column fluid grid that breaks down into modular, rectangular tiles. This approach allows for content density that feels organized rather than cluttered. 

Spacing follows an 8px rhythmic scale. Components are grouped within tiles using `md` (24px) padding, while the tiles themselves are separated by `gutter` (16px). The layout philosophy encourages "modular storytelling," where each Bento tile contains a specific unit of information or a single interactive task. This is particularly effective for kids, as it limits cognitive load by presenting one idea per container.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and soft, ambient shadows. Rather than using traditional grey shadows, this design system uses "tinted shadows"—low-opacity shadows with a hint of purple (#8b5cf6) to make elements feel like they are glowing and floating above a light source.

Standard surfaces use a background blur (Backdrop Filter: blur 12px-20px) and a semi-transparent white fill (rgba(255, 255, 255, 0.7)). Every glass container must have a subtle, 1px white inner border (opacity 0.4) to catch the "light" and define the edges, reinforcing the premium, crystalline aesthetic. Higher elevation levels are indicated by increased blur radius and a slightly more opaque white fill.

## Shapes

The shape language is defined by "Squircle"-inspired softness. A core radius of 16px (`rounded-xl` in this system's context) is applied to all primary Bento tiles and major containers. This large radius removes the "sharpness" of technology, making the AI platform feel safe and inviting for children.

Smaller components like buttons and input fields utilize an 8px to 12px radius. The consistent use of rounded corners across all elements—from image masks to progress bars—creates a cohesive, friendly environment that bridges the gap between a high-end SaaS tool and an educational toy.

## Components

### Buttons
Primary buttons use the signature vibrant gradient with a subtle drop shadow that matches the button's hue. On hover, the button should slightly scale up (1.02x) and the shadow should expand, creating a "lift" effect. Secondary buttons use a glass style with a 1px gradient border.

### Bento Cards
The foundational component. Cards must have a `16px` corner radius and a subtle `1px` white border. Backgrounds alternate between solid white for high-priority items and frosted glass for secondary supporting content.

### Progress Trackers
Designed for the child persona, these are thick, rounded bars. The "filled" portion uses the primary-to-secondary gradient, while the "unfilled" portion is a soft off-white (#f1f5f9). Adding a "glow" effect to the leading edge of the progress bar enhances the illuminated theme.

### Inputs & Forms
Input fields are clean and minimalist for parents, using #f8fafc backgrounds. For children, inputs are larger with clearer icons and haptic-like visual feedback (subtle glow on focus) to encourage interaction.

### Chips & Tags
Used for categorizing AI topics. These are pill-shaped with light pastel fills derived from the primary purple and pink, using high-contrast text for accessibility.