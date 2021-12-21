import { useState } from "react";
import Chart from "react-google-charts";

const Graphic = ({ graphValues }) => {

  return (
    <div>
      <div>
        <Chart
          width={'500px'}
          height={'570px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Meses', 'valor'],
            ['Janeiro', graphValues.janeiro],
            ['Fevereiro', graphValues.fevereiro],
            ['Março', graphValues.marco],
            ['Abril', graphValues.abril],
            ['Maio', graphValues.maio],
            ['Junho', graphValues.junho],
            ['Julho', graphValues.julho],
            ['Agosto', graphValues.agosto],
            ['Setembro', graphValues.setembro],
            ['Outubro', graphValues.outubro],
            ['Novembro', graphValues.novembro],
            ['Dezembro', graphValues.dezembro]
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
