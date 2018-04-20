<script>
  import { tree } from "../src";
  const tree1=[
    { label: 'People', children:[
      { label: 'Steven', children:[
        { label: 'Debbie' }
      ]}
      ]
    }
  ]
  export default{
    data(){
      return {
        tree1,
        trees:[]
      };
    },
    components:{},
    computed:{},
    methods:{
      buildTree(){

      }
    },
    // mixins:[],
    // created(){},
    // destroyed(){},
    // mounted(){},
    // watch:{}
  }
</script>

<template lang="pug">
  .demo
    .hero.is-primary
      .hero-body
        .container
          h1.title vue-tree
          h2.subtitle a simple tree component
    .container: .columns
      .column.is-half
        vue-tree( :source="tree1", nodesProp="children" leaf-icon="user" )

</template>
