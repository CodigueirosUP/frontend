import { useState } from "react";
import Chart from "react-google-charts";

const Graphic = ({ graphValues }) => {

  const months = {
    janeiro: 0,
    fevereiro: 0,
    marco: 0,
    abril: 0,
    maio: 0,
    junho: 0,
    julho: 0,
    agosto: 0,
    setembro: 0,
    outubro: 0,
    novembro: 0,
    dezembro:0
  }

  graphValues.forEach((data, index) => {
    if (index === 0) {
      months.janeiro = data.valor
    }
    if (index === 1) {
      months.fevereiro = data.valor
    }
    if (index === 2) {
      months.marco = data.valor
    }
    if (index === 3) {
      months.abril = data.valor
    }
    if (index === 4) {
      months.maio = data.valor
    }
    if (index === 5) {
      months.junho = data.valor
    }
    if (index === 6) {
      months.julho = data.valor
    }
    if (index === 7) {
      months.agosto = data.valor
    }
    if (index === 8) {
      months.setembro = data.valor
    }
    if (index === 9) {
      months.outubro = data.valor
    }
    if (index === 10) {
      months.novembro = data.valor
    }
    if (index === 11) {
      months.dezembro = data.valor
    }
  })

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
            ['Janeiro', months.janeiro],
            ['Fevereiro', months.fevereiro],
            ['Março', months.marco],
            ['Abril', months.abril],
            ['Maio', months.maio],
            ['Junho', months.junho],
            ['Julho', months.julho],
            ['Agosto', months.agosto],
            ['Setembro', months.setembro],
            ['Outubro', months.outubro],
            ['Novembro', months.novembro],
            ['Dezembro', months.dezembro]
          ]}
          options={{
            chart: {
              title: 'Gastos dos ultimos 12 meses',
              subtitle: 'Gastos dos ultimos 12 meses',
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    </div>
  )
}

export default Graphic;
