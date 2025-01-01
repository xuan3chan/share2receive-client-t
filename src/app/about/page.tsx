import Map from "@/components/about/map";

export default function About() {
  return (
    <>
      <div
        className="w-full relative bg-gray-800 rounded-lg pt-[15%] "
        style={{
          backgroundImage: 'url(/images/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50%',
        }}
      ></div>
      <div className="mt-7">
        <div className="flex flex-1 justify-center">
          <h1 className="text-3xl font-semibold text-green-800">Giới thiệu về Share2Receive</h1>
        </div>
        <div className="flex flex-1 justify-center mt-5 flex-col gap-5 text-xl px-28">
          <p>Câu chuyện bắt đầu từ đại dịch COVID-19</p>
          <p>
            &quot;Tôi gần như ở nhà suốt cả năm nay vì COVID-19. Vì vậy, tôi quyết định dọn dẹp lại cả nhà và bỏ đi một
            số thứ bản thân không cần&quot;
          </p>
          <p>
            &quot;Thật là phí phạm khi cứ để những bộ đồ treo không trên móc. Tôi sẽ thấy vui hơn nếu ai đó có thể mặc
            nó thay tôi&quot;
          </p>
          <p>&quot;Nếu như chúng ta có khả năng giúp cuộc sống này trở nên dễ dàng hơn một chút thì sao?&quot;</p>
          <p>
            Ừ thì, thực ra không phải là một, mà là một vài lý do như bạn thấy đấy. Và những lý do này chính là động lực
            để một nhóm bạn cực kỳ tham vọng (và cực kỳ lạc quan) quyết định thành lập công ty này, với trụ sở đầu tiên
            là một nhà kho nhỏ xíu được thuê tạm ở Bình Thạnh.
          </p>
          <p>Đó là năm 2020.</p>
          <p>
            Giống như mỗi người dân Việt Nam khác, chúng tôi mang trong mình nhiều tham vọng và quyết tâm. Chúng tôi vẫn
            luôn tự hỏi cuộc sống hàng ngày đang có những trở ngại gì cần mình khắc phục. Và mỗi ngày trôi qua, chúng
            tôi cũng vô cùng lạc quan về một cuộc sống có REshare.
          </p>
        </div>
      </div>
      <div className="mt-7">
        <div className="flex flex-1 justify-center">
          <h1 className="text-3xl font-semibold text-green-800">Thông tin về công ty</h1>
        </div>
        <div className="flex flex-1 justify-center mt-5 flex-col gap-5 text-xl px-28">
          <p>Địa chỉ đăng ký kinh doanh: 15, Đường số 6, Phường 15, Quận gò vấp, Thành phố Hồ Chí Minh, Việt Nam.</p>
        </div>
        
        <Map />
      </div>
    </>
  )
}
