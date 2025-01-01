const BASE_URL = process.env.NEXT_PUBLIC_API_VIETNAM_PROVINCE

const provinceService = {
  getAllProvinces: async () => {
    const res = await fetch(`${BASE_URL}/api/p`)
    return res.json()
  },

  getProvinceById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/p/${id}?depth=2`)
    return res.json()
  },

  getDistrictsByDistrictId: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/d/${id}?depth=2`)
    return res.json()
  },
}

export default provinceService
