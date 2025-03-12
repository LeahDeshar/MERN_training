import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-dashboardhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboardhome.component.html',
  styleUrl: './dashboardhome.component.css',
})
export class DashboardhomeComponent implements OnInit {
  @ViewChild('chartContainer') private chartContainer: ElementRef =
    new ElementRef(null);
  transactions = [
    { description: 'Groceries', amount: 120 },
    { description: 'Rent', amount: 1500 },
    { description: 'Internet Bill', amount: 60 },
  ];

  budgetUsage = 62;

  public lineChartLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    const data = [25, 40, 55, 70, 90, 100, 130];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Select the chart container and set the dimensions
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create a scale for the x-axis based on data length
    const x = d3
      .scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Create a scale for the y-axis based on the max data value
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create bars for the chart
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        const value = x(i.toString());
        return value !== undefined ? value : 0; // Ensure the return type is a number
      })
      .attr('y', (d) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d))
      .attr('fill', '#69b3a2');

    // Add x-axis
    svg
      .append('g')
      .selectAll('.x-axis')
      .data([0])
      .enter()
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
}
