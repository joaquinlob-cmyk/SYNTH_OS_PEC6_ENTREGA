---
name: SYNTH_OS Industrial Terminal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9ccb2'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#84967e'
  outline-variant: '#3b4b37'
  surface-tint: '#00e639'
  primary: '#ebffe2'
  on-primary: '#003907'
  primary-container: '#00ff41'
  on-primary-container: '#007117'
  inverse-primary: '#006e16'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b6b5b4'
  tertiary: '#fff8f4'
  on-tertiary: '#442b10'
  tertiary-container: '#ffd5ae'
  on-tertiary-container: '#7a5b3c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72ff70'
  primary-fixed-dim: '#00e639'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#00530e'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#e7bf99'
  on-tertiary-fixed: '#2c1701'
  on-tertiary-fixed-variant: '#5d4124'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  neural-green: '#00FF41'
  deep-void: '#0A0A0A'
  steel-grey: '#2D2D2D'
  caution-amber: '#FFB800'
  critical-red: '#FF3E3E'
  data-blue: '#00E0FF'
typography:
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  data-display:
    fontFamily: Space Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.1em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style

This design system establishes a high-fidelity mechatronics interface, blending 1980s retro-futurism with modern tactical utility. The aesthetic is "Industrial OS"—a gritty, high-contrast environment designed to feel like a functional cockpit or a clandestine hacking terminal.

The style leverages **Brutalism** and **Tactile** influences, using rigid structural grids, heavy borders, and simulated scanline textures. Every interaction should feel mechanical; transitions are sharp, instant, or characterized by subtle "glitch" artifacts. The emotional goal is to provide the user with a sense of technical mastery and high-stakes precision.

Key visual pillars include:
- **Cathode Ray Depth:** Using subtle glowing shadows to simulate phosphorus bleeding.
- **Hardware Modularity:** Containers that mimic circuit boards or bolted metal plates.
- **Data Density:** Prioritizing information over decorative white space, utilizing monospaced characters to reinforce a "code-first" environment.

## Colors

The palette is strictly functional, rooted in the "Deep Void" (#0A0A0A) background to maximize the luminosity of "Neural Green" (#00FF41). 

- **Primary (Neural Green):** Used for all critical data, active inputs, and primary CTAs. This color should have a 4px to 8px Gaussian blur "glow" when applied to text or borders to simulate a terminal display.
- **Secondary (Steel Grey):** Defines the structural skeleton. It is used for container backgrounds and inactive borders.
- **Neutral (Deep Void):** The absolute base layer. It provides the negative space required for high-contrast legibility.
- **System Alerts:** Caution Amber and Critical Red are reserved for HUD warnings, errors, and high-intensity system states.

## Typography

Typography is the core of the OS experience. We use a tiered approach to separate system "Data" from human-readable "Information."

- **Headlines & Data (JetBrains Mono):** Used for titles, stats, and primary interface headers. It conveys technical precision.
- **Functional Labels (Space Mono):** Used for buttons, tags, and small metadata. All labels should be uppercase with increased letter spacing to mimic industrial plate engraving.
- **Reading Text (Hanken Grotesk):** A clean, modern sans-serif used for long-form body text, instructions, and lore. This ensures high readability against the dark background.

**Styling Note:** For primary headers, apply a 0.5px text-stroke in Neural Green to enhance the "hollow" neon effect.

## Layout & Spacing

The design system uses a **Fixed Grid** philosophy based on a 4px base unit. 

- **The Grid:** A 12-column grid for desktop with narrow 16px gutters to maintain a "packed" industrial feel. 
- **Margins:** Heavy outer margins (32px) on desktop create a "frame" effect, making the UI feel like a screen within a physical chassis.
- **Structure:** Content is organized into modular "blades" or containers. Use `1px` solid borders for all containers.
- **Responsiveness:** On mobile, the 12-column grid collapses to a 4-column stack. Margins reduce to 16px. Top-level HUD elements (clock, status) should remain pinned to the viewport edges regardless of content scrolling.

## Elevation & Depth

This system rejects soft shadows in favor of **Tonal Layers** and **Luminous Depth**.

1. **Base Layer:** Deep Void (#0A0A0A) with a global CSS overlay of scanlines (2px repeating linear gradient).
2. **Container Layer:** Steel Grey (#2D2D2D) with a 1px border of Neural Green at 30% opacity.
3. **Active/Overlay Layer:** Steel Grey (#2D2D2D) with a 1px border of Neural Green at 100% opacity and a `0 0 10px` outer glow.

Depth is communicated through brightness, not blur. The more important an element, the more it "glows." Use `backdrop-filter: blur(4px)` only for system-level modals to suggest a physical glass panel over the terminal.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—buttons, cards, inputs—must have 90-degree corners to reinforce the industrial, mechatronics aesthetic. To add visual interest without using rounds, use **chamfered corners** (diagonal 45-degree cuts) on the top-right and bottom-left of primary buttons and headers. These "clipped" corners should be exactly 8px deep.

## Components

- **Buttons:** Segmented and industrial. Primary buttons feature a solid Neural Green background with Deep Void text. Secondary buttons are outlined with a "bracket" style border (top/bottom/sides only).
- **Cards (Hardware Modules):** Cards must feature a "header bar" in Steel Grey with the label in the top-left corner. Use a small "0x" hex-code ID in the top-right to simulate a hardware registry.
- **Input Fields (Terminal Style):** Inputs should appear as a single line or a hollow box. The cursor should be a solid green block that pulses (not blinks) at a 1s interval. 
- **Banners (System HUD):** Banners should span the full width of their container and feature a diagonal-stripe "hazard" pattern on the left edge.
- **Micro-interactions:** On hover, elements should slightly increase in brightness or trigger a subtle jitter effect. Transitions between states should be 100ms or 0ms—"instantaneous" is the goal.
- **Progress Bars:** Segmented into discrete blocks rather than a smooth continuous fill, mimicking 8-bit or 16-bit loading indicators.