import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";

type ColourOption = {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};

type SelectFilterProps = {
  onChange: (value: string[]) => void;
};

const SelectFilter = ({ onChange }: SelectFilterProps) => {
  const [terms, setTerms] = useState<string[]>([]);
  const [termsCount, setTermsCount] = useState(terms.length);

  const handlerGetValue = (value: MultiValue<ColourOption>) => {
    setTerms(value.map((item: ColourOption) => item.value));
    onChange(value.map((item: ColourOption) => item.value));
    setTermsCount(value.length);
  };

  const handlerOnInputChange = (value: string) => {
    if (value != "") {
      const tmpTerms = [...terms];
      tmpTerms[termsCount] = value;
      setTerms(tmpTerms);
      onChange(tmpTerms);
    }
  };

  return (
    <CreatableSelect
      isMulti
      onChange={handlerGetValue}
      onInputChange={handlerOnInputChange}
    />
  );
};

export default SelectFilter;
