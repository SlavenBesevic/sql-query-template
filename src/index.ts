export const sql = (query: TemplateStringsArray, ...values: any[]) => {
  const queryArray: string[] = [...query];

  let text = "";

  if (values.length) {
    let i = 0;
    while (i < values.length) {
      if (values[i]?._sqlQueryTagFunction) {
        const newValues = values[i].values;
        const newText = values[i].queryArray;
        const newTextLength = newText.length;

        values.splice(i, 1);
        values.splice(i, 0, ...newValues);

        queryArray.splice(i + 1, 0, ...newText);

        queryArray[i + newTextLength] = `${queryArray[i + newTextLength]} ${
          queryArray[i + newTextLength + 1]
        }`;
        queryArray.splice(i + newTextLength + 1, 1);

        queryArray[i] = `${queryArray[i]} ${queryArray[i + 1]}`;
        queryArray.splice(i + 1, 1);
      }
      text += `${queryArray[i]}$${i + 1}`;
      i += 1;
    }
    text += queryArray.slice(-1);
  } else {
    text = queryArray[0] as string;
  }

  return { text, values, originalText: query, _sqlQueryTagFunction: true };
};
