import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart,Legend, CartesianGrid,Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';




const ReportTable = ({data}) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            isAnimationActive={false}
            name="Pajamos"
            type="basis"
            dataKey="income"
            stroke={theme.palette.primary.main}
            color={theme.palette.primary.main}
            dot={false}
          />
          <Line
            name="Išlaidos"
            isAnimationActive={false}
            type="basis"
            dataKey="costs"
            stroke="red"
            dot={false}
          />
           <Line
            name="Pelnas"
            isAnimationActive={false}
            type="basis"
            dataKey="profit"
            stroke="green"
            dot={false}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default ReportTable