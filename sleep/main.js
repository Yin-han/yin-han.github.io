// ---- D3 Start 20:00–20:30 ----

const sleepData = [
  { age: "16-20", value: 12.41 },
  { age: "21-25", value: 15.99 },
  { age: "26-30", value: 13.02 },
  { age: "31-35", value: 16.52 },
  { age: "36-40", value: 10.10 },
  { age: "41-45", value: 11.05 },
  { age: "46-50", value: 12.16 },
  { age: "51-55", value: 11.44 },
  { age: "56-60", value: 11.28 }
];

const margin = { top: 50, right: 30, bottom: 40, left: 80 };
const width = 800 - margin.left - margin.right;
const height = 400;

const svg = d3.select("#sleep-bar-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Y轴
const y = d3.scaleBand()
  .domain(sleepData.map(d => d.age))
  .range([0, height])
  .padding(0.2);

svg.append("g")
  .call(d3.axisLeft(y).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

// ✨ 添加 Y 轴标题：Age
svg.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

// X轴
const x = d3.scaleLinear()
  .domain([0, 20])  // 手动设置最大值为 20
  .range([0, width]);


svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x)
    .tickValues(d3.range(0, 21, 2))
    .tickFormat(d => d))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

// ✨ 创建 tooltip（白底，两行）
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);


// bar颜色 + 交互 + tooltip
svg.selectAll("myRect")
  .data(sleepData)
  .enter()
  .append("rect")
  .attr("x", x(0))
  .attr("y", d => y(d.age))
  .attr("width", d => x(d.value))
  .attr("height", y.bandwidth())
  .attr("fill", d => (d.age === "31-35" || d.age === "36-40") ? "#35388e" : "#acaee2")
  .attr("transform", "scale(1)")
  .style("transform-box", "fill-box")
  .style("transform-origin", "left center")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)");

    tooltip
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>People Asleep: ${d.value}%`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltip
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");

    tooltip
      .style("opacity", 0);
  });

// X轴标题
svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("% of People Asleep");



  // ---- D3 SQ 20:00–20:30 ----
const sleepQualityData = [
  { "age": "16-20", "value": 4.76 },
  { "age": "21-25", "value": 5.31 },
  { "age": "26-30", "value": 6.42 },
  { "age": "31-35", "value": 5.25 },
  { "age": "36-40", "value": 5.48 },
  { "age": "41-45", "value": 5.35 },
  { "age": "46-50", "value": 5.54 },
  { "age": "51-55", "value": 5.51 },
  { "age": "56-60", "value": 5.32 }
];

const maxSQ = 6.42;
const minSQ = 4.76;

const marginSQ = { top: 50, right: 30, bottom: 40, left: 80 };
const widthSQ = 800 - marginSQ.left - marginSQ.right;
const heightSQ = 400;

const svgSQ = d3.select("#sleep-quality-chart")  // 你可以换成特定容器
  .append("svg")
  .attr("width", widthSQ + marginSQ.left + marginSQ.right)
  .attr("height", heightSQ + marginSQ.top + marginSQ.bottom)
  .append("g")
  .attr("transform", `translate(${marginSQ.left},${marginSQ.top})`);

const ySQ = d3.scaleBand()
  .domain(sleepQualityData.map(d => d.age))
  .range([0, heightSQ])
  .padding(0.2);

svgSQ.append("g")
  .call(d3.axisLeft(ySQ).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svgSQ.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const xSQ = d3.scaleLinear()
  .domain([0, 8])
  .range([0, widthSQ]);

svgSQ.append("g")
  .attr("transform", `translate(0,${heightSQ})`)
  .call(d3.axisBottom(xSQ))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svgSQ.append("text")
  .attr("x", widthSQ / 2)
  .attr("y", heightSQ + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Avg. Sleep Quality");

const tooltipSQ = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svgSQ.selectAll("rect")
  .data(sleepQualityData)
  .enter()
  .append("rect")
  .attr("x", xSQ(0))
  .attr("y", d => ySQ(d.age))
  .attr("width", d => xSQ(d.value))
  .attr("height", ySQ.bandwidth())
  .attr("fill", d => d.value === maxSQ || d.value === minSQ ? "#dd3131" : "#edb1b1")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)")
      .style("transform-origin", "left center")
      .style("transform-box", "fill-box");

    tooltipSQ
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>Avg. Sleep Quality: ${d.value.toFixed(2)}`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltipSQ
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");

    tooltipSQ.style("opacity", 0);
  });


//   Start 20:30–21:00 蓝
const sleepData2030 = [
  { age: "16-20", value: 12.41 },
  { age: "21-25", value: 12.79 },
  { age: "26-30", value: 11.28 },
  { age: "31-35", value: 8.18 },
  { age: "36-40", value: 10.96 },
  { age: "41-45", value: 12.98 },
  { age: "46-50", value: 11.32 },
  { age: "51-55", value: 12.11 },
  { age: "56-60", value: 13.04 }
];

const margin2030 = { top: 50, right: 30, bottom: 40, left: 80 };
const width2030 = 800 - margin2030.left - margin2030.right;
const height2030 = 400;

const svg2030 = d3.select("#sleep-bar-chart-2030")
  .append("svg")
  .attr("width", width2030 + margin2030.left + margin2030.right)
  .attr("height", height2030 + margin2030.top + margin2030.bottom)
  .append("g")
  .attr("transform", `translate(${margin2030.left},${margin2030.top})`);

const y2030 = d3.scaleBand()
  .domain(sleepData2030.map(d => d.age))
  .range([0, height2030])
  .padding(0.2);

svg2030.append("g")
  .call(d3.axisLeft(y2030).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svg2030.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const x2030 = d3.scaleLinear()
  .domain([0, 20]) // 同样设定上限为20
  .range([0, width2030]);

svg2030.append("g")
  .attr("transform", `translate(0,${height2030})`)
  .call(d3.axisBottom(x2030).tickValues(d3.range(0, 21, 2)))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svg2030.append("text")
  .attr("x", width2030 / 2)
  .attr("y", height2030 + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("% of People Asleep");

const tooltip2030 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svg2030.selectAll("rect")
  .data(sleepData2030)
  .enter()
  .append("rect")
  .attr("x", x2030(0))
  .attr("y", d => y2030(d.age))
  .attr("width", d => x2030(d.value))
  .attr("height", y2030.bandwidth())
  .attr("fill", d => (d.age === "56-60" || d.age === "31-35") ? "#35388e" : "#acaee2") //颜色
  .attr("transform", "scale(1)")
  .style("transform-box", "fill-box")
  .style("transform-origin", "left center")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)");

    tooltip2030
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>People Asleep: ${d.value.toFixed(2)}%`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltip2030
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");

    tooltip2030.style("opacity", 0);
  });



  

//   SQ 20:30–21:00 红
const sleepQualityData2030 = [
  { age: "16-20", value: 5.92 },
  { age: "21-25", value: 5.60 },
  { age: "26-30", value: 4.96 },  // 最小值
  { age: "31-35", value: 5.96 },
  { age: "36-40", value: 5.42 },
  { age: "41-45", value: 5.65 },
  { age: "46-50", value: 5.15 },
  { age: "51-55", value: 6.01 },  // 最大值
  { age: "56-60", value: 5.80 }
];

const maxVal2030 = 6.01;
const minVal2030 = 4.96;

const marginSQ2030 = { top: 50, right: 30, bottom: 40, left: 80 };
const widthSQ2030 = 800 - marginSQ2030.left - marginSQ2030.right;
const heightSQ2030 = 400;

const svgSQ2030 = d3.select("#sq-chart-2030")
  .append("svg")
  .attr("width", widthSQ2030 + marginSQ2030.left + marginSQ2030.right)
  .attr("height", heightSQ2030 + marginSQ2030.top + marginSQ2030.bottom)
  .append("g")
  .attr("transform", `translate(${marginSQ2030.left},${marginSQ2030.top})`);

const ySQ2030 = d3.scaleBand()
  .domain(sleepQualityData2030.map(d => d.age))
  .range([0, heightSQ2030])
  .padding(0.2);

svgSQ2030.append("g")
  .call(d3.axisLeft(ySQ2030).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svgSQ2030.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const xSQ2030 = d3.scaleLinear()
  .domain([0, 8])
  .range([0, widthSQ2030]);

svgSQ2030.append("g")
  .attr("transform", `translate(0,${heightSQ2030})`)
  .call(d3.axisBottom(xSQ2030))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svgSQ2030.append("text")
  .attr("x", widthSQ2030 / 2)
  .attr("y", heightSQ2030 + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Avg. Sleep Quality");

const tooltipSQ2030 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svgSQ2030.selectAll("rect")
  .data(sleepQualityData2030)
  .enter()
  .append("rect")
  .attr("x", xSQ2030(0))
  .attr("y", d => ySQ2030(d.age))
  .attr("width", d => xSQ2030(d.value))
  .attr("height", ySQ2030.bandwidth())
  .attr("fill", d => d.value === maxVal2030 || d.value === minVal2030 ? "#dd3131" : "#edb1b1")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)")
      .style("transform-origin", "left center")
      .style("transform-box", "fill-box");

    tooltipSQ2030
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>Avg. Quality: ${d.value.toFixed(2)}`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltipSQ2030
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");

    tooltipSQ2030.style("opacity", 0);
  });



//   Start 23:00-23:30 蓝
const sleepData2330 = [
  { age: "16-20", value: 12.41 },
  { age: "21-25", value: 12.43 },
  { age: "26-30", value: 12.15 },
  { age: "31-35", value: 12.27 },
  { age: "36-40", value: 13.53 },
  { age: "41-45", value: 14.39 },
  { age: "46-50", value: 11.49 },
  { age: "51-55", value: 12.44 },
  { age: "56-60", value: 12.84 }
];

const max2330 = d3.max(sleepData2330, d => d.value);
const min2330 = d3.min(sleepData2330, d => d.value);

const margin2330 = { top: 50, right: 30, bottom: 40, left: 80 };
const width2330 = 800 - margin2330.left - margin2330.right;
const height2330 = 400;

const svg2330 = d3.select("#sleep-chart-2330")
  .append("svg")
  .attr("width", width2330 + margin2330.left + margin2330.right)
  .attr("height", height2330 + margin2330.top + margin2330.bottom)
  .append("g")
  .attr("transform", `translate(${margin2330.left},${margin2330.top})`);

const y2330 = d3.scaleBand()
  .domain(sleepData2330.map(d => d.age))
  .range([0, height2330])
  .padding(0.2);

svg2330.append("g")
  .call(d3.axisLeft(y2330).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svg2330.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const x2330 = d3.scaleLinear()
  .domain([0, 20])
  .range([0, width2330]);

svg2330.append("g")
  .attr("transform", `translate(0,${height2330})`)
  .call(d3.axisBottom(x2330)
    .tickValues(d3.range(0, 21, 2))
    .tickFormat(d => d))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svg2330.append("text")
  .attr("x", width2330 / 2)
  .attr("y", height2330 + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("% of People Asleep");

const tooltip2330 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svg2330.selectAll("rect")
  .data(sleepData2330)
  .enter()
  .append("rect")
  .attr("x", x2330(0))
  .attr("y", d => y2330(d.age))
  .attr("width", d => x2330(d.value))
  .attr("height", y2330.bandwidth())
  .attr("fill", d => (d.value === max2330 || d.value === min2330) ? "#35388e" : "#acaee2")
  .attr("transform", "scale(1)")
  .style("transform-box", "fill-box")
  .style("transform-origin", "left center")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)");

    tooltip2330
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>People Asleep: ${d.value.toFixed(2)}%`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltip2330
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");
    tooltip2330.style("opacity", 0);
  });



  //   SQ 23:00–23:30 红
const sleepQualityData2330 = [
  { age: "16-20", value: 5.74 },
  { age: "21-25", value: 5.79 },
  { age: "26-30", value: 5.86 },
  { age: "31-35", value: 5.53 },
  { age: "36-40", value: 5.90 },
  { age: "41-45", value: 5.52 }, // 最小值
  { age: "46-50", value: 5.60 },
  { age: "51-55", value: 6.02 }, // 最大值
  { age: "56-60", value: 5.76 }
];

const maxVal2330 = 6.02;
const minVal2330 = 5.52;

const marginSQ2330 = { top: 50, right: 30, bottom: 40, left: 80 };
const widthSQ2330 = 800 - marginSQ2330.left - marginSQ2330.right;
const heightSQ2330 = 400;

const svgSQ2330 = d3.select("#sq-chart-2330")
  .append("svg")
  .attr("width", widthSQ2330 + marginSQ2330.left + marginSQ2330.right)
  .attr("height", heightSQ2330 + marginSQ2330.top + marginSQ2330.bottom)
  .append("g")
  .attr("transform", `translate(${marginSQ2330.left},${marginSQ2330.top})`);

const ySQ2330 = d3.scaleBand()
  .domain(sleepQualityData2330.map(d => d.age))
  .range([0, heightSQ2330])
  .padding(0.2);

svgSQ2330.append("g")
  .call(d3.axisLeft(ySQ2330).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svgSQ2330.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const xSQ2330 = d3.scaleLinear()
  .domain([0, 8])
  .range([0, widthSQ2330]);

svgSQ2330.append("g")
  .attr("transform", `translate(0,${heightSQ2330})`)
  .call(d3.axisBottom(xSQ2330))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svgSQ2330.append("text")
  .attr("x", widthSQ2330 / 2)
  .attr("y", heightSQ2330 + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Avg. Sleep Quality");

const tooltipSQ2330 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svgSQ2330.selectAll("rect")
  .data(sleepQualityData2330)
  .enter()
  .append("rect")
  .attr("x", xSQ2330(0))
  .attr("y", d => ySQ2330(d.age))
  .attr("width", d => xSQ2330(d.value))
  .attr("height", ySQ2330.bandwidth())
  .attr("fill", d => d.value === maxVal2330 || d.value === minVal2330 ? "#dd3131" : "#edb1b1")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)")
      .style("transform-origin", "left center")
      .style("transform-box", "fill-box");

    tooltipSQ2330
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>Avg. Quality: ${d.value.toFixed(2)}`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltipSQ2330
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");

    tooltipSQ2330.style("opacity", 0);
  });



  //   Start 23:30-24:00 蓝
const sleepData2330v2 = [
  { age: "16-20", value: 16.06 },
  { age: "21-25", value: 13.14 },
  { age: "26-30", value: 13.37 },
  { age: "31-35", value: 12.44 },
  { age: "36-40", value: 11.82 },
  { age: "41-45", value: 10.18 }, // min
  { age: "46-50", value: 13.01 },
  { age: "51-55", value: 12.27 },
  { age: "56-60", value: 13.04 }
];

const max2330v2 = d3.max(sleepData2330v2, d => d.value);
const min2330v2 = d3.min(sleepData2330v2, d => d.value);

const margin2330v2 = { top: 50, right: 30, bottom: 40, left: 80 };
const width2330v2 = 800 - margin2330v2.left - margin2330v2.right;
const height2330v2 = 400;

const svg2330v2 = d3.select("#sleep-chart-2330-late")
  .append("svg")
  .attr("width", width2330v2 + margin2330v2.left + margin2330v2.right)
  .attr("height", height2330v2 + margin2330v2.top + margin2330v2.bottom)
  .append("g")
  .attr("transform", `translate(${margin2330v2.left},${margin2330v2.top})`);

const y2330v2 = d3.scaleBand()
  .domain(sleepData2330v2.map(d => d.age))
  .range([0, height2330v2])
  .padding(0.2);

svg2330v2.append("g")
  .call(d3.axisLeft(y2330v2).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svg2330v2.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const x2330v2 = d3.scaleLinear()
  .domain([0, 20])
  .range([0, width2330v2]);

svg2330v2.append("g")
  .attr("transform", `translate(0,${height2330v2})`)
  .call(d3.axisBottom(x2330v2)
    .tickValues(d3.range(0, 21, 2))
    .tickFormat(d => d))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svg2330v2.append("text")
  .attr("x", width2330v2 / 2)
  .attr("y", height2330v2 + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("% of People Asleep");

const tooltip2330v2 = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svg2330v2.selectAll("rect")
  .data(sleepData2330v2)
  .enter()
  .append("rect")
  .attr("x", x2330v2(0))
  .attr("y", d => y2330v2(d.age))
  .attr("width", d => x2330v2(d.value))
  .attr("height", y2330v2.bandwidth())
  .attr("fill", d => (d.value === max2330v2 || d.value === min2330v2) ? "#35388e" : "#acaee2")
  .attr("transform", "scale(1)")
  .style("transform-box", "fill-box")
  .style("transform-origin", "left center")
  .on("mouseover", function (event, d) {
    d3.select(this).transition().duration(150).attr("transform", "scale(1.02)");
    tooltip2330v2
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>People Asleep: ${d.value.toFixed(2)}%`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltip2330v2
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this).transition().duration(150).attr("transform", "scale(1)");
    tooltip2330v2.style("opacity", 0);
  });


  //   SQ 23:30–24:00 红
  // ---- D3 Sleep Quality Chart for 23:30–24:00 (Version B - Renamed) ----
const sleepQualityData2330B = [
  { age: "16-20", value: 5.80 },
  { age: "21-25", value: 5.47 },
  { age: "26-30", value: 6.36 }, // Max
  { age: "31-35", value: 5.18 },
  { age: "36-40", value: 5.19 },
  { age: "41-45", value: 5.66 },
  { age: "46-50", value: 5.38 },
  { age: "51-55", value: 5.09 }, // Min
  { age: "56-60", value: 5.16 }
];

const maxVal2330B = 6.36;
const minVal2330B = 5.09;

const marginSQ2330B = { top: 50, right: 30, bottom: 40, left: 80 };
const widthSQ2330B = 800 - marginSQ2330B.left - marginSQ2330B.right;
const heightSQ2330B = 400;

const svgSQ2330B = d3.select("#sq-chart-2330b")
  .append("svg")
  .attr("width", widthSQ2330B + marginSQ2330B.left + marginSQ2330B.right)
  .attr("height", heightSQ2330B + marginSQ2330B.top + marginSQ2330B.bottom)
  .append("g")
  .attr("transform", `translate(${marginSQ2330B.left},${marginSQ2330B.top})`);

const ySQ2330B = d3.scaleBand()
  .domain(sleepQualityData2330B.map(d => d.age))
  .range([0, heightSQ2330B])
  .padding(0.2);

svgSQ2330B.append("g")
  .call(d3.axisLeft(ySQ2330B).tickSize(0))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e")
  .style("font-weight", "bold");

svgSQ2330B.append("text")
  .attr("x", -10)
  .attr("y", -15)
  .attr("text-anchor", "start")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Age");

const xSQ2330B = d3.scaleLinear()
  .domain([0, 8])
  .range([0, widthSQ2330B]);

svgSQ2330B.append("g")
  .attr("transform", `translate(0,${heightSQ2330B})`)
  .call(d3.axisBottom(xSQ2330B))
  .selectAll("text")
  .style("font-size", "14px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("fill", "#2e2e2e");

svgSQ2330B.append("text")
  .attr("x", widthSQ2330B / 2)
  .attr("y", heightSQ2330B + 35)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-family", "Ubuntu, sans-serif")
  .style("font-weight", "bold")
  .style("fill", "#2e2e2e")
  .text("Avg. Sleep Quality");

const tooltipSQ2330B = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px 12px")
  .style("background", "white")
  .style("color", "#2e2e2e")
  .style("font-size", "13px")
  .style("border", "1px solid #ccc")
  .style("border-radius", "6px")
  .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)")
  .style("pointer-events", "none")
  .style("line-height", "1.5")
  .style("opacity", 0);

svgSQ2330B.selectAll("rect")
  .data(sleepQualityData2330B)
  .enter()
  .append("rect")
  .attr("x", xSQ2330B(0))
  .attr("y", d => ySQ2330B(d.age))
  .attr("width", d => xSQ2330B(d.value))
  .attr("height", ySQ2330B.bandwidth())
  .attr("fill", d => d.value === maxVal2330B || d.value === minVal2330B ? "#dd3131" : "#edb1b1")
  .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1.02)")
      .style("transform-origin", "left center")
      .style("transform-box", "fill-box");

    tooltipSQ2330B
      .style("opacity", 1)
      .html(`Age: ${d.age}<br>Avg. Quality: ${d.value.toFixed(2)}`)
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mousemove", function (event) {
    tooltipSQ2330B
      .style("left", (event.pageX + 12) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(150)
      .attr("transform", "scale(1)");
    tooltipSQ2330B.style("opacity", 0);
  });



// card
// 处理卡片翻转和双击放大
document.querySelectorAll('.flip-card').forEach(card => {
  const inner = card.querySelector('.flip-card-inner');

  // 点击卡片翻转
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    card.classList.remove('zoomed'); // 翻转时取消放大
    card.classList.remove('fullscreen'); // 翻转时也取消全屏
  });

  // 双击卡片仅在正面时放大（局部放大）
  card.addEventListener('dblclick', () => {
    if (!card.classList.contains('flipped')) {
      card.classList.toggle('zoomed');
    }
  });
});

// 点击右上角按钮放大至全屏
function toggleFullScreen(btn) {
  const card = btn.closest('.flip-card');
  card.classList.toggle('fullscreen');
}



