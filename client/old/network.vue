// Note that no d3 'tick' is needed here, because Vue handles the updates.
<template>
    <svg :width="width" :height="height">
        <g :style="{transform: `translate(${width/2}px, ${height/2}px)`}">
            <g class="links">
                <line v-for="edge in edges"
                      :stroke-width="Math.sqrt(edge.value)"
                      :x1="edge.source.x"
                      :y1="edge.source.y"
                      :x2="edge.target.x"
                      :y2="edge.target.y">
                </line>
            </g>
            <g class="nodes">
                <circle v-for="node in nodes"
                        :r="node.size * 2" :cx="node.x" :cy="node.y">
                    <title>{{ node._id }}</title>
                </circle>
            </g>
        </g>
    </svg>
</template>

<script>
  import d3 from 'd3';
  import ForceLayout from './forceLayout';

  export default {
    props: {
      width: {
        type: Number,
        default: 800
      },
      height: {
        type: Number,
        default: 600
      }
    },

    data: function() { // default data initialization
      return  {
        mNodes: [],
        mEdges: [],
        nodes: [],
        edges: []
      }
    },

    // Subscribe to network, and update data from observer
    meteor: {
      $subscribe: {
        'network': []
      },
      mNodes() {
        return Nodes.find();
      },
      mEdges() {
        return Edges.find();
      }
    },

    // Create properties on these arrays before modifying them on the simulation
    watch: {
      mNodes() {
        const ns = this.mNodes.map(a => Object.assign({}, a));
        this.simulation.nodes(ns);

        // This triggers Vue to set up observers
        this.nodes = ns;
      },
      mEdges() {
        const es = this.mEdges.map(a => Object.assign({}, a));

        this.simulation.force("link")
          .links(es);

        this.edges = es;
      }
    },

    created: function() {
      this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id( function(d) { return d._id; } ))
        .force("charge", d3.forceManyBody())
        // already centered by outside g
        .force("center", d3.forceCenter(0, 0));

    },
    mounted: function() {
      this.drag = d3.drag()
        .on("start", (d, i) => {
          if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();

          const node = this.nodes[i];
          node.fx = node.x;
          node.fy = node.y;
        })
        .on("drag", (d, i) => {
          const node = this.nodes[i];
          node.fx = d3.event.x;
          node.fy = d3.event.y;
        })
        .on("end", (d, i) => {
          if (!d3.event.active) this.simulation.alphaTarget(0);
          const node = this.nodes[i];
          node.fx = null;
          node.fy = null;
        });
    },
    updated: function() {
      d3.select(this.$el).selectAll(".nodes circle").call(this.drag);
    },

    methods: {

    }

  }
</script>

<style>
    .links line {
        stroke: #999;
        stroke-opacity: 0.6;
    }

    .nodes circle {
        stroke: #fff;
        stroke-width: 1.5px;
    }
</style>
