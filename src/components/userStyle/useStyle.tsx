'use client'

import { Button } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { colorData } from '@/metadata/colorData'
import { zodiacData } from '@/metadata/zodiacData'
import { materialData } from '@/metadata/materialData'
import { clothingStylesData } from '@/metadata/styleData'
import { sizes } from '@/metadata/sizeData'
import { hobbies } from '@/metadata/sizeData'
import { useUserStyle } from '@/zustand/userStyle'
import { UpdateFormStyle } from '@/components/updateFormStyle'
import FormStyleUserNull from '@/components/FormStyle'

const UserStyle = () => {
  const { user } = useAuth()
  const { toogleUpdateFormStyle } = useUserStyle()

  if (!user) {
    return <>Loading...</>
  }

  if (user?.userStyle === null) {
    return (
      <>
        <FormStyleUserNull />
        <div className="container px-10 mx-auto">
          <div className="title text-black text-2xl font-semibold">
            <h2>Phong cách của bạn</h2>
          </div>
          <div className="mt-5 w-full">
            <Button
              size="large"
              type="primary"
              onClick={toogleUpdateFormStyle}
              style={{
                width: '100%',
                height: '50px',
                fontSize: '18px',
              }}
            >
              Cập nhật phong cách!
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <UpdateFormStyle />
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Phong cách của bạn</h2>
        </div>
        <div className="flex justify-end">
          <Button type="primary" onClick={toogleUpdateFormStyle}>
            Cập nhật phong cách
          </Button>
        </div>
        <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
          <div className="container mx-auto p-5">
            <div className="grid grid-flow-row gap-3">
              <div className="card-age">
                <div className="label-age">
                  <p>Độ tuổi:</p>
                </div>
                <div className="grid gap-3 grid-cols-3 md:grid-cols-8">
                  <div
                    className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                    style={{
                      backgroundColor: '#00B96B2d',
                    }}
                  >
                    <p
                      style={{
                        color: '#00B96B',
                      }}
                      className="text-xs md:text-base"
                    >
                      {user?.userStyle.age}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-zodiacSign">
                <div className="label-zodiacSign">
                  <p>Cung hoàng đạo:</p>
                </div>
                <div className="grid gap-3 grid-cols-2 md:grid-cols-8">
                  <div
                    className="h-10 rounded shadow-sm text-white text-center flex items-center justify-center"
                    style={{
                      backgroundColor: `${
                        zodiacData.find((item) => item.value === user?.userStyle.zodiacSign)?.color
                      }4d`,
                      color: zodiacData.find((item) => item.value === user?.userStyle.zodiacSign)?.color,
                    }}
                  >
                    <div className="mr-2">
                      {zodiacData.find((item) => item.value === user?.userStyle.zodiacSign)?.icon}
                    </div>
                    <p className="text-xs md:text-base">
                      {zodiacData.find((item) => item.value === user?.userStyle.zodiacSign)?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-style">
                <div className="label-style">
                  <p>Phong cách ăn mặc:</p>
                </div>
                <div className="grid gap-3 grid-cols-2 md:grid-cols-8">
                  {user?.userStyle.style.map((style, index) => (
                    <div
                      key={index}
                      className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                      style={{
                        backgroundColor: '#00B96B2d',
                      }}
                    >
                      <p
                        style={{
                          color: '#00B96B',
                        }}
                        className="text-xs md:text-base"
                      >
                        {clothingStylesData.find((item) => item.value === style)?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card_color">
                <div className="label-color">
                  <p>Màu sắc yêu thích của bạn:</p>
                </div>
                <div className="grid gap-3 grid-cols-3 md:grid-cols-8">
                  {user?.userStyle.color.map((color, index) => {
                    const backgroundColor = colorData.find((item) => item.value === color)?.color

                    return (
                      <div
                        key={index}
                        className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                        style={{
                          backgroundColor: `${backgroundColor}3d`,
                          border: `1px solid`,
                        }}
                      >
                        <p
                          style={{
                            color: 'black',
                          }}
                          className="text-xs md:text-base"
                        >
                          {colorData.find((item) => item.value === color)?.name}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-material">
                <div className="label-material">
                  <p>Chất liệu ưa thích:</p>
                </div>
                <div className="grid gap-3 grid-cols-3 md:grid-cols-8">
                  {user?.userStyle.material.map((material, index) => (
                    <div
                      key={index}
                      className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                      style={{
                        backgroundColor: '#00B96B2d',
                      }}
                    >
                      <p
                        style={{
                          color: '#00B96B',
                        }}
                        className="text-xs md:text-base"
                      >
                        {materialData.find((item) => item.value === material)?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-size">
                <div className="label-size">
                  <p>Kích thước:</p>
                </div>
                <div className="grid gap-3 grid-cols-3 md:grid-cols-10">
                  {user?.userStyle.size.map((size, index) => (
                    <div
                      key={index}
                      className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                      style={{
                        backgroundColor: '#00B96B2d',
                      }}
                    >
                      <p
                        style={{
                          color: '#00B96B',
                        }}
                        className="text-xs md:text-base"
                      >
                        {sizes.find((item) => item.value === size)?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-hobby">
                <div className="label-hobby">
                  <p>Sở thích:</p>
                </div>
                <div className="grid gap-3 grid-cols-3 md:grid-cols-8">
                  {user?.userStyle.hobby.map((hobby, index) => (
                    <div
                      key={index}
                      className="h-10 rounded shadow-sm text-center flex items-center justify-center uppercase"
                      style={{
                        backgroundColor: '#00B96B2d',
                      }}
                    >
                      <p
                        style={{
                          color: '#00B96B',
                        }}
                        className="text-xs md:text-base"
                      >
                        {hobbies.find((item) => item.value === hobby)?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserStyle
