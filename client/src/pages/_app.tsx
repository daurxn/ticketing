import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import { User } from '@/lib/types'

type AppOwnProps = { currentUser: null | User }

const AppComponent = ({
  Component,
  pageProps,
  currentUser,
}: AppProps & AppOwnProps) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  )
}

AppComponent.getInitialProps = async (
  appContext: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    ...data,
  }
}

export default AppComponent
