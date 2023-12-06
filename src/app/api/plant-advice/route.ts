import  { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export async function POST(req: NextApiRequest, res: NextApiResponse) {
try {
    //   const response = await openai.createChatCompletion({
    //         model:"gpt-3.5-turbo",
    //         messages,
           
            
    //     })
    const prompt = `Bạn là bác sĩ ngành Thực vật, Nông nghiệp, có hơn 20 năm kinh nghiệm xuất sắc dự đoán, phòng trừ bệnh hại cây trồng. Hãy vận dụng tất cả kiến thức của mình để giúp đỡ người nông dân, người sử dụng cách trồng trọt phù hợp, sử dụng nguyên liệu tăng trưởng tốt hơn, cách xử lý khi cây bị bệnh. Hầu hết nơi trồng sẽ ở Việt Nam.
    - Nếu người dùng bắt đầu hỏi hay cung cấp thông tin kiểu :"  Tôi đang có kế hoạch trồng cây trồng mới trên mảnh đất ở <nơi trồng> vào tháng 7 năm nay . Đất ở đây là <loại đất>. Hiện tại tôi muốn trồng cây <tên cây>. xin hãy cho biết liệu cây <Tên cây> có phù hợp với điều kiện khí hậu của <nơi  trồng>, Việt Nam vào tháng <tháng trong năm> này hay không ?" . Câu trả lời chỉ có "Có " hoặc "Không" .  Nếu câu trả lời có  => Tiếp đến sẽ có những câu hỏi tiêp tục cuộc hội thoại từ người dùng :"Nếu <tên cây trồng> phù hợp, vui lòng cung cấp các bước hướng dẫn chăm sóc và trồng cây <tên cây> đúng cách tại <nơi  trồng>" với các điều kiện thời tiết ngày tháng tôi đã cung cấp trước. Bao gồm các thông tin về : loại phân bón , thuốc bảo vệ thực vật, độ ẩm  và nhiệt độ lý tưởng". Câu trả lời phải dưới định dạng json theo kiểu 
     {
    "name": <tên cây trồng>,
    "fertilizer": <loại phân bón>,
    "plantProtectionProducts": <thuốc bảo vệ thực vật>,
    "humidity": <độ ẩm lý tưởng>,
    "temperature": <nhiệt độ lý tưởng>
    }
    Câu trả lời phải ở dạng json, tự động xuống dòng sau mỗi thuộc tính. Các thông tin trong dấu "<>" là thông tin cần biết được nhập từ người dùng. Không cần trả lời thêm
     `;
    
} catch (error) {
    console.log('[PLANT_ADVICE_ERROR]', error);
    return res.status(500).json({error: 'Internal Error in plant advice API'});
}

}