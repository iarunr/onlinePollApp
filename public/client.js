const socket = io();
var ctx = document.getElementById("myChart").getContext("2d");
const btn = document.getElementById("btn");
const form = document.getElementById("form");
const totalVotes = document.getElementById("total-votes");

var total;

socket.on("user-connected", (data) => {
  console.log(data.msg);
});

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

async function loadData() {
  const res = await fetch(`${window.location.href}polls`);
  const data = await res.json();
  if (res.status == 200) {
    //console.log(data);
    total = data.totalVotes;
    totalVotes.innerHTML = `Total Votes: ${total}`;
    myChart.data.datasets[0].data[0] = data.windows;
    myChart.data.datasets[0].data[1] = data.linux;
    myChart.data.datasets[0].data[2] = data.macOS;
    myChart.data.datasets[0].data[3] = data.android;
    myChart.data.datasets[0].data[4] = data.ios;
    myChart.update();
  } else {
    console.log("server error!");
  }
}
loadData();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const voted = document.querySelector("input[name=OS]:checked").value;
  const choice = { os: voted };
  var selection;
  //console.log(choice);

  switch (choice.os) {
    case "Windows":
      selection = 0;
      break;

    case "Linux":
      selection = 1;
      break;

    case "MacOS":
      selection = 2;
      break;

    case "Android":
      selection = 3;
      break;

    case "Ios":
      selection = 4;
      break;
  }

  const url = `${window.location.href}polls`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(choice),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  //get response
  const data = await res.json();
  if (res.status == 200) {
    myChart.data.datasets[0].data[selection]++;
    myChart.update();
    total++;
    totalVotes.innerHTML = `Total Votes: ${total}`;
    socket.emit("user-voted", {
      vote: selection,
      total,
    });
  } else if (res.status === 406) {
    document.getElementById("error-msg").innerHTML = data.msg;
    document.getElementById("error-msg").style.display = "block";
  } else {
    window.location.href = "/polls/error";
  }
});

socket.on("vote-complete", (data) => {
  myChart.data.datasets[0].data[data.vote]++;
  myChart.update();
  totalVotes.innerHTML = `Total Votes: ${data.total}`;
});
