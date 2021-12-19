import { useState } from "react";
import Chart from "react-google-charts";

const Graphic = () => {

  const [dataValues, setDataValues] = useState([]);

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
            ['Janeiro', 100],
            ['Fevereiro', 300],
            ['Março', 200],
            ['Abril', 400],
            ['Maio', 600],
            ['Junho', 500],
            ['Julho', 700],
            ['Agosto', 900],
            ['Setembro', 800],
            ['Outubro', 400],
            ['Novembro', 500],
            ['Dezembro', 600]
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
