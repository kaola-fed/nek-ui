/* eslint-disable */

// 判断参数是否是其中之一
const oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
};

const extractTime = (date) => {
  if (!date) return [0, 0, 0];
  return [
    date.getHours(), date.getMinutes(), date.getSeconds(),
  ];
};

export default (Component) => {
  Component.implement({
    onPick(e) {
      const [dates, visible, type] = [e.value, e.visible || false, e.type];

      const store = this.data;

      if (store.multiple) {
        const pickedTimeStamp = dates.getTime();
        const indexOfPickedDate = store.internalValue.findIndex(date => date && date.getTime() === pickedTimeStamp);
        const allDates = [...store.internalValue, dates].filter(Boolean);
        const timeStamps = allDates.map(date => date.getTime()).filter((ts, i, arr) => arr.indexOf(ts) === i && i !== indexOfPickedDate); // filter away duplicates
        store.internalValue = timeStamps.map(ts => new Date(ts));
      } else {
        store.internalValue = Array.isArray(dates) ? dates : [dates];
      }

      if (store.internalValue[0]) store.focusedDate = store.internalValue[0];

      store.focusedTime = {
        ...store.focusedTime,
        time: store.internalValue.map(extractTime),
      };

      if (!store.isConfirm) {
        this.onSelectionModeChange(this.data.type); // reset the selectionMode
        store.visible = visible;
      }
      this.emitChange(type);
    },

    handleClear() {
      const store = this.data;

      store.visible = false;
      store.internalValue = store.internalValue.map(() => null);
      this.$emit('clear');
            // this.dispatch('FormItem', 'on-form-change', '');
      this.emitChange(this.data.type);
      this.reset();

      setTimeout(
                () => this.onSelectionModeChange(store.type),
                500, // delay to improve dropdown close visual effect
            );
    },
    emitChange(type) {
      const store = this.data;

            // setTimeout(() => {
      this.$emit('change', store.publicStringValue, type);
                // this.dispatch('FormItem', 'on-form-change', store.publicStringValue);
            // });
    },

    onPickSuccess() {
      this.$emit('ok');
      this.focus();
      this.reset();
      this.data.isShow = !this.data.isShow;
    },

    onSelectionModeChange(type = 'time') {
      if (type.match(/^date/)) type = 'date';
      this.data.selectionMode = oneOf(type, ['year', 'month', 'date', 'time']) && type;
      return this.data.selectionMode;
    },
  });
};
