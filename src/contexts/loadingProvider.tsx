import React, { ReactNode } from 'react'
import { LoadingContext } from './loadingContext'
import LoadingOverlay from 'src/components/Loading'

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = React.useState(false)

  const startLoading = () => setLoading(true)
  const endLoading = () => setLoading(false)

  const value = { isLoading, startLoading, endLoading }

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  )
}
