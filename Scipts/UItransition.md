# TỔNG QUAN PHÂN LỚP GIAO DIỆN (UI LAYERS)

Để tối ưu hiệu năng, UI sẽ chia làm 2 lớp (layer) hoạt động song song.

| Lớp (Layer) | Công nghệ | Nhiệm vụ |
|---|---|---|
| Lớp 3D (Z-Index: 1) | R3F, Three.js | Render môi trường (Não bộ, Khu rừng), Model 3D (Bảng gỗ, Vật phẩm rớt ra), Camera di chuyển. |
| Lớp 2D HUD (Z-Index: 10) | React, Tailwind, Framer Motion | Cố định trên màn hình: Nút mở Túi đồ, Mini-map/Tiến độ nhánh, Nút Settings (Âm thanh/Thoát). |
| Lớp 2D Overlay (In-world) | R3F <Html> | Gắn liền với tọa độ 3D: Nội dung chữ nổi trên bảng gỗ, text highlight khi hover vào vật thể. |

---

## KỊCH BẢN LUỒNG TRẢI NGHIỆM CHI TIẾT

### 1. Màn hình Khởi động & Lõi Nơ-ron (Main Hub)

**Màn hình Start (2D):** Một background tối mờ với nút "Bắt đầu Hành trình Nhận thức" đặt giữa màn hình. Khi click, chữ mờ dần (fade-out).

**Lõi Nơ-ron (3D):** Camera lướt qua một khoảng không gian vô định, tiến vào một đồ thị nơ-ron phát sáng rực rỡ.

**Giao diện Tương tác:** Ba nhánh chính (node to nhất) sẽ tỏa sáng nhấp nháy (Glow effect). Khi đưa chuột (hover) vào mỗi node, lớp <Html> overlay sẽ hiển thị tooltip bằng một thẻ div viền gradient mỏng: 
- "Nhánh 1: Bản thể luận"
- "Nhánh 2: Phép biện chứng"
- "Nhánh 3: Chủ nghĩa duy vật lịch sử"

**Chuyển cảnh:** Click vào node "Nhánh 1", màn hình chớp trắng (Flash effect), camera hút mạnh vào tâm node và mở ra Khu rừng thứ nhất.

### 2. Giao diện Cố định (HUD - Luôn hiển thị)

- **Góc trên bên trái:** Thanh tiến độ (Progress bar) hoặc biểu tượng 3 hạt mầm tương ứng với 3 nhánh.
- **Góc trên bên phải:** Một icon chiếc Balo bằng da (Túi đồ - Inventory) kèm con số hiển thị lượng vật phẩm đang có.
- **Góc dưới bên trái:** Nút "Trở về Lõi" (Chỉ hiện khi đang ở trong các nhánh) để người chơi có thể tạm dừng nhánh này sang nhánh khác.

### 3. Cơ chế Hỏi đáp trong Khu Rừng (In-World UI)

**Tiếp cận (3D):** Camera trượt dọc theo rễ cây/nhánh cây và dừng lại trước một Phiến đá/Bảng gỗ cổ kính.

**Hiển thị UI (2D Overlay):** Từ mặt phiến đá, component <Html> render một form câu hỏi mượt mà.
- **Phần đầu:** Nội dung câu hỏi (Ví dụ: Vấn đề cơ bản của triết học gồm mấy mặt?).
- **Phần thân:** 4 nút (Button) tương ứng 4 đáp án (A, B, C, D) được thiết kế bo góc, đổ bóng nhẹ để tiệp với phong cách môi trường.

**Tương tác Trả lời:**
- **Nếu chọn Sai:** Nút rung lắc nhẹ đỏ lên (Shake animation bằng Framer Motion), báo hiệu chọn lại.
- **Nếu chọn Đúng:** Nút tỏa sáng xanh lá. Bảng gỗ chìm dần xuống đất hoặc nứt vỡ.

**Nhận Vật phẩm:** Ngay vị trí bảng gỗ vừa vỡ, một Model 3D vật phẩm (Ví dụ: Khối đá nguyên thủy) nảy lên, lơ lửng xoay tròn. Người chơi click vào vật phẩm, nó thu nhỏ lại và bay vút lên icon Balo ở góc phải màn hình.

### 4. Hệ thống Túi đồ & Lắp ráp (Inventory & Crafting UI)

**Mở Túi đồ:** Khi click vào icon Balo, game sẽ làm mờ không gian 3D phía sau (Backdrop blur). Một Modal 2D hiện lên chiếm 2/3 màn hình.

**Bố cục Inventory:**
- Bên trái là danh sách các ô vuông (Grid) chứa icon vật phẩm đã nhặt.
- Bên phải là một bệ chế tạo (Crafting Table) chia làm 2 ô khuyết và 1 ô kết quả (dạng A + B = C).

**Cơ chế Kéo Thả (Drag & Drop):**
1. Người chơi nhấn giữ chuột (Drag) icon Bình nước, kéo sang ô khuyết thứ nhất.
2. Khi kéo Mồi lửa đến gần ô khuyết thứ hai, ô này sáng lên (bóng mờ gợi ý).
3. Khi thả vào (Drop), nếu đúng công thức, màn hình rung nhẹ. Hình ảnh Bình nước và Mồi lửa chập vào nhau tạo ra một hiệu ứng xèo xèo (Sparkles), xuất hiện vật phẩm mới: Chìa khóa Đám mây.
4. Nút "Sử dụng" hiện lên bên dưới Chìa khóa.

### 5. Cửa ải Boss - Phân cảnh Kết thúc (Endgame UI)

**Môi trường:** Người chơi đã quay lại Lõi Nơ-ron. Tại trung tâm xuất hiện một Cánh cổng lớn với 3 rãnh khóa.

**Tương tác:** Lớp <Html> hiện thông báo: "Kéo 3 chìa khóa từ túi đồ vào cổng".

**Mở khóa:** Khi cả 3 chìa được lắp khớp, cánh cổng mở bung ra, chiếu ánh sáng chói lóa. Một bục đá dâng lên chứa Câu hỏi Boss (Câu 25).

**Giao diện Trả lời Boss:** Form UI hoành tráng hơn, viền vàng (Golden border). Nút bấm có hiệu ứng hover phát sáng mạnh.

**Chiến thắng (Good Ending):**
- Trả lời đúng, Quả cầu Khai sáng xuất hiện.
- Camera zoom tự động (Auto-pan) vòng quanh Khu rừng đang bừng sáng rực rỡ, toàn bộ nơ-ron kết nối thành một cỗ máy hoàn chỉnh.
- Một bảng Credits 2D từ từ cuộn lên (Roll credits) vinh danh đội ngũ phát triển và thông điệp thực tiễn của Triết học.