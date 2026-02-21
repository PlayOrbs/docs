import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PlayOrbs',
  tagline: 'Decentralized Battle Royale powered by Solana & ICP',
  favicon: 'img/favicon.svg',

  url: 'https://docs.playorbs.com',
  baseUrl: '/',

  organizationName: 'playorbs',
  projectName: 'playorbs-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'PlayOrbs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://playorbs.com',
          label: 'Play Game',
          position: 'right',
        },
        {
          href: 'https://github.com/playorbs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/gameplay/getting-started',
            },
            {
              label: 'Tokenomics',
              to: '/tokenomics/orb-token',
            },
            {
              label: 'Technical',
              to: '/technical/architecture-overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/Wh6NErMs',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/playorbs',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/PlayOrbs',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms and Conditions',
              href: 'https://docs.playorbs.com/legal/terms',
            },
            {
              label: 'Privacy Policy',
              href: 'https://docs.playorbs.com/legal/privacy_policy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PlayOrbs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['rust', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
