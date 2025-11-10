const chatHistory = document.querySelector('#chat-history');
const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message');
const template = document.querySelector('#message-template');

const BOT_DELAY = 600;

const responses = [
  {
    intent: 'greeting',
    keywords: ['chào', 'xin chào', 'hello', 'hi'],
    replies: [
      'Chào bạn! Mình là trợ lý bán hàng của Shop Vui Vẻ. Bạn đang quan tâm đến sản phẩm nào?',
      'Xin chào 👋 Bạn muốn tìm hiểu sản phẩm hay chương trình ưu đãi nào hôm nay?'
    ]
  },
  {
    intent: 'promotion',
    keywords: ['khuyến mãi', 'giảm giá', 'ưu đãi', 'voucher'],
    replies: [
      'Tuần này shop đang giảm 15% cho tất cả sản phẩm chăm sóc da. Bạn chỉ cần nhập mã SKIN15 khi thanh toán.',
      'Hiện tại chúng mình có freeship toàn quốc cho đơn từ 499k và tặng kèm quà mini cho đơn mỹ phẩm.'
    ]
  },
  {
    intent: 'delivery',
    keywords: ['giao hàng', 'ship', 'vận chuyển', 'bao lâu'],
    replies: [
      'Đơn nội thành sẽ giao trong 24h, ngoại tỉnh từ 2-4 ngày làm việc. Bạn có thể để lại địa chỉ để mình kiểm tra nhanh hơn nhé!',
      'Shop hợp tác với Giao Hàng Nhanh và Viettel Post, thời gian dự kiến 1-3 ngày tùy khu vực.'
    ]
  },
  {
    intent: 'product',
    keywords: ['son', 'sữa rửa mặt', 'serum', 'nước hoa', 'mặt nạ', 'giá'],
    replies: [
      'Bạn có thể cho mình biết loại da hoặc tông màu bạn thích không? Mình sẽ gợi ý sản phẩm phù hợp nhé!',
      'Shop hiện có nhiều dòng serum bestseller. Bạn muốn cải thiện vấn đề da nào để mình tư vấn chi tiết hơn?'
    ]
  },
  {
    intent: 'order-status',
    keywords: ['đơn hàng', 'mã đơn', 'kiểm tra đơn', 'tình trạng'],
    replies: [
      'Bạn vui lòng cung cấp mã đơn (ví dụ SVV12345) để mình tra cứu tình trạng giao hàng giúp bạn.',
      'Để kiểm tra đơn hàng, mình cần mã đơn hoặc số điện thoại đặt hàng nhé bạn.'
    ]
  },
  {
    intent: 'support',
    keywords: ['hỗ trợ', 'bảo hành', 'đổi trả', 'trả hàng'],
    replies: [
      'Shop hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm lỗi hoặc chưa mở seal. Bạn cần mình hướng dẫn chi tiết không?',
      'Bạn đang gặp vấn đề nào với sản phẩm? Mình sẽ hỗ trợ bạn từng bước.'
    ]
  }
];

function createMessageElement(text, author = 'bot') {
  const messageNode = template.content.firstElementChild.cloneNode(true);
  messageNode.classList.add(author);
  messageNode.querySelector('.bubble').textContent = text;
  messageNode.querySelector('.timestamp').textContent = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
  return messageNode;
}

function appendMessage(text, author) {
  const node = createMessageElement(text, author);
  chatHistory.append(node);
  chatHistory.scrollTo({ top: chatHistory.scrollHeight, behavior: 'smooth' });
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function matchIntent(message) {
  const normalized = normalize(message);
  for (const response of responses) {
    if (response.keywords.some((keyword) => normalized.includes(normalize(keyword)))) {
      return response;
    }
  }
  return null;
}

function getFallbackReply(message) {
  const normalized = normalize(message);

  if (normalized.includes('giờ') || normalized.includes('mở cửa')) {
    return 'Shop Vui Vẻ phục vụ online 24/7 và cửa hàng mở cửa từ 8h00 đến 21h00 mỗi ngày.';
  }

  return 'Mình chưa hiểu rõ câu hỏi của bạn. Bạn có thể nói chi tiết hơn về sản phẩm hoặc nhu cầu của mình không?';
}

async function handleUserMessage(event) {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  messageInput.value = '';

  const response = matchIntent(message);
  const reply = response
    ? response.replies[Math.floor(Math.random() * response.replies.length)]
    : getFallbackReply(message);

  await new Promise((resolve) => setTimeout(resolve, BOT_DELAY));
  appendMessage(reply, 'bot');
}

chatForm.addEventListener('submit', handleUserMessage);

appendMessage('Xin chào! Mình có thể giúp gì cho bạn hôm nay?', 'bot');
