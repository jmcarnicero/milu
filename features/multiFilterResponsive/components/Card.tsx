import Image from "next/image";

export type CardType = {
  id: string;
  thumbnail: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  hair_color: string;
  professions: string[];
  friends: string[];
};

const renderList = (data: string[]) =>
  data.reduce<React.ReactNode[]>(
    (acc, item) => [
      ...acc,
      <li>
        <span dangerouslySetInnerHTML={{ __html: item }} />
      </li>,
    ],
    [<></>]
  );

const Card = (props: CardType) => {
  return (
    <div className="w-64 min-h-800 max-h-800 rounded-lg border border-gray-200 shadow-md  overflow-y-auto    ">
      <div className="rounded-md flex justify-center max-h-50">
        <div className="max-w-sm rounded  ">
          <Image
            src={props.thumbnail}
            alt={props.name}
            width={100}
            height={200}
            layout="responsive"
          />

          <div className="px-4 py-2 ">
            <span />
            <div className="font-bold text-xl ">
              <span dangerouslySetInnerHTML={{ __html: props.name }} />
            </div>
          </div>
          <div className="px-4 py-2 pt-0">
            <ul className="text-gray-700 text-base">
              <li>
                Age: <span dangerouslySetInnerHTML={{ __html: props.age }} />
              </li>
              <li>
                Weight:
                <span dangerouslySetInnerHTML={{ __html: props.weight }} />
              </li>
              <li>
                Height:
                <span dangerouslySetInnerHTML={{ __html: props.height }} />
              </li>
              <li>
                Hair color:
                <span dangerouslySetInnerHTML={{ __html: props.hair_color }} />
              </li>
            </ul>
            <h2 className="font-bold text-xl mb-2 mt-5">Profession</h2>
            <ul>{renderList(props.professions)}</ul>
            <h2 className="font-bold text-xl mb-2 mt-5">Friends</h2>
            <ul>{renderList(props.friends)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
