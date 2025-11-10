import { GoogleGenAI } from 'https://esm.run/@google/genai';

const chatHistory = document.querySelector('#chat-history');
const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message');
const template = document.querySelector('#message-template');

const API_KEY = 'AIzaSyB_NRd6NjEmLd8FIMOvCQNVO2-oDHayDT0';
const MODEL = 'gemini-2.5-flash';
const TYPING_DELAY = 400;

const systemInstruction = [
  'Bạn là trợ lý bán hàng thân thiện của Shop Vui Vẻ.',
  'Luôn trả lời bằng tiếng Việt có dấu, ngắn gọn nhưng đầy đủ thông tin.',
  'Khi không chắc chắn, hãy đề xuất chuyển cuộc trò chuyện cho nhân viên thực.',
  'Gợi ý sản phẩm, chương trình khuyến mãi và chính sách theo cách tự nhiên.'
].join(' ');

const ai = new GoogleGenAI({ apiKey: API_KEY });

const conversation = [];

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

async function handleUserMessage(event) {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  messageInput.value = '';

  const pendingMessage = createMessageElement('Đang soạn câu trả lời...', 'bot');
  pendingMessage.classList.add('typing');
  chatHistory.append(pendingMessage);
  chatHistory.scrollTo({ top: chatHistory.scrollHeight, behavior: 'smooth' });

  conversation.push({ role: 'user', parts: [{ text: message }] });

  try {
    const reply = await fetchGeminiReply();
    conversation.push({ role: 'model', parts: [{ text: reply }] });

    await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY));
    pendingMessage.remove();
    appendMessage(reply, 'bot');
  } catch (error) {
    console.error('Gemini API error:', error);
    pendingMessage.remove();
    appendMessage(
      'Xin lỗi, hiện mình chưa thể trả lời ngay. Bạn vui lòng thử lại sau hoặc để lại thông tin để nhân viên liên hệ nhé!',
      'bot'
    );
  }
}

chatForm.addEventListener('submit', handleUserMessage);

appendMessage('Xin chào! Mình có thể giúp gì cho bạn hôm nay?', 'bot');

async function fetchGeminiReply() {
  const response = await ai.models.generateContent({
    model: MODEL,
    systemInstruction: {
      role: 'system',
      parts: [{ text: systemInstruction }]
    },
    contents: conversation
  });

  const rawText = typeof response?.text === 'function'
    ? response.text()
    : response?.text;
  const fallbackText = Array.isArray(response?.candidates?.[0]?.content?.parts)
    ? response.candidates[0].content.parts
        .map((part) => part.text ?? '')
        .join('')
    : '';
  const text = (rawText ?? fallbackText ?? '').trim();

  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  return text;
}
