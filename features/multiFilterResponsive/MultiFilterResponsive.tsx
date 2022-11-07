import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { ComponentType, CSSProperties, useEffect, useState } from "react";
import Card, { CardType } from "./components/Card";
import SelectFilter from "./components/SelectFilter";
import Highlight from "./components/HighlightValue";

type Cell = {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties | undefined;
};

const breakPointsColumns = [
  { w: 0, c: 1 },
  { w: 640, c: 2 },
  { w: 768, c: 3 },
  { w: 1024, c: 4 },
  { w: 1280, c: 6 },
];

const getColums = () => {
  const result = breakPointsColumns.filter((item) => {
    if (window.innerWidth >= item.w) {
      return item.c;
    }
  });

  return !result[result.length - 1] ? 1 : result[result.length - 1].c;
};

const validateItem = (value: string) => (item: CardType) => {
  if (item.name.toLowerCase().includes(value.toLowerCase())) {
    return item;
  }

  if (String(item.weight).toLowerCase().includes(value.toLowerCase())) {
    return item;
  }
  if (String(item.height).toLowerCase().includes(value.toLowerCase())) {
    return item;
  }

  if (item.professions.join(" ").toLowerCase().includes(value.toLowerCase())) {
    return item;
  }

  if (item.friends.join(" ").toLowerCase().includes(value.toLowerCase())) {
    return item;
  }

  if (item.hair_color.toLowerCase().includes(value.toLowerCase())) {
    return item;
  }

  if (String(item.age).toLowerCase().includes(value.toLowerCase())) {
    return item;
  }
};

type MultiFilterResponsiveType = {
  data: CardType[];
};

const MultiFilterResponsive = ({ data }: MultiFilterResponsiveType) => {
  const [originalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });
  const [columns, setColumns] = useState(1);

  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    const setColumnsWSize = () => {
      setColumns(getColums());
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    };

    window.addEventListener("resize", setColumnsWSize);
    setColumnsWSize();
    return () => window.removeEventListener("resize", setColumnsWSize);
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }: Cell) => {
    if (filteredData[rowIndex * columns + columnIndex]) {
      return (
        <div style={style} className="p-4">
          <Highlight terms={terms}>
            <Card {...filteredData[rowIndex * columns + columnIndex]} />
          </Highlight>
        </div>
      );
    }
  };

  const handlerFilter = (values: string[]) => {
    setTerms(values);
    const filteredData = values.reduce(
      (acc, item) => acc.filter(validateItem(item)),
      originalData
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <div className=" p-4 pb-4 ">
        <SelectFilter onChange={handlerFilter} />
      </div>
      <h2 className="p-4 pb-4 pt-0  ">Elements : {filteredData.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-8">
        <Grid
          columnCount={columns}
          columnWidth={windowSize.width / columns - 5}
          height={windowSize.height}
          rowCount={filteredData.length / columns + 1}
          rowHeight={820}
          width={windowSize.width}
        >
          {Cell as ComponentType<GridChildComponentProps<any>>}
        </Grid>
      </div>
    </>
  );
};

export default MultiFilterResponsive;
