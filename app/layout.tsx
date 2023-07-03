import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Promptopia',
  description: 'Promptopia is a place to find writing prompts and share your own.',
  // 180x180 apple touch icon
  favicon: '/favicon.ico',
  icon: '/favicon.ico',
  appleIcon: '/apple-touch-icon.png',
}

const RootLayout = ({ children, pageProps }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
