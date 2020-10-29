const socket = io();
var ctx = document.getElementById("myChart").getContext("2d");
const btn = document.getElementById("btn");
const form = document.getElementById("form");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Windows", "Linux", "MacOS", "Android", "Ios"],
    datasets: [
      {
        label: "Best Operating Systems",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const voted = document.querySelector("input[name=OS]:checked").value;
  const choice = { os: voted };
  console.log(choice);
  const url = `${window.location.href}polls`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(choice),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const data = await res.json();
  console.log(data);
});

// function myFunction() {
//   myChart.data.datasets[0].data[0] = 5;
//   myChart.update();
// }
