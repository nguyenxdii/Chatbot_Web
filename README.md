# Chatbot Web Demo

Trang web demo chatbot tư vấn bán hàng dành cho Shop Vui Vẻ. Ứng dụng được xây dựng thuần HTML/CSS/JavaScript, dễ dàng triển khai trên bất kỳ máy chủ tĩnh nào.

## Tính năng chính

- Giao diện trò chuyện hiện đại với khu vực giới thiệu thương hiệu và cửa sổ chat.
- Tích hợp Google Gemini (`gemini-pro`) để sinh câu trả lời tự nhiên, ngữ cảnh theo cuộc hội thoại.
- Khởi tạo prompt định hướng trợ lý bán hàng, hỗ trợ các yêu cầu về sản phẩm, khuyến mãi, vận chuyển, đơn hàng.
- Hiển thị trạng thái "đang soạn" khi chờ phản hồi từ mô hình.

## Cách chạy

1. (Tuỳ chọn) Cập nhật khóa API trong `app.js` nếu bạn sử dụng khóa khác:

   ```js
   const API_KEY = 'API_KEY_CUA_BAN';
   ```

2. Mở thư mục dự án và chạy máy chủ tĩnh, ví dụ:

   ```bash
   python -m http.server 8000
   ```

3. Truy cập `http://localhost:8000` trên trình duyệt để thử nghiệm chatbot.

Bạn cũng có thể triển khai lên GitHub Pages hoặc bất kỳ dịch vụ hosting tĩnh nào.
