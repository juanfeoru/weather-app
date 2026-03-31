export function formatDay(timestamp: number) {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
  });
}
