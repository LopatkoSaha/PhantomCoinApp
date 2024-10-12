import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartCurrCoursesProps {
  data: { name: string; value: number }[];
}

export const ChartCurrCourses: React.FC<ChartCurrCoursesProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={600}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fontSize: 24, fill: "#fff" }} />
      <YAxis tick={{ fontSize: 24, fill: "#fff" }} />
      <Tooltip />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);
