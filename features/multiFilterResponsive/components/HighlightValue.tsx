import React from "react";
import { CardType } from "./Card";

type TermColorType = {
  term: string;
  color: string;
};

type Dictionary<T> = {
  [Key: string]: T;
};

const colors = [
  "#007bff",
  "#28a745",
  "#dc3545",
  "#ffc107",
  "#17a2b8",
  "#343a40",
  "#0e367c",
  "#4874bf",
  "#fba257",
  "#f44242",
  "#ab3434",
];

const replaceTemplate = (string: string, termColor: TermColorType) => {
  const regEx = new RegExp("(" + termColor.term + ")(?!([^<]+)?>)", "gi");
  return string.replace(
    regEx,
    `<span class="highlight" style="font-weight: bold; color:${termColor.color}" >${termColor.term}</span>`
  );
};

const replaceinString = (terms: TermColorType[], string: string) =>
  terms.reduce((acc, item) => replaceTemplate(acc, item), string);

const highlightValue = (data: CardType, terms: TermColorType[]) => {
  const newObject: Dictionary<string> = {};

  Object.keys(data).map((key) => {
    if (key !== "id" && key !== "thumbnail") {
      const value = data[key as keyof CardType];

      if (typeof value === "string") {
        newObject[key as keyof CardType] = replaceinString(terms, value);
      }
      if (typeof value === "number") {
        newObject[key as keyof CardType] = replaceinString(
          terms,
          String(value)
        );
      }
      if (typeof value === "object" && value.length) {
        return (newObject[key] = replaceinString(terms, value.join("%")).split(
          "%"
        ) as unknown as string);
      }
    } else {
      newObject[key] = data[key];
    }
    return newObject;
  });

  return newObject;
};

type HighlightType = {
  children: JSX.Element;
  terms: string[];
};

function Highlight({ children, terms }: HighlightType) {
  const termsColors = terms.map((item: string, i: number) => {
    return { term: item, color: colors[i] };
  });

  return React.cloneElement(
    children,
    highlightValue(children.props, termsColors)
  );
}

export default Highlight;
