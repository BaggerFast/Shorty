'use client'

// import Chart from 'chart.js/auto'
// import { useEffect, useRef } from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useAppSelector } from '@/redux/hooks'
import { useGetLinkAnalyticsQuery } from '@/redux/Api/analyzeApi'
// import { Doughnut } from 'react-chartjs-2'
//
// ChartJS.register(ArcElement, Tooltip, Legend)

export default function BrowserDoughnutChart() {
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  const { data } = useGetLinkAnalyticsQuery(selectedLink.uid)
  console.log(data)
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //       ],
  //       borderWidth: 1
  //     }
  //   ]
  // }
  //
  // return <Doughnut data={data} />
  return null
}
