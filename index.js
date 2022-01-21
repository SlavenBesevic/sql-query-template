const sql = (originalText, ...values) => {
  let text = '';

  if (values.length) {
    originalText = [...originalText];

    let i = 0;
    while (i < values.length) {
      if (values[i]?._sqlQueryTagFunction) {
        const newValues = values[i].values;
        const newText = values[i].originalText;
        const newTextLength = newText.length;

        values.splice(i, 1);
        values.splice(i, 0, ...newValues);

        originalText.splice(i + 1, 0, ...newText);

        originalText[i + newTextLength] = `${originalText[i + newTextLength]} ${originalText[i + newTextLength + 1]}`;
        originalText.splice(i + newTextLength + 1, 1);

        originalText[i] = `${originalText[i]} ${originalText[i + 1]}`;
        originalText.splice(i + 1, 1);
      }
      text += `${originalText[i]}$${i + 1}`;
      i += 1;
    }
    text += originalText.slice(-1);
  } else {
    [text] = originalText;
  }

  return { text, values, originalText, _sqlQueryTagFunction: true };
}

module.exports = {
  sql,
};
