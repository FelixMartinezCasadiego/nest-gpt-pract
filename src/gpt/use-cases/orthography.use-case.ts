interface Options {
  prompt: string;
}

export const orthographyUseCase = async (options: Options) => {
  const { prompt } = options;

  return { prompt: prompt };
};
