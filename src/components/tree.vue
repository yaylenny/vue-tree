<script>
import { registerTree } from "../trees.js";
import branch from "./branch.vue";

export default{
  props: {
    source: Array,
    root: {},
    labelProp: { type: String, default: 'label'},
    nodesProp: { type: String, default: 'items'},
    idProp:{ type: String, default: 'id' },
    iconBase:{ type: String, default: 'fas fw' },
    iconPrefix: { type: String, default: 'fa-' },
    closedIcon:{ type: String, default: 'folder' },
    openIcon:{ type: String, default: 'folder-open' },
    leafIcon:{ type: String, default: 'leaf' },
    expandIcon:{ type: String, default: 'caret-down' },
    retractIcon:{ type: String, default: 'caret-right' },
    size: { type: String, default: 'default' },
    parent:{}
  },
  data(){
    let icons={
      base: this.iconBase,
      prefix: this.iconPrefix,
      closed: this.closedIcon,
      open: this.openIcon,
      expand: this.expandIcon,
      retract: this.retractIcon,
      leaf: this.leafIcon
    };

    let keys={
      label: this.labelProp,
      nodes: this.nodesProp,
      id: this.idProp
    }
    return {
      tid: 0,
      activeNodeID: 0,
      inDespose: true, // change this to false when ready to use again, dumbass
      keys,
      icons,
      ico:{}
    };
  },
  components:{
    'tree-branch': branch
  },
  computed:{
    // ico(){
    //   let { base, prefix }=this.icons;
    //   return Object.keys( this.icons ).reduce(( ret, key )=>{
    //     if([ 'base', 'prefix'].indexOf( key ) < 0 ){
    //       ret[ key ]=`${base} ${prefix}${this.icons[key]}`;
    //     }
    //     return ret;
    //   }, {});
    // },
    activeNode:{
      get(){

      },
      set( node ){

      }
    },
    treeNodes(){
      let { labelProp, nodesProp }=this;
      if( this.source ){
        let nodes=this.source.map( node=>this.formatTreeNode( node ))
        return nodes;
      }
    }
  },
  methods:{
    formatTreeNode( node, level=0 ){
      let { idProp, labelProp, nodesProp }=this;
      let label=node[ labelProp ];
      let nodes=node[ nodesProp ];
      let id=node[ idProp ];
      if( !label ) return console.error('label key missing', labelProp, node );

      let treeNode={ id, label, level, node };
      if( nodes ) treeNode.nodes=nodes.map( node=>this.formatTreeNode( node, level+1 ) );
      return treeNode;
    },
    selectNode( id ){
      console.log( 'select node', id );
      this.$emit( 'select', id );
    },
    setupIcons(){
      let { icons }=this;
      let { base, prefix }=icons;
      [ 'closed', 'open', 'expand', 'retract', 'leaf' ].forEach( n=>{
        this.$set( this.ico, n, `${base} ${prefix}${icons[n]}`)
      });
      // console.log( 'setup icons in tree', this.ico )
    }

  },
  created(){
    this.tid=registerTree( this );
    this.setupIcons();
  },
  watch:{}
}
</script>

<template>
<tree-branch
  :tid="tid"
  :key="tid"
  :source="treeNodes"
  :root="root"
  :active-node="activeNode"
  :ico="ico"
  @select="selectNode">
</tree-branch>
</template>

<style lang="scss" src="../tree.scss"></style>
