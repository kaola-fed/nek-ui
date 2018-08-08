/* eslint-disable */
import {DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP} from "../../../utils";

const capitalize = str => str[0].toUpperCase() + str.slice(1);
export default (Component) => {
    Component.implement({
        onPickSuccess() {
            this.$emit('pick-success');
        },
        onPickClick() {
            this.$emit('pick-click');
        },
        onStartChange(date) {
            this.handleChange(date, {});
        },
        onEndChange(date) {
            this.handleChange({}, date);
        },
        handleChange(start, end, emit = true) {
            let dateStart = new Date(this.data.dateStart);
            let dateEnd = new Date(this.data.dateEnd);

            Object.keys(start).forEach((type) => {
                dateStart[`set${capitalize(type)}`](start[type]);
            });

            Object.keys(end).forEach((type) => {
                dateEnd[`set${capitalize(type)}`](end[type]);
            });

            if (dateEnd < dateStart) dateEnd = dateStart;

            this.data.value = [this.formatDate(dateStart), this.formatDate(dateEnd)];
            this.getVisualValue(dateStart, dateEnd);
            if (emit) {
                this.$emit('pick', {
                    value: [dateStart, dateEnd],
                    type: 'time',
                });
            }
        },

        formatDate(value) {
            const store = this.data;

            const format = DEFAULT_FORMATS.timerange;

            const {formatter} = (
                TYPE_VALUE_RESOLVER_MAP.timerange
            );
            return formatter(value, store.format || format);
        },
    });
};
