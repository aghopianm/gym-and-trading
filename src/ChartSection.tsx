import { Section, SectionTitle, ChartContainer } from "./DataDashboardStyles";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartSection = ({
  title,
  dataKey,
  color,
  data,
}: {
  title: string;
  dataKey: string;
  color: string;
  data: any[];
}) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <ChartContainer>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Section>
);

export default ChartSection;
