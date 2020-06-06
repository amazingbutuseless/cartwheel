export default {
  namespaced: true,

  state: {
    visible: false,
  },

  mutations: {
    show(state): void {
      document.body.style.overflow = "hidden";
      state.visible = true;
    },

    hide(state): void {
      document.body.style.overflow = "auto";
      state.visible = false;
    },
  },
};
