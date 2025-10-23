import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pocketblue",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: "Fedora Atomic images for mobile devices",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Devices', link: '/devices' },
      { text: 'Contributing', link: '/etc/contributing' },
    ],

    sidebar: [
      {
        text: 'Installation guides',
        items: [
          { text: 'Xiaomi Pad 5', link: 'install/xiaomi-nabu.md' },
          { text: 'Xiaomi Pad 6', link: 'install/xiaomi-pipa.md' },
          { text: 'Oneplus 6/6T', link: 'install/oneplus-sdm845.md' },
        ]
      },
      {
        text: 'Using Fedora Atomic',
        items: [
          { text: 'Using toolbox', link: '/etc/toolbox.md' },
          { text: 'Installing package', link: '/etc/installing-packages.md' },
          {
            text: 'Firefox mobile config',
            link: 'https://github.com/pocketblue/pocketblue.github.io'
          },
        ]
      },
      {
        text: 'Contributing',
        link: '/etc/contributing.md',
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pocketblue/pocketblue' }
    ]
  }
})
