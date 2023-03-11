import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme/AppTheme'

export const QuoterApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter/>
      </AppTheme>
    </>
  )
}
