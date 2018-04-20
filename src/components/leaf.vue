<script>
  export default{
    props: {
      label: { type: String, required: true },
      level:{ type: Number, default: 0 },
      elbowIcon:{ type: [ String, Boolean ] },
      mainIcon: { type: String }
    },
    data(){
      return {
        // 'tree-icon': TreeIcon
      };
    },
    components:{},
    computed:{
      // emptyIconRange(){
      //   return range( this.level );
      // }
    },
    methods:{
      onSelect(){
        this.$emit('select');
      },
      onToggle(){
        this.$emit('toggle', this.id );
        console.log( 'leaf icon', this.elbowIcon )
      }
    },
    created(){},
    watch:{
      elbowIcon(v){ console.log( 'elbwo chabge', v )}
    }
  }
</script>
<template>
  <div class="tree-leaf" @click.stop="onSelect">
    <div class="tree-icon" v-for="n in level" is-spacer></div>
    <div class="tree-icon elbow-icon" v-if="elbowIcon" @click.stop="onToggle">
      <i :class="elbowIcon"></i>
    </div>
    <div class="tree-icon main-icon">
      <i :class="mainIcon"></i>
    </div>
    <span class="tree-label">{{label}}</span>
  </div>
</template>
