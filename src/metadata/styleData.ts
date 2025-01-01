type clothingStyleType = {
  id: number
  name: string
  description: string
  value: string
  color: string
}

export const clothingStylesData: clothingStyleType[] = [
  {
    id: 1,
    name: 'thường ngày',
    description:
      'Trang phục thoải mái, hàng ngày thường được mặc vì sự tiện lợi.',
    value: 'casual',
    color: '#e0e0e0',
  },
  {
    id: 2,
    name: 'trang trọng',
    description:
      'Trang phục thanh lịch và sang trọng, thường được mặc trong các dịp đặc biệt.',
    value: 'formal',
    color: '#000000',
  },
  {
    id: 3,
    name: 'thể thao',
    description:
      'Trang phục thể thao được thiết kế để hoạt động thể chất và thoải mái.',
    value: 'sporty',
    color: '#007bff',
  },
  {
    id: 4,
    name: 'công sở',
    description: 'Trang phục chuyên nghiệp phù hợp với môi trường làm việc.',
    value: 'business',
    color: '#2f4f4f',
  },
  {
    id: 5,
    name: 'Bohemian',
    description:
      'Phong cách tự do, nghệ thuật với sự tập trung vào chất liệu tự nhiên.',
    value: 'bohemian',
    color: '#d2691e',
  },
  {
    id: 6,
    name: 'thanh lịch',
    description:
      'Trang phục thời trang và phong cách, thường gắn liền với sự tối giản.',
    value: 'chic',
    color: '#ff69b4',
  },
  {
    id: 7,
    name: 'cổ điển',
    description:
      'Trang phục từ thời kỳ trước, phản ánh xu hướng thời trang hoài cổ.',
    value: 'vintage',
    color: '#8b4513',
  },
  {
    id: 8,
    name: 'Gothic',
    description:
      'Trang phục đen tối, bí ẩn, thường liên quan đến thời trang thay thế.',
    value: 'gothic',
    color: '#4b0082',
  },
  {
    id: 9,
    name: 'đường phố',
    description:
      'Phong cách thời trang đô thị, thường bị ảnh hưởng bởi âm nhạc và văn hóa đại chúng.',
    value: 'streetwear',
    color: '#708090',
  },
  {
    id: 10,
    name: 'Preppy',
    description:
      'Phong cách gọn gàng và cổ điển, thường gắn liền với trang phục học đường.',
    value: 'preppy',
    color: '#ff4500',
  },
  {
    id: 11,
    name: 'Punk',
    description:
      'Thời trang nổi loạn và cá tính, thường bao gồm da, đinh tán và thiết kế táo bạo.',
    value: 'punk',
    color: '#ff0000',
  },
  {
    id: 12,
    name: 'tối giản',
    description:
      'Trang phục đơn giản và gọn gàng, tập trung vào chất lượng và đường nét sạch sẽ.',
    value: 'minimalist',
    color: '#ffffff',
  },
]
