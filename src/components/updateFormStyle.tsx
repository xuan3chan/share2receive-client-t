'use client'
import { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Radio } from 'antd'
import { Modal, Stepper, Group } from '@mantine/core'
import { zodiacData } from '@/metadata/zodiacData'
import { clothingStylesData } from '@/metadata/styleData'
import { colorData } from '@/metadata/colorData'
import { materialData } from '@/metadata/materialData'
import { sizes, hobbies } from '@/metadata/sizeData'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useUserStyle } from '@/zustand/userStyle'
import { useMediaQuery } from '@mantine/hooks'

export const UpdateFormStyle = () => {
  const isDesktop = useMediaQuery('(min-width: 62em)')
  const { user, getProfile } = useAuth()
  const [activeStep, setActiveStep] = useState(0)
  const [form] = Form.useForm()
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const { toogleUpdateFormStyle, openUpdateFormStyle } = useUserStyle()
  const onClose = () => {
    toogleUpdateFormStyle()
    setActiveStep(0)
  }

  const handleZodiacSelect = (value: string) => {
    setSelectedZodiac(value)
  }

  const handleColorSelect = (checkedValues: string[]) => {
    setSelectedColors(checkedValues)
    form.setFieldsValue({ color: checkedValues }) // Cập nhật giá trị màu vào form
  }

  const handleResetColors = () => {
    setSelectedColors([]) // Reset lại lựa chọn màu sắc
    form.setFieldsValue({ color: [] }) // Clear the form field for colors
  }

  const onFinishStep1 = () => {
    form
      .validateFields(['age', 'zodiacSign', 'style'])
      .then(() => {
        setActiveStep(1)
      })
      .catch((info) => {
        console.log('Validation failed:', info)
      })
  }

  const onFinishStep2 = () => {
    // Validate fields for Step 2 (color and material), then move to the next step without sending a request
    form
      .validateFields(['color', 'material'])
      .then(() => {
        setActiveStep(2) // Go to Step 3
      })
      .catch((info) => {
        console.log('Validation failed:', info)
      })
  }

  const prevStep = () => {
    setActiveStep((current) => current - 1)
  }

  useEffect(() => {
    if (user?.userStyle) {
      form.setFieldsValue({
        age: user.userStyle.age || '',
        zodiacSign: user.userStyle.zodiacSign || '',
        style: user.userStyle.style || [],
        color: user.userStyle.color || [], // setting initial colors
        material: user.userStyle.material || [],
        size: user.userStyle.size || [],
        hobby: user.userStyle.hobby || [],
      })

      // Set the selected colors when userStyle is loaded
      setSelectedColors(user.userStyle.color || [])
      setSelectedZodiac(user.userStyle.zodiacSign || null)
    }
  }, [user?.userStyle])

  const onFinishSurvey = () => {
    // Trigger form submission only when all steps are complete (i.e., Step 3 is finished)
    form.validateFields().then(() => {
      try {
        userService
          .updateStyle(form.getFieldsValue(['age', 'zodiacSign', 'style', 'color', 'material', 'size', 'hobby']))
          .then(() => {
            toast.success('Cập nhật phong cách thành công!')
            getProfile() // Refresh user profile data
            toogleUpdateFormStyle() // Close the modal after success
            setActiveStep(0) // Reset the stepper to the first step
          })
          .catch((error) => {
            console.log('Error updating user style:', error)
            toast.error('Cập nhật phong cách thất bại!')
          })
      } catch (error) {
        console.log('Error updating user style:', error)
      }
    })
  }

  return (
    <>
      <Modal.Root
        opened={openUpdateFormStyle}
        onClose={onClose}
        centered
        size={isDesktop ? '90%' : '100%'}
        className="w-full"
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="py-0">
            <Modal.Title></Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Header className="w-full block pt-0">
            <Modal.Title>
              <div className="text-xl md:text-3xl w-full font-semibold text-green-900 flex flex-col justify-center items-center text-center">
                <h1 className="uppercase">Hãy cho chúng tôi biết sở thích của bạn.</h1>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-2 md:px-4">
            <Form form={form} name="form" layout="vertical" initialValues={{ age: '', email: '', color: [] }}>
              <Stepper
                active={activeStep}
                onStepClick={setActiveStep}
                allowNextStepsSelect={false}
                size={isDesktop ? 'lg' : 'sm'}
              >
                <Stepper.Step
                  label={isDesktop ? 'Tìm hiểu vể bạn' : ''}
                  description={isDesktop ? 'Một số thông tin cơ bản' : ''}
                >
                  <Form.Item
                    label="Độ tuổi của bạn"
                    name="age"
                    rules={[{ required: true, message: 'Vui lòng chọn 1 độ tuổi!' }]}
                  >
                    <Radio.Group className="radio-custom display-flex">
                      <Radio className="w-[100px] h-[40px]" value="16-20">
                        <p className="text-xs md:text-black">16-20</p>
                      </Radio>
                      <Radio className="w-[100px] h-[40px]" value="20-25">
                        <p className="text-xs md:text-black">20-25</p>
                      </Radio>
                      <Radio className="w-[100px] h-[40px]" value="25-30">
                        <p className="text-xs md:text-black">25-30</p>
                      </Radio>
                      <Radio className="w-[100px] h-[40px]" value="30-35">
                        <p className="text-xs md:text-black">30-35</p>
                      </Radio>
                      <Radio className="w-[100px] h-[40px]" value="35+">
                        <p className="text-xs md:text-black">35+</p>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Cung hoàng đạo của bạn"
                    name="zodiacSign"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn cung hoàng đạo!',
                      },
                    ]}
                  >
                    <Radio.Group
                      className="radio-custom display-grid grid-flow-row-dense grid-cols-2 md:grid-cols-6 gap-2"
                      value={selectedZodiac}
                      onChange={(e) => handleZodiacSelect(e.target.value)}
                    >
                      {zodiacData.map((zodiac) => (
                        <Radio
                          key={zodiac.value}
                          className={`w-full min-w-[150px] h-[40px] text-xs md:text-black ${selectedZodiac && selectedZodiac !== zodiac.value ? 'faded' : ''}`}
                          value={zodiac.value}
                          style={{ backgroundColor: `${zodiac.color}4D` }}
                        >
                          <div className="flex">
                            {zodiac.icon}
                            <p className="ml-1 text-xs md:text-black">{zodiac.name}</p>
                          </div>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Phong cách thời trang của bạn"
                    name="style"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn phong cách thời trang!',
                      },
                    ]}
                  >
                    <Checkbox.Group className="checkbox-custom checkbox-material display-flex flex-wrap gap-2">
                      {clothingStylesData.map((style) => (
                        <Checkbox key={style.value} value={style.value} className="card-checkbox">
                          <div className="">
                            <div className="w-full">
                              <p className="text-black">{style.name}</p>
                            </div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                  <Group justify="end" mt="lg">
                    <Button size={isDesktop ? 'large' : 'middle'} type="primary" onClick={onFinishStep1}>
                      Tiếp tục
                    </Button>
                  </Group>
                </Stepper.Step>

                <Stepper.Step
                  label={isDesktop ? 'Chất liệu và màu sắc' : ''}
                  description={isDesktop ? 'Chọn các sở thích cá nhân của bạn' : ''}
                >
                  <Form.Item
                    label="Màu cơ bản mà bạn yêu thích"
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất 1 màu cơ bản!',
                      },
                    ]}
                  >
                    <Button variant="text" className="border-none mb-3" onClick={handleResetColors}>
                      Làm mới
                    </Button>
                    <Checkbox.Group
                      className="checkbox-custom display-grid grid-flow-row-dense md:grid-cols-7 grid-cols-2 gap-4"
                      value={selectedColors}
                      onChange={handleColorSelect}
                    >
                      {colorData.map((color) => (
                        <Checkbox key={color.value} value={color.value} className="card-checkbox">
                          <div className="card-content flex items-center">
                            <div className="w-1/2 ml-1">
                              <p className="text-black">{color.name}</p>
                            </div>
                            <div
                              className="w-1/2 h-full shadow-sm rounded-l-md"
                              style={{
                                backgroundColor: `${color.color}CC`,
                              }}
                            ></div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    label="Chọn những chất liệu ưa thích"
                    name="material"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất 1 chất liệu ưa thích!',
                      },
                    ]}
                  >
                    <Checkbox.Group className="checkbox-custom checkbox-material display-flex flex-wrap gap-2">
                      {materialData.map((material) => (
                        <Checkbox key={material.value} value={material.value} className="card-checkbox">
                          <div className="">
                            <div className="w-full">
                              <p className="text-black">{material.name}</p>
                            </div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>

                  <Group justify="end" mt="md">
                    <Button size="large" type="default" onClick={prevStep}>
                      Quay lại
                    </Button>
                    <Button size="large" type="primary" onClick={onFinishStep2}>
                      Tiếp tục
                    </Button>
                  </Group>
                </Stepper.Step>

                <Stepper.Step
                  label={isDesktop ? 'Kích thước và sở thích' : ''}
                  description={isDesktop ? 'Chọn các sở thích cá nhân của bạn' : ''}
                >
                  <Form.Item
                    label="Chọn các kích thước của bạn"
                    name="size"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất 1 kích thước!',
                      },
                    ]}
                  >
                    <Checkbox.Group className="checkbox-custom checkbox-material display-flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <Checkbox key={size.id} value={size.value} className="card-checkbox">
                          <div className="">
                            <div className="w-full">
                              <p className="text-black mx-3">{size.name}</p>
                            </div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    label="Chọn các sở thích của bạn"
                    name="hobby"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất 1 sở thích!',
                      },
                    ]}
                  >
                    <Checkbox.Group className="checkbox-custom checkbox-material display-flex flex-wrap gap-2">
                      {hobbies.map((hobby) => (
                        <Checkbox key={hobby.id} value={hobby.value} className="card-checkbox">
                          <div className="">
                            <div className="w-full">
                              <p className="text-black">{hobby.name}</p>
                            </div>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                  <Group justify="end" mt="md">
                    <Button size="large" type="default" onClick={prevStep}>
                      Quay lại
                    </Button>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit" // Bắt đầu submit form
                      onClick={onFinishSurvey}
                    >
                      Hoàn thành
                    </Button>
                  </Group>
                </Stepper.Step>
              </Stepper>
            </Form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
