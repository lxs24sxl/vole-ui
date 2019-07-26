import { isHtmlElement, isUndefined, isDefined } from "./types";

const entries = obj => {
  return Object.keys(obj || {}).map(key => [key, obj[key]]);
};

export const getAttributeMap = (el, vm, attributes, prefix) => {
  if (!isHtmlElement(el)) return {};

  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;

    let value = el.getAttribute(`${prefix}-${key}`);

    value = isUndefined(vm[value]) ? value : vm[value];

    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;

      case Boolean:
        value = isDefined(value)
          ? value === "false"
            ? false
            : Boolean(value)
          : defaultValue;
        break;

      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};
