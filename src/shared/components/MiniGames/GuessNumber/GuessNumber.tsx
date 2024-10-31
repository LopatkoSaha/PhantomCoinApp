import style from "./GuessNumber.module.scss";

interface Data {
  id: number;
  name: string;
  age: number;
  city: string;
}

const data: Data[] = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 35, city: "Chicago" },
];

export const GuessNumber: React.FC = () => {
  const headers = Object.keys(data[0]) as (keyof Data)[];

  return (
    <table border={1} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              style={{
                padding: "8px",
                backgroundColor: "#f2f2f2",
                color: "black",
              }}
            >
              {header.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={header} style={{ padding: "8px", textAlign: "center" }}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
