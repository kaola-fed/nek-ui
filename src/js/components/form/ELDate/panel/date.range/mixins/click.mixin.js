export default (Component) => {
  Component.implement({
    handleRangePick(val) {
      console.log(val);
    },
  });
};
