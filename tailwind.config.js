import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  theme: {
    extend: {
      colors: {
        'lewind-primary': 'rose_dark',
        'lewind-secondary': 'rose_red',

        'wind': {
          0: '#9700ff',
          2: '#6400ff',
          4: '#3200ff',
          6: '#0032ff',
          8: '#0064ff',
          10: '#0096ff',
          12: '#00c7ff',
          14: '#00e6f0',
          16: '#25c192',
          18: '#11d411',
          20: '#00e600',
          22: '#00fa00',
          24: '#b8ff61',
          26: '#fffe00',
          28: '#ffe100',
          30: '#ffc800',
          32: '#ffaf00',
          34: '#ff9600',
          36: '#e67d00',
          38: '#e66400',
          40: '#dc4a1d',
          42: '#c8321d',
          44: '#b4191d',
          46: '#aa001d',
          48: '#b40032',
          50: '#c80064',
          52: '#fe0096',
        },
  
        'rose_dark': '#1C2834',
        'rose_semi_dark': '#2d4053',
        'rose_light': '#96A2AE',
        'rose_very_light': '#c5ccd3',
        'rose_red': '#C80000',
        'rose_dark_red': '#730000',
      },
      "fontFamily": {
        "sans": [
          'Andika',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "\"Helvetica Neue\"",
          "Arial",
          "\"Noto Sans\"",
          "sans-serif",
          "\"Apple Color Emoji\"",
          "\"Segoe UI Emoji\"",
          "\"Segoe UI Symbol\"",
          "\"Noto Color Emoji\""
        ],
        "serif": [
          'Andika',
          "ui-serif",
          "Georgia",
          "Cambria",
          "\"Times New Roman\"",
          "Times",
          "serif"
        ],
        "mono": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "\"Liberation Mono\"",
          "\"Courier New\"",
          "monospace"
        ]
      },
      backgroundImage : {
        'rose' : 'url("~/assets/images/compass_outside.png")'
      }
    }
  }
}
