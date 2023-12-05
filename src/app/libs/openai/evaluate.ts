import { backOff } from 'exponential-backoff';
import { ChatCompletionRequestMessage } from 'openai';

import openai, { systemMessage } from '@/app/libs/openai';

// step 1: ask suitably
const genPromptStep1 = (plant : any, context : any): ChatCompletionRequestMessage => {
  return {
    role: 'user',
    content: `
Tôi sẽ cung cấp cho bạn dữ liệu cây trồng hiện tại của người dùng đang trồng dưới dạng json:
${JSON.stringify(plant)}
Từ dữ liệu cây trồng trên và kết hợp với các ghi chú nhật kí của người dùng trong các ngày, bạn hãy đánh giá về cây trồng dựa trên những dữ kiện đó.
Đây là ghi chú nhật kí trong các ngày trước:
"
"
Đây là ghi chú nhật kí hôm nay:
"
${context}
"
    `,
  };
};
export const evaluatePlant = async (plant:any, context:any) => {
  try {
    console.log('evaluate', context);
    const response = await backOff(() =>
      openai.createChatCompletion({
        model: 'gpt-3-turbo',
        messages: [systemMessage, genPromptStep1(plant, context)],
        max_tokens: 3072,
        temperature: 2,
        top_p: 0,
      })
    );
    const message = response.data.choices[0].message;
    return message;
  } catch (e) {
    console.log(e);
  }
};