import { backOff } from 'exponential-backoff';
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from 'openai';

import openai, { systemMessage } from '@/app/libs/openai';

export interface PlantInfoInput {
  name: string;
  soil?: string;
  location: string;
  plantedMonth: number;
}

// step 1: ask suitably
const genPromptStep1 = (
  plant: PlantInfoInput
): ChatCompletionRequestMessage => {
  return {
    role: 'user',
    content: `Tôi đang có kế hoạch trồng cây trồng mới trên mảnh đất ở Daklak vào tháng 7 năm nay.  ${
      plant.soil && `Đất ở đây là loại đất ${plant.soil}`
    }. Hiện tại tôi đang trồng cây ${plant.name}. Xin hãy cho biết liệu cây ${
      plant.name
    } có phù hợp với điều kiện khí hậu của ${
      plant.location
    }, Việt Nam vào tháng ${
      plant.plantedMonth
    } này hay không. Câu trả lời chỉ có "yes" hoặc "no"`,
  };
};
export const createPlantStep1 = async (plant: PlantInfoInput) => {
  try {
    const response = await backOff(() =>
      openai.createChatCompletion({
        model: 'gpt-4-0314',
        messages: [systemMessage, genPromptStep1(plant)],
        max_tokens: 3072,
        // temperature: 1,
        // top_p: 0.5,
      })
    );
    const message = response.data.choices[0].message;
    return message;
  } catch (e) {
    console.log(e);
  }
};

// step 2: ask some attributes: soil, fertilizer, fertilizer, humidity, temperature
const genPromptStep2 = (
  plant: PlantInfoInput
): ChatCompletionRequestMessage => ({
  role: 'user',
  content: `
Nếu ${plant.name} phù hợp, vui lòng cung cấp các bước hướng dẫn trồng và chăm sóc cây ${plant.name} đúng cách tại ${plant.location} trong điều kiện thời tiết tháng ${plant.plantedMonth}. Bao gồm các thông tin: loại phân bón, thuốc bảo vệ thực vật, độ ẩm và nhiệt độ lý tưởng. Định dạng dữ liệu đề xuất:
{
"name": <tên cây trồng>,
"fertilizer": <loại phân bón>,
"plantProtectionProducts": <thuốc bảo vệ thực vật>,
"humidity": <độ ẩm lý tưởng>,
"temperature": <nhiệt độ lý tưởng>
}
Câu trả lời của bạn phải ở dạng json. Các thông tin trong dấu ngoặc nhọn <> là thông tin cần biết.
  `,
});
export const createPlantStep2 = async (
  plant: PlantInfoInput,
  step1: ChatCompletionResponseMessage
) => {
  try {
    const response = await backOff(() =>
      openai.createChatCompletion({
        model: 'gpt-4-0314',
        messages: [systemMessage, genPromptStep1(plant), genPromptStep2(plant)],
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

// step 3: ask plating steps
const genPromptStep3 = (
  plant: PlantInfoInput
): ChatCompletionRequestMessage => ({
  role: 'user',
  content: `
Hãy giúp tôi liệt kê các bước hướng dẫn trồng cây ${plant.name} một cách chi tiết. Câu trả lời cần phải gồm tối thiểu 100 chữ. Câu trả lời chỉ trả về mảng json là các bước hướng dẫn. Ví dụ: { plantingSteps: [] }
  `,
});
export const createPlantStep3 = async (
  plant: PlantInfoInput,
  step1: ChatCompletionResponseMessage,
  step2: ChatCompletionResponseMessage
) => {
  try {
    const response = await backOff(() =>
      openai.createChatCompletion({
        model: 'gpt-4-0314',
        messages: [
          systemMessage,
          genPromptStep1(plant),
          genPromptStep2(plant),
          genPromptStep3(plant),
        ],
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

// step 4: ask plowing guide
const genPromptStep4 = (
  plant: PlantInfoInput
): ChatCompletionRequestMessage => ({
  role: 'user',
  content: `
Hãy giúp tôi liệt kê các bước hướng dẫn xới đất trước khi trồng cây ${plant.name} một cách chi tiết. Câu trả lời cần phải gồm tối thiểu 100 chữ. Câu trả lời chỉ trả về mảng json là các bước hướng dẫn. Ví dụ: { plowingGuide: [] }
  `,
});
export const createPlantStep4 = async (
  plant: PlantInfoInput,
  step1: ChatCompletionResponseMessage,
  step2: ChatCompletionResponseMessage,
  step3: ChatCompletionResponseMessage
) => {
  try {
    const response = await backOff(() =>
      openai.createChatCompletion({
        model: 'gpt-4-0314',
        messages: [
          systemMessage,
          genPromptStep1(plant),
          genPromptStep2(plant),
          genPromptStep4(plant),
        ],
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

export const createPlant = async (plant: PlantInfoInput) => {
  // step 1
  console.log('reqeust step 1');
  const resStep1 = await createPlantStep1(plant);

  if (!resStep1) {
    console.log('resStep1 is an instance of ChatCompletionResponseMessage');
    return;
  }
  // console.log(resStep1?.content?.toLowerCase().includes('yes'));

  if (!resStep1?.content?.toLowerCase().includes('yes')) {
    console.log('no response');
    return;
  }

  // step 2
  console.log('request step 2');
  const resStep2 = await createPlantStep2(plant, resStep1);

  // step 3
  console.log('request step 3');
  if (!resStep2) {
    console.log('res step 2 is undefined');
    return;
  }
  const resStep3 = await createPlantStep3(plant, resStep1, resStep2);
  if (!resStep3) {
    // xử lý nếu resStep2 là undefined
    return; 
  }
  // step 4
  console.log('reqeust step 4');
  const resStep4 = await createPlantStep4(plant, resStep1, resStep2, resStep3);
  if (!resStep4) {
    // xử lý nếu resStep2 là undefined
    return; 
  }
  // return NextResponse.json({
  //   resStep1,
  //   resStep2,
  //   resStep3,
  //   res2: JSON.parse(resStep2.content),
  //   res3: JSON.parse(resStep3?.content),
  // });
 
};