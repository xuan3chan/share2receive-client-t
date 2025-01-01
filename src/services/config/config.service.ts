import axiosClient from '@/lib/axios'
import { ConfigType } from '@/types/config'

const configService = {
  getConfig: async (): Promise<ConfigType> => axiosClient.get('/api/configs'),
}

export default configService
