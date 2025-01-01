'use client'

import { Grid, Paper, Button, NumberInput, Radio, Group } from '@mantine/core'
import { useState } from 'react'
import Image from 'next/image'
import packetService from '@/services/packet/packet.service'
import { Packet } from '@/types/packet'
import { useAuth } from '@/hooks/useAuth'
import useSWR from 'swr'
import walletService from '@/services/wallet/wallet.service'
import NavigateToMomo from '@/components/checkout/navigateToMomo'
import { Success } from '@/services/checkout/checkout.service'
import toast from 'react-hot-toast'
import configService from '@/services/config/config.service'
import { ConfigType } from '@/types/config'

export default function PacketPage() {
  const [topupMethod, setTopupMethod] = useState<'package' | 'custom'>('package')
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [customAmount, setCustomAmount] = useState<number>()
  const [packets, setPackets] = useState<Packet[]>([])
  const [payUrl, setPayUrl] = useState<string>('')
  const { user } = useAuth()
  const [configs, setConfigs] = useState<ConfigType>()
  useSWR(user ? '/api/packet/get-packet-client' : null, packetService.getPackets, {
    onSuccess: (data) => {
      setPackets(data)
    },
  })

  useSWR(user ? '/api/configs' : null, configService.getConfig, {
    onSuccess: (data) => {
      setConfigs(data)
    },
  })

  const handleTopup = async (packetId: string) => {
    if (!selectedPackage) return

    await walletService.checkoutMomoPacket(
      packetId,
      (res: Success) => {
        if (res) {
          toast.success('Đã tạo yêu cầu thanh toán')
          setPayUrl(res.response.payUrl)
        }
      },
      () => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
      },
    )
  }

  const handleTopupCustom = async () => {
    if (!customAmount) return

    await walletService.checkoutMomo(
      customAmount,
      (res: Success) => {
        if (res) {
          toast.success('Đã tạo yêu cầu thanh toán')
          setPayUrl(res.response.payUrl)
        }
      },
      () => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau!')
      },
    )
  }

  if (!packets || !configs) return null

  return (
    <>
      <NavigateToMomo payUrl={payUrl} setPayUrl={setPayUrl} />
      <div className="mt-36 container mx-auto px-4 md:px-24">
        <div className="w-full h-full bg-white/50 backdrop-blur-sm shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Nạp kim cương</h1>

          <Radio.Group
            value={topupMethod}
            onChange={(value) => {
              const topupValue = value as 'package' | 'custom'
              setTopupMethod(topupValue)
              setSelectedPackage('')
              setCustomAmount(0)
            }}
            className="mb-6"
            color="green"
          >
            <Group>
              <Radio value="package" label="Nạp theo gói" color="green" />
              <Radio value="custom" label="Nạp số lượng tùy chọn" color="green" />
            </Group>
          </Radio.Group>

          {topupMethod === 'package' ? (
            <>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Gói nạp có sẵn</h2>
                <Grid>
                  {packets.map((pkg) => (
                    <Grid.Col key={pkg._id} span={{ base: 12, md: 4 }}>
                      <Paper
                        onClick={() => setSelectedPackage(pkg._id)}
                        className={`p-4 cursor-pointer transition-all hover:scale-105 
                      ${selectedPackage === pkg._id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
                      >
                        <div className="flex items-center gap-4">
                          <Image src={pkg.image} alt="diamond" width={100} height={100} />
                          <div>
                            <p className="text-xl font-bold">
                              {pkg.price / configs?.valueToPoint + pkg.promotionPoint} Kim cương
                            </p>
                            <span className="text-green-500 text-md">chỉ với {pkg.price.toLocaleString()}đ</span>
                          </div>
                        </div>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
              <Radio.Group defaultValue="">
                <Radio
                  size="lg"
                  value=""
                  style={{
                    marginTop: '1rem',
                  }}
                  label={
                    <div className="flex flex-row items-center gap-3 ">
                      <Image src="/misc/momo-icon.svg" alt="momo" width={30} height={30} loading="lazy" quality={70} />
                      <p className="text-lg font-semibold">
                        Cổng thanh toán điện tử MOMO (QR code, Visa, Mastercard, JCB)
                      </p>
                    </div>
                  }
                  color="green"
                />
              </Radio.Group>

              <Button
                onClick={() => handleTopup(selectedPackage)}
                size="lg"
                color="green"
                className="mt-8"
                disabled={!selectedPackage && !customAmount}
                fullWidth
              >
                Nạp ngay
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Nạp số lượng tùy chọn</h2>
                <NumberInput
                  value={customAmount}
                  onChange={(value) => setCustomAmount(Number(value))}
                  min={1}
                  max={5000}
                  step={1}
                  label="Số lượng kim cương"
                  placeholder="Nhập số lượng kim cương"
                  className="max-w-md"
                />
                <p className="text-black">
                  Số tiền cần thanh toán: {((customAmount || 0) * configs.valueToPoint).toLocaleString()}đ
                </p>
              </div>
              <Radio.Group defaultValue="">
                <Radio
                  size="lg"
                  value=""
                  style={{
                    marginTop: '1rem',
                  }}
                  label={
                    <div className="flex flex-row items-center gap-3">
                      <Image src="/misc/momo-icon.svg" alt="momo" width={30} height={30} loading="lazy" quality={70} />
                      <p className="text-lg font-semibold">
                        Cổng thanh toán điện tử MOMO (QR code, Visa, Mastercard, JCB)
                      </p>
                    </div>
                  }
                  color="green"
                />
              </Radio.Group>
              <Button
                onClick={handleTopupCustom}
                size="lg"
                color="green"
                className="mt-8"
                disabled={!selectedPackage && !customAmount}
                fullWidth
              >
                Nạp ngay
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
