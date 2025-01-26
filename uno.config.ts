import {
  defineConfig,

  // presets
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,

  // transformers
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    pack: 'flex items-center justify-center',
    vpack: 'flex flex-col items-center justify-center',
    hbox: 'flex flex-row',
    vbox: 'flex flex-col',
    btn: 'disabled:opacity-75 select-none rounded px-4 h-10 bg-dark-4 hover:bg-dark-1 active:bg-dark-9 text-light font-bold border-none outline-none transition flex flex-row items-center justify-center gap-2',
    input: 'select-none rounded px-4 h-10 bg-light-7 border-none outline-none transition flex flex-row items-center justify-center gap-2',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        sans: 'Pretendard:300,400,500,600,700,800,900',
      },
    }),
    presetTypography(),
    presetIcons(),
    presetTagify(),
  ],
  transformers: [
    transformerAttributifyJsx(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {},
  preflights: [
    {
      getCSS: () => {
        return `
                  html {
                      scroll-behavior: smooth;
                      height: 100%;
                  }
              `
      },
    },
  ],
})
