/* eslint-disable @typescript-eslint/no-explicit-any */
import { colorData } from '@/metadata/colorData'
import { materialData } from '@/metadata/materialData'
import { sizes } from '@/metadata/sizeData'
import { clothingStylesData } from '@/metadata/styleData'
import { Product } from '@/types/users/productTypes'
import { Grid } from '@mantine/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Form, Button, Select, Radio, Input } from 'antd'

export default function TabInformation({
  form,
  product,
  setProduct,
  setTypeCheck,
  typeCheck,
  toggleEditProductModal,
  onFinishCreate,
  loading,
  categories,
  brands,
  disabled,
}: {
  form: any
  product: Product
  setProduct: any
  setTypeCheck: any
  typeCheck: any
  toggleEditProductModal: any
  onFinishCreate?: any
  loading: any
  categories: any
  brands: any
  disabled?: any
}) {
  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        validateTrigger={['onBlur', 'onChange']}
        size="large"
        disabled={disabled || false}
        onFinish={onFinishCreate}
        initialValues={
          product && {
            productName: product.productName,
            material: product.material,
            style: product.style,
            condition: product.condition,
            categoryId: product.categoryId,
            brandId: product.brandId,
            description: product.description,
            type: product.type,
            price: product.price,
            tags: product.tags?.join(' '),
            weight: product.weight,
            age: product.age,
            sizeVariants: product.sizeVariants?.map((sizeVariant) => ({
              size: sizeVariant.size,
              colors: sizeVariant.colors,
              amount: sizeVariant.amount,
            })),
          }
        }
      >
        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>
        <div
          style={{
            maxHeight: '30vh',
            overflowY: 'auto',
          }}
        >
          <Form.List
            name="sizeVariants"
            rules={[
              {
                validator: async (_, sizeVariants) => {
                  if (!sizeVariants || sizeVariants.length < 1) {
                    return Promise.reject(new Error('Vui lòng thêm ít nhất 1 size!'))
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add({}, 0)} // Thêm trường mới ở đầu danh sách
                    block
                    icon={<IconPlus />}
                  >
                    Thêm size
                  </Button>
                </Form.Item>
                {fields.map((field, index) => (
                  <>
                    <div className="grid gap-2 grid-cols-3 md:grid-cols-5 items-center" key={field.key}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'size']}
                        fieldKey={['size']}
                        label={
                          index === 0 ? 'Size' : '' // Ẩn label của size đầu tiên
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập size!',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn size"
                          options={sizes.map((size) => ({
                            label: size.name,
                            value: size.value,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'colors']}
                        fieldKey={['colors']}
                        label={index === 0 ? 'Màu sắc' : ''}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn màu sắc!',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn màu sắc"
                          options={colorData.map((color) => ({
                            label: color.name,
                            value: color.value,
                          }))}
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, 'amount']}
                        fieldKey={['amount']}
                        label={index === 0 ? 'Số lượng' : ''}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập số lượng!',
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          className={`justify-self-start justify-items-start ${index !== 0 ? 'mb-5' : ''}`}
                          type="link"
                          onClick={() => remove(field.name)}
                          icon={<IconTrash />}
                        >
                          Xóa
                        </Button>
                      )}
                    </div>
                  </>
                ))}

                <Form.ErrorList className="text-red" errors={errors} />
              </>
            )}
          </Form.List>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-3">
          <Form.Item
            name="material"
            label="Chất liệu"
            rules={[{ required: true, message: 'Vui lòng chọn chất liệu!' }]}
          >
            <Select
              placeholder="Chọn chất liệu"
              options={materialData.map((material) => ({
                label: material.name,
                value: material.value,
              }))}
            />
          </Form.Item>
          <Form.Item name="style" label="Phong cách" rules={[{ required: true, message: 'Vui lòng chọn phong cách!' }]}>
            <Select
              placeholder="Chọn phong cách"
              options={clothingStylesData.map((style) => ({
                key: style.value,
                label: style.name,
                value: style.value,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="condition"
            label="Tình trạng"
            rules={[{ required: true, message: 'Vui lòng chọn tình trạng!' }]}
          >
            <Select
              placeholder="Chọn tình trạng"
              options={[
                { label: 'Mới', value: 'new' },
                { label: 'Cũ', value: 'used' },
              ]}
            />
          </Form.Item>
        </div>
        <div className="w-full grid grid-cols-2 gap-3">
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select
              placeholder="Chọn danh mục"
              loading={loading}
              options={categories?.map((category: { name: string; _id: string }) => ({
                label: category.name,
                value: category._id,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
          >
            <Select
              placeholder="Chọn thương hiệu"
              loading={loading}
              options={brands?.map((brand: { name: string; _id: string }) => ({
                label: brand.name,
                value: brand._id,
              }))}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="weight"
            label="Trọng lượng (gram)"
            rules={[
              { required: true, message: 'Vui lòng nhập trọng lượng!' },
              {
                validator: (_, value) => {
                  const weight = Number(value)
                  if (weight <= 50) {
                    return Promise.reject(new Error('Trọng lượng sản phẩm phải lớn hơn 50 gram!'))
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input type="number" placeholder="Nhập trọng lượng sản phẩm" />
          </Form.Item>
          <Form.Item name="age" label="Độ tuổi" rules={[{ required: true, message: 'Vui lòng chọn độ tuổi!' }]}>
            <Select
              placeholder="Chọn độ tuổi"
              options={[
                { label: '16-20 tuổi', value: '16-20' },
                { label: '20-25 tuổi', value: '20-25' },
                { label: '25-30 tuổi', value: '25-30' },
                { label: '30-35 tuổi', value: '30-35' },
                { label: '35+', value: '35+' },
              ]}
            />
          </Form.Item>
        </div>
        <div className="w-full grid grid-flow-col ">
          <Form.Item
            name="type"
            label="Loại sản phẩm"
            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
          >
            <Radio.Group
              onChange={(e) => {
                setTypeCheck(e.target.value)
              }}
              defaultValue={product.type}
            >
              <Radio value="sale">Bán</Radio>
              <Radio value="barter">Trao đổi</Radio>
              <Radio value="donate">Quyên góp</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Radio.Group>
              <Radio value="active">Kích hoạt</Radio>
              <Radio value="inactive">Không kích hoạt</Radio>
              <Radio value="suspend">Tạm dừng</Radio>
              <Radio disabled value="soldOut">
                Hết hàng
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        {typeCheck === 'sale' && (
          <Form.Item
            name="price"
            label="Giá"
            rules={[
              { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
              {
                validator: (_, value) => {
                  if (value < 1000) return Promise.reject(new Error('Giá sản phẩm phải lớn hơn 1 nghìn đồng!'))
                  if (value > 5000000) {
                    return Promise.reject(new Error('Giá sản phẩm không được vượt quá 5 triệu!'))
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input placeholder="Nhập giá sản phẩm" type="number" />
          </Form.Item>
        )}
        <Form.Item name="tags" label="Tags" rules={[{ required: true, message: 'Vui lòng nhập tags!' }]}>
          <Input.TextArea
            placeholder="Nhập tags"
            onChange={(e) => {
              const value = e.target.value

              // Tách chuỗi thành các tag dựa trên dấu cách
              const tags = value.split(' ')

              // Đảm bảo mỗi tag có dấu #
              const formattedTags = tags.map((tag) => (tag.startsWith('#') || tag.trim() === '' ? tag : `#${tag}`))

              // Gộp lại các tag thành chuỗi
              const formattedValue = formattedTags.join(' ')

              // Cập nhật lại giá trị trường
              form.setFieldsValue({ tags: formattedValue })
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>
        {!disabled && (
          <Grid justify="end" mt={15}>
            <Button
              onClick={() => {
                toggleEditProductModal()
                form.resetFields()
                setProduct({} as Product)
              }}
              className="mr-2"
            >
              Hủy
            </Button>

            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Grid>
        )}
      </Form>
    </>
  )
}
