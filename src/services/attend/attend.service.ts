import axiosClient from '@/lib/axios'
import { Attendance } from '@/types/attend'

const attendService = {
  getAttend: async (): Promise<Attendance> => {
    const res: Attendance = await axiosClient.get('/api/attendance/get-attendance')

    return res
  },

  updateAttend: async (
    isAttendance: boolean,
    successCallback?: (res: any) => void,
    errorCallback?: (error: any) => void,
  ) => {
    try {
      return await axiosClient
        .post('/api/attendance', { isAttendance })
        .then((res) => successCallback && successCallback(res))
    } catch (error: any) {
      if (error) {
        if (errorCallback) errorCallback(error.response.data.message)
      }
    }
  },
}

export default attendService
