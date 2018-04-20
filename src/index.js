import { branch, tree, leaf } from "./components";

function install( Vue, tag="vue-tree" ){
  Vue.component( tag, tree );
}

export default{
  install,
  tree,
  branch,
  leaf
};

export{
  install,
  tree,
  branch,
  leaf
}
