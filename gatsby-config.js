module.exports = {
  siteMetadata: {
    title: 'Alex Guo',
    description: 'Something something personal website',
    keywords: 'go away',
    // TODO: move this to its own json -> https://www.gatsbyjs.org/docs/gatsby-config/
    // instagram's api sucks
    homePageImages: ['https://scontent.cdninstagram.com/vp/44fd17addb6561e2c8a56ee601124cf4/5B64E562/t51.2885-15/s640x640/sh0.08/e35/30085039_191670584891858_6860611077357436928_n.jpg',
  'https://scontent.cdninstagram.com/vp/918b53a3775ce823c585446c3f814ce0/5B93852E/t51.2885-15/s640x640/sh0.08/e35/29417445_1897862316911213_8244120820511670272_n.jpg',
  'https://scontent.cdninstagram.com/vp/bda881a133f7dca49df2fe4ecb19695f/5B77E9CB/t51.2885-15/s640x640/sh0.08/e35/29414936_178261659475492_862056896163479552_n.jpg',
  'https://scontent.cdninstagram.com/vp/6c2491831b2e061bc3c1986e43bf0ce5/5B5DFF0F/t51.2885-15/s640x640/sh0.08/e35/23421152_1734236826588099_9105779753595437056_n.jpg',
  'https://scontent.cdninstagram.com/vp/e3c170046e652991af6f722581c1531f/5B981BF6/t51.2885-15/s640x640/sh0.08/e35/22352233_165949637320916_5602972381673947136_n.jpg',
  'https://scontent.cdninstagram.com/vp/8f3ba1b36909257f26f404a34732b42c/5B5B68CC/t51.2885-15/sh0.08/e35/p640x640/20394467_1485223091563490_6857747343488319488_n.jpg',
  'https://scontent.cdninstagram.com/vp/d052e3e5d3de389fc5f5bead7f72cfa9/5B93BCF4/t51.2885-15/s640x640/sh0.08/e35/20065298_1957490181161850_6213564392970125312_n.jpg',
  'https://scontent.cdninstagram.com/vp/c33407234db744f73ea1b251404c3472/5B60EB72/t51.2885-15/s640x640/sh0.08/e35/19932830_1984687598434389_7111357177972916224_n.jpg',
  'https://scontent.cdninstagram.com/vp/9d31d8d82f536277310a23e449f84082/5B619D85/t51.2885-15/s640x640/sh0.08/e35/19761824_1743496222614108_6343685284810457088_n.jpg',
  'https://scontent.cdninstagram.com/vp/29fd670005ab1fe6cd5d1b72605947c4/5B5D1897/t51.2885-15/s640x640/sh0.08/e35/18812204_132473783973419_8123768664282365952_n.jpg',
  'https://scontent.cdninstagram.com/vp/ac2002504e1ceb05aa37a44518fcee3e/5B6547BC/t51.2885-15/s640x640/sh0.08/e35/18513160_1194041570724936_6812495344719364096_n.jpg',
  'https://scontent.cdninstagram.com/vp/71f9bf902b3adc29f075000cfafd3031/5B910789/t51.2885-15/s640x640/sh0.08/e35/18512340_1332230263535609_1754710735616737280_n.jpg',
  'https://scontent.cdninstagram.com/vp/c2fc14624574b69313c12ecfbfa70e84/5B7A811D/t51.2885-15/s640x640/sh0.08/e35/18161497_1996313567268657_321189551454289920_n.jpg',
  'https://scontent.cdninstagram.com/vp/13615765c009df5924b9978f768ae721/5B7FA5D7/t51.2885-15/sh0.08/e35/p640x640/17881679_414881618870000_2201786452826652672_n.jpg',
  'https://scontent.cdninstagram.com/vp/34962c2a0d146714e333f2441f1515ea/5B7945C5/t51.2885-15/s640x640/sh0.08/e35/17882284_617195161820840_5306745343352766464_n.jpg',
  'https://scontent.cdninstagram.com/vp/966574945a8f071afef9e9f9cdfd9206/5B7C71BE/t51.2885-15/s640x640/sh0.08/e35/17818679_804983309665635_6674705994930454528_n.jpg',
  'https://scontent.cdninstagram.com/vp/006a869842802257fd8f9341f0f7e8cf/5B5FC8E5/t51.2885-15/s640x640/sh0.08/e35/17818174_1903153996567104_4057734940614197248_n.jpg',
  'https://scontent.cdninstagram.com/vp/b72ca9513b7171674e8d91636f8f7770/5B6274EC/t51.2885-15/e35/16583793_398820733805041_3561252750014545920_n.jpg',
  'https://scontent.cdninstagram.com/vp/74dc4e9d92762c523f4845959d6fc5a7/5B928ED1/t51.2885-15/s640x640/sh0.08/e35/16230583_1725109721135582_6426097460883488768_n.jpg',
  'https://scontent.cdninstagram.com/vp/e1ae46aac744e40df7fb464919127767/5BB5E223/t51.2885-15/s640x640/sh0.08/e35/33192132_162202724624742_6385181167175335936_n.jpg']
  },

  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/staticData`,
    //     name: `staticData`,
    //   },
    // },
  ],
}
