<script>
  import { registerNode } from "../trees.js";
  import branch from "./branch.vue";
  import leaf from "./leaf.vue";
  // import { range } from "lodash";
  export default{
    name: 'tree-branch',
    props: {
      tid: Number, // the outermost tree component's  tid
      source: Array, // only passed to top level tree nodes
      level:{ type: Number, default: 0 },
      label: { type: String },
      ico:{ type: Object, required: true }, // classnames already mapped
      icon: String,
      id: {},
      nodes: Array,
      expanded: { type: Boolean, default: true },
      activeNode: {},
      format: Function // the function used by tree to parse data
    },
    data(){
      return {
        isExpanded: this.expanded,
        nid: 0
      };
    },
    components:{
      'tree-branch': branch,
      'tree-leaf': leaf
    },
    computed:{
      // emptyRange(){
      //   let i=this.level, ret=[];
      //   while( i > 0 ){
      //     ret.push('');
      //     i--;
      //   }
      //   return ret;
      //   // return range( this.level ).map( n=>'' );
      // },
      elbowIcon(){
        if( this.nodes ) return this.ico[ this.isExpanded ? 'expand' : 'retract'];
        return false;
      },
      isActive(){

      },
      nodeItems(){
        return this.source || this.nodes;
      },
      nodeLabel(){// data representing the leaf portion of this node
        let { label, nodes }=this;
        if( this.source ){// this is the root node but might not have a root setup
          if( this.root ){
            label=this.root.label;

          }
        }
        if( !label ) return false;
        return label;
      },
      mainIcon(){// a folder or leaf or custom
        if( this.nodes ) return this.ico[ this.isExpanded ? 'open' : 'closed' ];
        return this.ico.leaf;
      }
    },
    methods:{
      // iconClass( name ){
      //   return `${this.iconBase} ${this.iconPrefix}${name}`;
      // },
      toggle(){
        if( this.nodes ){
          this.isExpanded=!this.isExpanded;
          console.log ('treenode toggle, expanded?', this.elbowIcon )
        }
      },
      selectPassThrough( id ){
        this.$emit( 'select', id );
      },
      selectNode(){
        this.$emit('select', this.id );
      }
    },
    created(){
      this.nid=registerNode( this, this.tid );
      console.log( 'node id', this.nid );
    },
    watch:{}
  }
</script>
<template>
  <div class="tree-branch" :class="{'vue-tree': source }">

    <tree-leaf
      v-if="nodeLabel"
      :label="nodeLabel"
      :level="level"
      :elbowIcon="elbowIcon"
      :expandIcon="ico.expand"
      :retractIcon="ico.retract"
      :mainIcon="mainIcon"
      :id="id"
      :class="{'is-active': false }"
      @toggle="toggle"
      @select="selectNode">
    </tree-leaf>


    <div class="leaf-nodes" v-if="nodeItems" v-show="isExpanded">
      <tree-branch
        v-for="node in nodeItems"
        :tid="tid"
        :id="node.id"
        :key="node.id"
        :icon="node.icon"
        :ico="ico"
        :level="node.level"
        :label="node.label"
        :nodes="node.nodes"
        :active-node="activeNode"
        @select="selectPassThrough">
      </tree-branch>
    </div>
  </div>
</template>
