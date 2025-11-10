 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 8a4f791798c9e3480b5e1109c00eab13c189999a..876c9400a8dd8d5f423afe5d4c71a287ae4420ec 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,22 @@
-# Chatbot_Web
\ No newline at end of file
+# Chatbot Web Demo
+
+Trang web demo chatbot tư vấn bán hàng dành cho Shop Vui Vẻ. Ứng dụng được xây dựng thuần HTML/CSS/JavaScript, dễ dàng triển khai trên bất kỳ máy chủ tĩnh nào.
+
+## Tính năng chính
+
+- Giao diện trò chuyện hiện đại với khu vực giới thiệu thương hiệu và cửa sổ chat.
+- Bot trả lời tự động dựa trên các chủ đề phổ biến: chào hỏi, khuyến mãi, giao hàng, tư vấn sản phẩm, tra cứu đơn hàng và hỗ trợ sau bán.
+- Xử lý tiếng Việt với loại bỏ dấu giúp tăng độ chính xác khi khớp từ khóa.
+- Phản hồi ngay khi tải trang để hướng dẫn khách hàng bắt đầu tương tác.
+
+## Cách chạy
+
+1. Mở thư mục dự án và chạy máy chủ tĩnh, ví dụ:
+
+   ```bash
+   python -m http.server 8000
+   ```
+
+2. Truy cập `http://localhost:8000` trên trình duyệt để thử nghiệm chatbot.
+
+Bạn cũng có thể triển khai lên GitHub Pages hoặc bất kỳ dịch vụ hosting tĩnh nào.
 
EOF
)
