import isEmpty from "lodash/isEmpty";
import snakeCase from "lodash/snakeCase";
import toUpper from "lodash/toUpper";

export const JSONDATA = (data: any): Record<string, any> | string | null => {
  if (isEmpty(data) || !data) {
    return null;
  }

  try {
    if (typeof data !== "object") {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    // console.log('error trying to parse response data');
    return data;
  }
};

/**
 * CapitalizeFirstLetter
 * @param txt
 * @returns
 */
export function capText(txt: string): string {
  return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
}

/**
 * To Snake case and in upper case
 * @param txt 
 * @returns 
 */
export const toSnakeUpper = (txt: string): string => {
  return toUpper(snakeCase(txt));
};

export default JSONDATA;
