import VoButton from "./src/main";

/* istanbul ignore next */
VoButton.install = function(Vue) {
  Vue.component(VoButton.name, VoButton);
};

export default VoButton;
