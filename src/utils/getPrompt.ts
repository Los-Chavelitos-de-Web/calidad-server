import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { ProductPromptType } from '../../src/types/promptTypes';
import { NotFoundException } from '@nestjs/common';

const token = process.env.GITHUB_TOKEN || '';
const endpoint = 'https://models.github.ai/inference';
const modelName = 'meta/Llama-3.2-11B-Vision-Instruct';

// Función para formatear el producto en texto plano
function formatProductPrompt(product: ProductPromptType): string {
  if (!product.specs) {
    throw new NotFoundException({ message: 'Specs field is not defined.' });
  }

  const specsText = Object.entries(product.specs)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  return `
Título: ${product.title}
Marca: ${product.brand}
Modelo: ${product.model}
Categoría: ${product.category}

Especificaciones Técnicas:
${specsText}
  `.trim();
}

export async function describe(
  product: ProductPromptType,
): Promise<string | undefined> {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  try {
    const response = await client.path('/chat/completions').post({
      body: {
        messages: [
          {
            role: 'system',
            content: `Responde solo con un párrafo de texto plano, sin viñetas, sin encabezados, sin formato Markdown. Limítate a 100 palabras y utiliza español técnico accesible.`,
          },
          {
            role: 'user',
            content: `Por favor, redacta una descripción técnica en un solo párrafo, en español, para este producto basado en sus especificaciones. No repitas literal los campos como título o marca, sino que genera una descripción natural y técnica.`,
          },
          {
            role: 'user',
            content: formatProductPrompt(product),
          },
        ],
        temperature: 0.5,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName,
      },
    });

    if (isUnexpected(response)) {
      console.error(response.body);
      throw new NotFoundException({ message: 'No se pudo cargar el recurso.' });
    }

    return response.body.choices?.[0]?.message?.content ?? 'No description available.';
  } catch (error) {
    throw new NotFoundException({
      message: 'No se pudo cargar el recurso.',
      error,
    });
  }
}
