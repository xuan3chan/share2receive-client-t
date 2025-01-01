export type CreateRatingType = {
  targetId: string
  targetType: string
  rating: number
  comment: string
}

export type RatingType = {
  _id: string
  userId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
  }
  targetId: string
  targetUserId: string
  targetType: 'sale' | 'exchange'
  rating: 5
  comment: string
  createdAt: string | Date
  updatedAt: string | Date
}
