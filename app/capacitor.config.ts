import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'fr.journiz.app',
  appName: 'Journiz',
  webDir: 'dist',
  server: {
    iosScheme: 'https',
  },
}
export default config
