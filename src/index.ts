export const sql = (originalText: TemplateStringsArray, ...values: any[]) => {
  const originalTextArray: string[] = [...originalText];
  let text = "";

  if (values.length) {
    let i = 0;
    while (i < values.length) {
      if (values[i]?._sqlQueryTagFunction) {
        const newValues = values[i].values;
        const newText = values[i].originalText;
        const newTextLength = newText.length;

        values.splice(i, 1);
        values.splice(i, 0, ...newValues);

        originalTextArray.splice(i + 1, 0, ...newText);

        originalTextArray[i + newTextLength] = `${
          originalTextArray[i + newTextLength]
        } ${originalTextArray[i + newTextLength + 1]}`;
        originalTextArray.splice(i + newTextLength + 1, 1);

        originalTextArray[i] = `${originalTextArray[i]} ${
          originalTextArray[i + 1]
        }`;
        originalTextArray.splice(i + 1, 1);
      }
      text += `${originalTextArray[i]}$${i + 1}`;
      i += 1;
    }
    text += originalTextArray.slice(-1)[0];
  } else {
    text = originalTextArray[0] as string;
  }

  return {
    text,
    values,
    originalText: originalTextArray,
    _sqlQueryTagFunction: true,
  };
};
