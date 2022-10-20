const changeBrightness = (color?: string, amount?: number) => {
  return (
    '#' +
    color
      ?.replace(/^#/, '')
      ?.replace(/../g, (color) =>
        (
          '0' +
          Math.min(
            255,
            Math.max(0, parseInt(color, 16) + (amount ?? 0))
          ).toString(16)
        ).substr(-2)
      )
  );
};
export default changeBrightness;
