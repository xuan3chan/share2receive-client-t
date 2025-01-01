export default function PurchaseDonationConditions() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-5 container">
      <h1 className="text-2xl font-semibold">Điều khoản mua và Quyên tặng</h1>
      <p className="text-lg font-semibold">1. Những lưu ý về sản phẩm:</p>
      <p className="text-lg font-semibold">Đối với sản phẩm Cho tặng</p>
      <p className="text-lg whitespace-pre-wrap">{`- Quần áo cho tặng: không yêu cầu thương hiệu, bất kể sản phẩm liên quan đến thời trang mà bạn muốn cho tặng.
- Ngoài quần áo Share2Receive còn có thể nhận các sản phẩm khác nếu bạn cần Share2Receive xử lý chúng.`}</p>
      <p className="text-lg font-semibold">2. Tiến trình hoàn trả trong trường hợp không đủ tiêu chuẩn:</p>
      <p className="text-lg whitespace-pre-wrap">{`- Giai đoạn 1: THÔNG TIN - Share2Receive sẽ thông tin đến bạn về tình trạng của sản phẩm không đủ tiêu chuẩn qua tin nhắn.
- Giai đoạn 2: XÁC NHẬN - Khách hàng vui lòng phản hồi tin nhắn sẽ nhận hàng hoặc từ chối nhận hàng.
- Giai đoạn 3 : HOÀN TRẢ:
          + Cách 1: Khách hàng tự đến lấy tại địa chỉ 35 đường 30, phường Linh Đông, quận Thủ Đức, thành phố Hồ Chí Minh.
          + Cách 2: Sau khi xác nhận sẽ nhận hoàn trả, Share2Receive hỗ trợ book ship, phí ship khách hàng tự trả.

Lưu ý: đối với sản phẩm hoàn trả, trong vòng thời gian 1 tuần nếu khách hàng không đến nhận hoặc không xác nhận hoàn trả, Share2Receive sẽ không giải quyết và xoá bỏ đơn hàng.`}</p>
      <p className="text-lg font-semibold">3. Điều khoản bắt buộc:</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Tất cả các sản phẩm Cho tặng  bên Share2Receive đã nhận được, Share2Receive sẽ được toàn quyền sử dụng cho các mục đích khác nhau mà không cần phải thông báo hoặc được sự đồng ý của Khách hàng.

- Share2Receive được quyền từ chối nhận Cho tặng hoặc Ký gửi, khi kiểm tra sản phẩm không phù hợp với tiêu chí Cho tặng & Ký gửi ở trên.`}
      </p>
    </div>
  )
}
