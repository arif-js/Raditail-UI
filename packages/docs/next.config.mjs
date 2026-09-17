import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx$/,
})

const config = {
  experimental: {
    typedRoutes: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['raditail'],
}

export default withMDX(config)
