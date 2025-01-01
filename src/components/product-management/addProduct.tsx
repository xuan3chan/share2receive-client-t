'use client'
import { IconPlus } from '@tabler/icons-react'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAddProduct } from '@/hooks/useProduct'
import dynamic from 'next/dynamic'
import { Stepper } from '@mantine/core'
import { useAuth } from '@/hooks/useAuth'
import { useWalletStore } from '@/zustand/wallet'
import { useClient } from '@/hooks/useClient'

const StepInfor = dynamic(() => import('@/components/product-management/addProduct/stepInfor'), { ssr: false })
const StepPicture = dynamic(() => import('@/components/product-management/addProduct/stepPicture'), { ssr: false })

export default function AddProduct() {
  const { user } = useAuth()
  const { wallet } = useWalletStore()
  const { config } = useClient()
  const {
    isDesktop,
    openAddProductModal,
    handleOpenAddProductModal,
    form,
    activeStep,
    setActiveStep,
    typeCheck,
    setTypeCheck,
    previewOpen,
    setPreviewOpen,
    previewImage,
    setPreviewImage,
    fileList,
    handlePreview,
    handleChange,
    prevStep,
    onFinishCreate,
    onUploadImages,
    categories,
    loading,
    brands,
  } = useAddProduct()

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </button>
  )

  return (
    <>
      <Button
        size="large"
        icon={<IconPlus size={15} />}
        variant="solid"
        disabled={(!user?.banking || !user?.address || !user?.phone || (config && wallet.point <= config.valueToCross)) ?? false}
        color="primary"
        onClick={handleOpenAddProductModal}
      >
        Thêm
      </Button>
      <Modal
        width={isDesktop ? '70%' : '100%'}
        title="Thêm sản phẩm"
        centered
        open={openAddProductModal}
        onCancel={handleOpenAddProductModal}
        footer={null}
      >
        <Stepper iconSize={30} active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false}>
          <Stepper.Step
            label={isDesktop ? 'Thông tin sản phẩm' : 'Thông tin'}
            description={isDesktop ? 'Thông tin về sản phẩm đăng tải' : ''}
          >
            <StepInfor
              form={form}
              onFinishCreate={onFinishCreate}
              categories={categories}
              brands={brands}
              loading={loading}
              setActiveStep={setActiveStep}
              setTypeCheck={setTypeCheck}
              toggleAddProductModal={handleOpenAddProductModal}
              typeCheck={typeCheck}
            />
          </Stepper.Step>

          <Stepper.Step
            label={isDesktop ? 'Đăng tải hình ảnh' : 'Hình ảnh'}
            description={isDesktop ? 'Đăng tải hình ảnh sản phẩm' : ''}
          >
            <StepPicture
              form={form}
              fileList={fileList}
              handlePreview={handlePreview}
              handleChange={handleChange}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              previewOpen={previewOpen}
              setPreviewOpen={setPreviewOpen}
              onUploadImages={onUploadImages}
              prevStep={prevStep}
              uploadButton={uploadButton}
            />
          </Stepper.Step>
        </Stepper>
      </Modal>
    </>
  )
}
