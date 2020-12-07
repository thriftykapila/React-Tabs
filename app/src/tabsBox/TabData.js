export default function TabData(number, titlePrefix = "Tab") {
  const data = [];
  for (let i = 1; i < number + 1; i++) {
    data.push({
      title: `${titlePrefix} ${i}`,
      content: `Content of ${titlePrefix} ${i}`
    });
  }
  return data;
}
