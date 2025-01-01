import { useContext } from 'react'
import { ClientContext } from '@/contexts/ClientContext'

export const useClient = () => useContext(ClientContext)
