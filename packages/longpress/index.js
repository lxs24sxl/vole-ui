import directive from "./src/main";

export default {
  install: Vue => {
    Vue.directive(directive.name, directive);
  }
};
