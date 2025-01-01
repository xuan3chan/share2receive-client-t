'use client'

import { useAttend } from '@/zustand/attend'
import { motion, AnimatePresence } from 'framer-motion'
import IconifyIcon from '../icons'
import { ActionIcon, Button, Badge, Text } from '@mantine/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import attendService from '@/services/attend/attend.service'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import configService from '@/services/config/config.service'
import { ConfigType } from '@/types/config'

// Setup dayjs plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Ho_Chi_Minh')

export default function AttendCalendar() {
  const { toggleAttendModal, openAttendModal, attendances, setAttendances } = useAttend()
  const [claimedRewards, setClaimedRewards] = useState<string[]>([])
  const [config, setConfig] = useState<ConfigType>()
  useEffect(() => {
    configService.getConfig().then((res) => {
      setConfig(res)
    })
  }, [])

  const getCurrentDate = () => {
    return dayjs().tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD')
  }

  const getAttendanceStatus = (date: string, isAttendance: boolean) => {
    const currentDate = getCurrentDate()
    const attendanceDate = dayjs(date).format('YYYY/MM/DD')

    if (isAttendance) {
      return 'claimed' // If already attended, show as claimed regardless of date
    }

    if (dayjs(attendanceDate).isBefore(currentDate)) {
      return 'expired'
    }
    if (attendanceDate === currentDate) {
      return 'available'
    }
    return 'future'
  }

  const getButtonProps = (status: string) => {
    switch (status) {
      case 'expired':
        return {
          disabled: true,
          variant: 'light',
          children: 'Quá hạn',
          color: 'gray',
        }
      case 'claimed':
        return {
          disabled: true,
          variant: 'light',
          children: 'Đã điểm danh',
          color: 'green',
        }
      case 'available':
        return {
          disabled: false,
          variant: 'gradient',
          gradient: { from: 'indigo', to: 'cyan' },
          children: 'Điểm danh',
        }
      default:
        return {
          disabled: true,
          variant: 'light',
          children: 'Chưa đến ngày',
          color: 'blue',
        }
    }
  }

  const handleClaimReward = (date: string) => {
    if (claimedRewards.includes(date)) return

    attendService.updateAttend(
      true,
      () => {
        toast.success('Điểm danh thành công!')
        attendService.getAttend().then((res) => {
          setAttendances(res.data.attendances)

          // Start confetti animation
          const animationEnd = Date.now() + 2000 // 3 seconds duration
          const runConfetti = () => {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 100,
              origin: { x: 0 },
              zIndex: 9999,
            })
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 100,
              origin: { x: 1 },
              zIndex: 9999,
            })

            if (Date.now() < animationEnd) {
              requestAnimationFrame(runConfetti)
            }
          }

          runConfetti()
          setClaimedRewards([...claimedRewards, date])
        })
      },
      () => {
        toast.error('Điểm danh thất bại!')
      },
    )
  }

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      toggleAttendModal()
    }
  }

  return (
    <AnimatePresence>
      {openAttendModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 w-full h-full z-[400] bg-black/50 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 z-[500] flex items-center justify-center"
          >
            <div
              className="w-[1000px] h-[600px] rounded-2xl overflow-hidden relative bg-gradient-to-br from-purple-600/20 to-blue-500/20 backdrop-blur-xl border border-white/10"
              onClick={handleModalClick}
            >
              <div className="relative w-full h-full p-8">
                <ActionIcon
                  className="absolute top-4 right-4 hover:rotate-90 transition-transform"
                  variant="light"
                  color="white"
                  size="xl"
                  radius="xl"
                  onClick={toggleAttendModal}
                >
                  <IconifyIcon icon="mdi:close" />
                </ActionIcon>

                <h2 className="text-2xl font-bold text-white mb-6">Điểm Danh Hàng Ngày</h2>

                <div className="grid grid-cols-4 gap-6">
                  {attendances.map((attendance, index) => {
                    const status = getAttendanceStatus(attendance.date, attendance.isAttendance)
                    const buttonProps = getButtonProps(status)

                    return (
                      <motion.div
                        key={attendance.date}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group w-[190px]"
                      >
                        <div
                          className="relative bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20 
                          transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                        >
                          <Badge
                            className="absolute -top-2 -right-2 z-10"
                            color={status === 'claimed' ? 'green' : status === 'expired' ? 'gray' : 'blue'}
                          >
                            Ngày {attendance.date}
                          </Badge>

                          <div className="relative">
                            <Image
                              src="/misc/830e247bb0cfffa5c74a04e79c0040f5_8113348980205194944.png"
                              alt={attendance.date}
                              width={600}
                              height={600}
                              quality={100}
                              className="rounded-md mb-2"
                            />

                            <div
                              className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm
                                border border-white/20 flex items-center gap-2"
                            >
                              {/* <IconifyIcon icon="material-symbols:diamond" className="text-blue-400 animate-pulse" /> */}
                              <Image
                                src="/misc/latest.png"
                                alt="point"
                                width={27}
                                height={27}
                                className="animate-pulse"
                              />
                              <Text className="text-white font-semibold">+{config?.valueToPromotion} </Text>
                            </div>
                          </div>

                          <Button
                            fullWidth
                            className="mt-2"
                            style={{
                              fontSize: '14px',
                            }}
                            onClick={() => handleClaimReward(attendance.date)}
                            {...buttonProps}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
