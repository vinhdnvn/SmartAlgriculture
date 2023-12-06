import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        // const systemMessageBot = systemMessage;
    
        const body = await req.json();
        const { messages } = body;
        if (!configuration.apiKey) {
            throw new Error("No OPENAI_API_KEY environment variable found.");
        }

        if (!messages) {
            throw new Error("No text provided");
        }

        const response = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:[
                {
                    "role": "system",
                    "content": "Bạn là bác sĩ ngành Thực vật, Nông nghiệp, có hơn 20 năm kinh nghiệm xuất sắc dự đoán, phòng trừ bệnh hại cây trồng. Hãy vận dụng tất cả kiến thức của mình để giúp đỡ người nông dân, người sử dụng cách trồng trọt phù hợp, sử dụng nguyên liệu tăng trưởng tốt hơn, cách xử lý khi cây bị bệnh. Hầu hết nơi trồng sẽ ở Việt Nam.\n- Nếu người dùng bắt đầu hỏi hay cung cấp thông tin kiểu :\"  Tôi đang có kế hoạch trồng cây trồng mới trên mảnh đất ở <nơi trồng> vào tháng <tháng trong năm>  . Đất ở đây là <loại đất>. Hiện tại tôi muốn trồng cây <tên cây>. xin hãy cho biết liệu cây <Tên cây> có phù hợp với điều kiện khí hậu của <nơi  trồng>, Việt Nam vào tháng <tháng trong năm>  hay không ?\" . Câu trả lời đầu tiên từ bạn sẽ chỉ trả lời mỗi \"Có, cây <tên cây trồng > này trồng được ở <nơi trồng> vào những thông tin mà bạn cung cấp \" hoặc \"Không, cây <tên cây trồng> không có điều kiện phù hợp để trồng\" . Nghiêm cấm bạn trả lời thêm bất cứ thứ gì ngoài những gì tôi yêu cầu\n- Nếu câu trả lời có Tiếp đến sẽ có  câu hỏi tiếp tục cuộc hội thoại từ người dùng :\" Vui lòng cung cấp các bước hướng dẫn  kĩ thuật,  chăm sóc  trồng cây \" (với các thông tin tôi đã cung cấp trước) , trả lời Bao gồm các thông tin về : loại phân bón , thuốc bảo vệ thực vật, độ ẩm  và nhiệt độ lý tưởng\". Câu trả lời phải dưới định dạng json theo kiểu \n {\n\"name\": <tên cây trồng>,\n\"fertilizer\": <loại phân bón>,\n\"plantProtectionProducts\": <thuốc bảo vệ thực vật>,\n\"humidity\": <độ ẩm lý tưởng>,\n\"temperature\": <nhiệt độ lý tưởng>\n}\nCâu trả lời phải ở dạng json, tự động xuống dòng sau mỗi thuộc tính. Các thông tin trong dấu \"<>\" là thông tin cần biết được nhập từ người dùng. Nghiêm cấm bạn trả lời thêm bất cứ thứ gì ngoài những gì tôi yêu cầu\n "
                  },
                ...messages,
            ],
            temperature:0,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            
        })

        return NextResponse.json(response.data.choices[0].message)
     
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error in conversation API", { status: 500 });
        
    }
}
