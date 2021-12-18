import Chart from "react-google-charts";

const Graphic = () => {
  return (
    <div>
      <div>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Meses', 'valor'],
            ['janeiro', 1000],
            ['fevereiro', 1170],
            ['março', 660],
            ['abril', 1030],
          ]}
          options={{
            // Material design options
            chart: {
              title: 'Gastos dos ultimos 12 meses',
              subtitle: 'Gastos dos ultimos 12 meses',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    </div>
  )
}

export default Graphic;
