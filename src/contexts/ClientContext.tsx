'use client'
import { Category, Brand } from '@/types/clientypes'
import { createContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import categoryService from '@/services/category/category.service'
import brandService from '@/services/brand/brand.service'
import { useCategory } from '@/zustand/category'
import { Product } from '@/types/users/productTypes'
import productService from '@/services/product/product.service'
import { useNotificationStore } from '@/zustand/notification'
import notificationService from '@/services/notification/notification.service'
import { useAuth } from '@/hooks/useAuth'
import exChangeService from '@/services/exchange/exchange.service'
import { useExchange } from '@/zustand/exchange'
import messageService from '@/services/message/message.service'
import { useUserAction } from '@/zustand/user'
import { useMediaQuery } from '@mantine/hooks'
import attendService from '@/services/attend/attend.service'
import { useAttend } from '@/zustand/attend'
import { useWalletStore } from '@/zustand/wallet'
import walletService from '@/services/wallet/wallet.service'
import { ConfigType } from '@/types/config'
import configService from '@/services/config/config.service'

type ClientValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  categories: Category[] | null
  setCates: (value: Category[] | null) => void
  brands: Brand[] | null
  setBrands: (value: Brand[] | null) => void
  productsUser: Product[] | null
  isMobile: boolean | undefined
  config: ConfigType | null
  setConfig: (value: ConfigType | null) => void
}

const defaultProvider: ClientValuesType = {
  loading: false,
  setLoading: () => Boolean,
  categories: null,
  setCates: () => null,
  brands: null,
  setBrands: () => null,
  productsUser: null,
  isMobile: false,
  config: null,
  setConfig: () => null,
}

const ClientContext = createContext(defaultProvider)

type Props = {
  children: React.ReactNode
}

const ClientProvider = ({ children }: Props) => {
  const [categories, setCates] = useState<Category[] | null>(defaultProvider.categories)
  const [brands, setBrands] = useState<Brand[] | null>(defaultProvider.brands)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [config, setConfig] = useState<ConfigType | null>(defaultProvider.config)
  const [productsUser, setProductsUser] = useState<Product[] | null>(defaultProvider.productsUser)
  const { setCategories } = useCategory()
  const { setNotifications } = useNotificationStore()
  const { setListExchangeRev } = useExchange()
  const { setAttendances } = useAttend()
  const { setRooms } = useUserAction()
  const { setWallet } = useWalletStore()
  const { user } = useAuth()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useSWR('/api/category/list-category-client', categoryService.gellClientCategories, {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setCates(data)
      setCategories(data)
      setLoading(false)
    },
  })

  useSWR(user ? '/api/messages/get-room' : null, messageService.getRooms, {
    onSuccess: (data) => {
      setRooms(data)
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
  })

  useSWR('/api/config/get-config', configService.getConfig, {
    onSuccess: (data) => {
      setConfig(data)
    },
  })

  useSWR('/api/brand/list-brand-client', brandService.getBrands, {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setBrands(data)
      setLoading(false)
    },
  })

  useSWR(user ? 'productsUser' : null, () => productService.getAllProductUser(1, 999, '', '', ''), {
    onLoadingSlow: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setProductsUser(data?.data)
      setLoading(false)
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    dedupingInterval: 10000,
    errorRetryCount: 3,
  })

  useEffect(() => {
    if (user) {
      notificationService.getNotifications().then((data) => {
        setNotifications(data)
      })
      exChangeService.getAll(1, 10, '', 'receiver').then((data) => {
        setListExchangeRev(data?.data)
      })
      messageService.getRooms().then((data) => {
        setRooms(data)
      })
      attendService.getAttend().then((data) => {
        setAttendances(data.data.attendances)
      })
      walletService.getWallet().then((data) => {
        setWallet(data)
      })
    }
  }, [user, setNotifications, setListExchangeRev, setRooms, setAttendances, setWallet])

  const value = {
    loading,
    setLoading,
    categories,
    setCates,
    brands,
    setBrands,
    productsUser,
    setProductsUser,
    isMobile,
    config,
    setConfig,
  }

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
}

export { ClientContext, ClientProvider }
