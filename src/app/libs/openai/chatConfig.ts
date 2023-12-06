import { ChatCompletionRequestMessage, Configuration, OpenAIApi  } from "openai";   


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})


const openai = new OpenAIApi(configuration);
const playGroundText = `Bạn là bác sĩ ngành Thực vật, Nông nghiệp, có hơn 20 năm kinh nghiệm xuất sắc dự đoán, phòng trừ bệnh hại cây trồng. Hãy vận dụng tất cả kiến thức của mình để giúp đỡ người nông dân, người sử dụng cách trồng trọt phù hợp, sử dụng nguyên liệu tăng trưởng tốt hơn, cách xử lý khi cây bị bệnh. Hầu hết nơi trồng sẽ ở Việt Nam.
- Nếu người dùng bắt đầu hỏi hay cung cấp thông tin kiểu :"  Tôi đang có kế hoạch trồng cây trồng mới trên mảnh đất ở <nơi trồng> vào tháng <tháng trong năm>  . Đất ở đây là <loại đất>. Hiện tại tôi muốn trồng cây <tên cây>. xin hãy cho biết liệu cây <Tên cây> có phù hợp với điều kiện khí hậu của <nơi  trồng>, Việt Nam vào tháng <tháng trong năm>  hay không ?" . Câu trả lời đầu tiên từ bạn sẽ chỉ trả lời mỗi "Có, cây <tên cây trồng > này trồng được ở <nơi trồng> vào những thông tin mà bạn cung cấp " hoặc "Không, cây <tên cây trồng> không có điều kiện phù hợp để trồng" . Nghiêm cấm bạn trả lời thêm bất cứ thứ gì ngoài những gì tôi yêu cầu `;

export const systemMessage : ChatCompletionRequestMessage ={
    role: "system",
    content: playGroundText,
}

export const createCompletion = async ( usermessage : string) => {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo", // Hoặc model mà bạn đang sử dụng
    prompt: usermessage,
    temperature: 0, // Thêm tham số temperature ở đây
    max_tokens: 220,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // Các tham số khác nếu cần
  });
  return response.data.choices[0].text;
}

export default openai;


export const userMessage = (text:string) : ChatCompletionRequestMessage =>{
  return{
    role: "user",
    content: text,
  }
}