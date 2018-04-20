
let trees=new Map;

let counter=()=>{
  let c=0;
  let f=()=>++c;
}

let _uid=0;
let uid=()=>++_uid;

function registerTree( tree ){
  if( trees.has( tree )){
    return console.error('That component instance is already in...wtf??')
  }
  let tid=uid();
  let nodes=[];
  let data={ tid, tree, nodes };
  let reg=( node )=>{

  }
  trees.set( tid, data );
  return tid;
}

function registerNode( node, tid ){
  let treeData=trees.get( tid );
  let data={ nid: uid(), node, tid };
  if( treeData ){
    treeData.nodes.push( data );
  }
  return data.nid;
}

export{
  registerTree,
  registerNode
}
