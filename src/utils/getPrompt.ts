import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { ProductPromptType } from "../../src/types/promptTypes";

const token = process.env.GITHUB_TOKEN || '';
const endpoint = "https://models.github.ai/inference";
const modelName = "meta/Llama-3.2-11B-Vision-Instruct";

export async function describe(product: ProductPromptType) {

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const productFormated = () => {
    return `title: ${product.title}, brand: ${product.brand}, model: ${product.model}, category: ${product.category}, specs: ${Object.entries(product.specs).map(([key, value]) => `${key}: ${value}`).join(', ')}`;
  }

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system", content: "You are a helpful what describe machines and always return in prose and in Spanish language.\
          Use UTF-8. With understandable words and text plain" },
        { role: "user", content: "I need describe a product machine with this title, brand, model, category and most important, the specs." },
        { role: "user", content: productFormated() }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body.choices[0].message.content;
}

