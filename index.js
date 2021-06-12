const plugin = require("tailwindcss/plugin");

const flattenColorPalette = (colors) =>
  Object.assign(
    {},
    ...Object.entries(colors).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
          }))
        : [{ [`${color}`]: values }]
    )
  );

const outlinePlugin = plugin(
  function ({ addUtilities, e, theme, variants }) {
    const width = Object.entries(theme("spacing")).map(([key, value]) => {
      return { [`.${e(`outline-${key}`)}`]: { outlineWidth: `${value}` } };
    });
    const style = Object.entries(theme("outlineStyle")).map(([key, value]) => {
      return {
        [`.${e(`outline-${key}`)}`]: { outlineStyle: `${value}` },
      };
    });
    const palette = flattenColorPalette(theme("colors"));
    const color = Object.entries(palette).map(([key, value]) => {
      return {
        [`.${e(`outline-${key}`)}`]: { outlineColor: `${value}` },
      };
    });
    const offset = Object.entries(theme("spacing")).map(([key, value]) => {
      return {
        [`.${e(`outline-offset-${key}`)}`]: { outlineOffset: `${value}` },
      };
    });
    const utilities = [...width, ...style, ...color, ...offset];
    addUtilities(utilities, variants("outlinePlugin"));
  },
  {
    theme: {
      outlineStyle: {
        solid: "solid",
        dotted: "dotted",
        groove: "groove",
        none: "none",
        inset: "inset",
      },
    },
    variants: {
      outlinePlugin: ["hover", "active", "responsive"],
    },
  }
);

module.exports = outlinePlugin;
