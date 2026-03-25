'use client'

import { createContext, useContext, ReactNode } from 'react'
import { contentD, CHECKOUT_URL } from './content-d'

export type ContentType = typeof contentD

const ContentContext = createContext<ContentType>(contentD)
const CheckoutContext = createContext<string>(CHECKOUT_URL)

export const useContent = () => useContext(ContentContext)
export const useCheckoutUrl = () => useContext(CheckoutContext)

export function VariantProvider({
  content,
  checkoutUrl = CHECKOUT_URL,
  children,
}: {
  content: ContentType
  checkoutUrl?: string
  children: ReactNode
}) {
  return (
    <ContentContext.Provider value={content}>
      <CheckoutContext.Provider value={checkoutUrl}>
        {children}
      </CheckoutContext.Provider>
    </ContentContext.Provider>
  )
}
