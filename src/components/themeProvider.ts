import { ThemeConfig } from 'antd'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  preload: true,
  display: 'swap',
})

export const themeAntProvider: ThemeConfig = {
  token: {
    colorPrimary: '#1DA57A',
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    Layout: {
      bodyBg: '#ffff',
    },
    Collapse: {
      headerPadding: '12px 0px',
    },
    Menu: {
      itemActiveBg: '#dffae6',
    },
    Breadcrumb: {
      fontSize: 16,
    },
  },
}
