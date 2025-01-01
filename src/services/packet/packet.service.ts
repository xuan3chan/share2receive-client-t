import axiosClient from '@/lib/axios'
import { Packet } from '@/types/packet'

const packetService = {
  getPackets: async (): Promise<Packet[]> => axiosClient.get('/api/packet/get-packet-client'),
}

export default packetService
