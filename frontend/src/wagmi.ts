import { http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'REChain',
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getDefaultConfig>
  }
}
