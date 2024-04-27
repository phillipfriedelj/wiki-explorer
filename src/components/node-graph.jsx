import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function NodeGraph() {
  const ref = useRef();
  const [nodes, setNodes] = useState([{ id: 0, depth: 0 }]);
  const [links, setLinks] = useState([]);

  const width = 800;
  const height = 600;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    function updateGraph() {
      // Handle the links
      const link = svg
        .selectAll(".link")
        .data(links)
        .join("line")
        .attr("class", "link")
        .style("stroke", "#aaa");

      // Handle the nodes
      const node = svg
        .selectAll(".node")
        .data(nodes, (d) => d.id)
        .join("g")
        .attr("class", "node")
        .call(drag(simulation));

      node
        .append("circle")
        .attr("r", 20)
        .style("fill", (d) => d3.schemeCategory10[d.depth % 10]);

      node
        .append("text")
        .text((d) => `Node ${d.id}`)
        .attr("x", 0)
        .attr("y", 3)
        .style("text-anchor", "middle")
        .style("fill", "#fff")
        .style("pointer-events", "none");

      node
        .on("mouseover", (_, d) => {
          d3.select("#info").text(`Node ${d.id} at depth ${d.depth}`);
        })
        .on("mouseout", () => {
          d3.select("#info").text("");
        })
        .on("click", (event, d) => {
          console.log("CLICKED ON -- ", d);
          toggleChildren(d);
        });

      simulation.nodes(nodes).on("tick", ticked);
      simulation.force("link").links(links);

      function ticked() {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      }
    }

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    function toggleChildren(node) {
      console.log("NODE", node.depth);
      if (node.depth < 2) {
        console.log("Inside if", node.depth);
        const existingChildren = nodes.filter((n) => n.parent === node.id);
        console.log("EC ", existingChildren);
        if (existingChildren.length === 0) {
          const newNodes = [1, 2].map((n) => ({
            id: `${node.id}-${n}`,
            depth: node.depth + 1,
            parent: node.id,
          }));
          console.log("NEW NODES :: ", newNodes);
          setNodes([...nodes, ...newNodes]);
          setLinks([
            ...links,
            ...newNodes.map((n) => ({ source: node.id, target: n.id })),
          ]);
        } else {
          const newNodes = nodes.filter(
            (n) =>
              n.id !== existingChildren[0].id && n.id !== existingChildren[1].id
          );
          const newLinks = links.filter(
            (l) =>
              l.source.id !== existingChildren[0].id &&
              l.source.id !== existingChildren[1].id
          );
          setNodes(newNodes);
          setLinks(newLinks);
        }
      }
    }

    updateGraph();
  }, [nodes, links]);

  return (
    <div className="bg-gray-600 flex-1 w-full">
      <svg ref={ref} className="flex grow"></svg>
      <div id="info"></div>
    </div>
  );
}

export default NodeGraph;
