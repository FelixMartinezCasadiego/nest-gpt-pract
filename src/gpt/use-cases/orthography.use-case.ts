import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
  const completions = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en varios idiomas con posibles errores ortográficos y grámaticales.
        Las palabras deben existir en el idioma del texto, y no deben ser inventadas.
        Tu tarea es corregirlos y devolver el texto corregido en formato JSON,
        también debes de dar un porcentaje de acierto por el usuario,

        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        ejemplo de salida:
        {
          userScore:number,
          errors:[], // ['error -> solución]
          message: string // Usa emojis y texto para felicitar al usuario si no hay errores
        }
        `,
      },
      { role: 'user', content: options.prompt },
    ],
    model: 'gpt-4.1-nano',
    max_tokens: 150,
  });

  console.log('Completions:', {
    prompt_tokens: completions.usage?.prompt_tokens,
    completion_tokens: completions.usage?.completion_tokens,
    total_tokens: completions.usage?.total_tokens,
  });

  const jsonResponse = JSON.parse(
    completions.choices[0].message.content ?? '{}',
  );

  return jsonResponse;
};
