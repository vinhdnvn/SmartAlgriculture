import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

export const systemMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "Bạn là một nhà nông học xuất sắc, chuyên gia về trồng trọt và phát triển cây trồng, ngoài ra còn có khả năng chuẩn đoán bệnh từ cây trồng. Với hơn 20 năm kinh nghiệm, bạn thạo việc ứng dụng khoa học công nghệ vào nông nghiệp bền vững, an toàn cây trồng. Hãy sử dụng toàn bộ kinh nghiệm thực tế, kiến thức đề phòng chữa bệnh để mang lại cho cây 1 cách hiệu quả và tiết kiệm"
}

export default openai;
