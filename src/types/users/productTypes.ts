export enum SizeE {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
  FREESZIE = 'FREESZIE',
  XS = 'XS',
  NUM_36 = 36,
  NUM_37 = 37,
  NUM_38 = 38,
  NUM_39 = 39,
  NUM_40 = 40,
  NUM_41 = 41,
  NUM_42 = 42,
  NUM_43 = 43,
  NUM_44 = 44,
  NUM_45 = 45,
  NUM_46 = 46,
}

export enum ApproveStatusE {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export enum MaterialE {
  Linen = 'Linen',
  Burlap = 'Burlap',
  Silk = 'Silk',
  Cotton = 'Cotton',
  Jeans = 'Jeans',
  Velvet = 'Velvet',
  Wool = 'Wool',
  Suede = 'Suede',
  Tweed = 'Tweed',
  Sequin = 'Sequin',
  Leather = 'Leather',
  Chiffon = 'Chiffon',
  Knit = 'Knit',
  Mesh = 'Mesh',
  Lace = 'Lace',
  FoamFabric = 'Foam Fabric',
  SnowFabric = 'Snow Fabric',
  Khaki = 'Khaki',
  Organza = 'Organza',
  SyntheticFabric = 'Synthetic Fabric',
  Satin = 'Satin',
  Taffeta = 'Taffeta',
  Brocade = 'Brocade',
  Woven = 'Woven',
  CoolKnit = 'Cool Knit',
  Kate = 'Kate',
  Umi = 'Umi',
  KnitFabric = 'Knit Fabric',
  LinenCloth = 'Linen Cloth',
  SandVoile = 'Sand Voile',
}

export type SizeVariant = {
  size: SizeE
  colors: string
  amount: number
  _id: string
}

export type Approved = {
  approveStatus: 'pending' | 'approved' | 'rejected'
  date: Date | string
  decisionBy: string
  description: string
  _id: string
}

export type Status = 'active' | 'inactive' | 'suspend' | 'soldOut'

export type Product = {
  _id: string
  productName: string
  imgUrls: string[]
  sizeVariants: SizeVariant[]
  material: MaterialE
  userId: string
  categoryId: string
  condition: string
  brandId: string
  description: string
  isDeleted: boolean
  approved: Approved
  status: Status
  isBlock: boolean
  type: string
  price: number
  priceNew: number
  tags: string[]
  style: string
  createdAt: string | Date
  updatedAt: string | Date
  slug: string
  weight: number
  age: string
}

type sizeVariants = {
  size: string
  colors: string
  amount: number
  _id: string
}

export type addProduct = {
  productName: string
  sizeVariants: sizeVariants[]
  material: string
  style: string
  condition: string
  categoryId: string
  brandId: string
  status: string
  type: string
  price: number
  priceNew: number
  tags: string[]
  description: string
  images?: string[]
  weight: number
  age: string
}

export type ProductsPropose = {
  data: {
    data: Product[]
  }
  total: 1
}

export type ProductType = {
  data: Product[]
  total: 1
}

export type ProductsClient = {
  _id: string
  productName: string
  imgUrls: string[]
  material: string
  userId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
    averageRating: number
    numberOfRating: number
  }
  sizeVariants: sizeVariants[]
  categoryId: {
    _id: string
    name: string
  }
  brandId: {
    _id: string
    name: string
  }
  status: string
  type: 'sale' | 'barter' | 'donate'
  price: number
  tags: string[]
  condition: string
  style: string
  description: string
  slug: string
  weight: number
}

export type ProductSClientList = {
  data: ProductsClient[]
  total: 1
}
