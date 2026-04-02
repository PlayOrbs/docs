import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'intro/one-pager',
        'intro/index',
        'intro/how-it-works',
        'intro/key-features',
      ],
    },
    {
      type: 'category',
      label: 'Gameplay',
      items: [
        'gameplay/getting-started',
        'gameplay/round-mechanics',
        'gameplay/tier-system',
        'gameplay/take-profit',
        'gameplay/seasons',
        'gameplay/skills-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Earning',
      items: [
        'earning/points-system',
        'earning/porb-emissions',
        'earning/leaderboards',
        'earning/referral-program',
        'earning/achievements',
      ],
    },
    {
      type: 'category',
      label: 'Tokenomics',
      items: [
        'tokenomics/orb-token',
        'tokenomics/supply-mechanics',
        'tokenomics/genesis-bootstrap',
        'tokenomics/epoch-decay',
        'tokenomics/liquidity-management',
        'tokenomics/economic-sustainability',
      ],
    },
    {
      type: 'category',
      label: 'Technical',
      items: [
        'technical/architecture-overview',
        'technical/account-structures',
        'technical/instruction-reference',
        'technical/settlement-flow',
        'technical/round-verification',
        'technical/security-model',
      ],
    },
    {
      type: 'category',
      label: 'Randomness',
      items: [
        'randomness/overview',
        'randomness/icp-integration',
        'randomness/seed-generation',
        'randomness/verification',
        'randomness/sequential-revelation',
      ],
    },
    {
      type: 'category',
      label: 'Physics Engine',
      items: [
        'physics/engine-overview',
        'physics/boundary-system',
        'physics/gravity-system',
        'physics/collision-physics',
        'physics/tether-system',
        'physics/sudden-death',
        'physics/parameter-reference',
      ],
    },
    {
      type: 'category',
      label: 'Economics',
      items: [
        'economics/fee-distribution',
        'economics/payout-mechanics',
        'economics/kill-rewards',
        'economics/bounty-inheritance',
        'economics/tie-breaking',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'SDK',
    //   items: [
    //     'sdk/join-round',
    //   ],
    // },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/glossary',
        'reference/constants',
        'reference/mathematical-proofs',
        'reference/diagrams',
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      items: [
        'legal/terms',
        'legal/privacy_policy',
      ],
    },
  ],
};

export default sidebars;
