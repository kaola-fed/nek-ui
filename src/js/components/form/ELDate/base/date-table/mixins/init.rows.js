import { getFirstDayOfMonth,
    getDayCountOfMonth,
    getWeekNumber,
    getStartDateOfMonth,
    nextDate,
    } from '../../../util';

const clearHours = function (time) {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export default (Component) => {
  Component.implement({
    getBaseData(date) {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth();
      // 当天日期
      const today = new Date(year, month, 1);
      // 当月的第一天是星期几
      let day = getFirstDayOfMonth(today);
      // day: 7——星期日，6——星期六...
      day = (day === 0 ? 7 : day);
      // 当月的数量
      const dateCountOfMonth = getDayCountOfMonth(today.getFullYear(), today.getMonth());
      // 上月的数量
      const dateCountOfLastMonth = getDayCountOfMonth(today.getFullYear(), (today.getMonth() === 0 ? 11 : today.getMonth() - 1));
      // 面板上第一天
      const startDate = getStartDateOfMonth(year, month);
      const now = clearHours(new Date());
      return {
        day,
        dateCountOfMonth,
        dateCountOfLastMonth,
        startDate,
        now,
      };
    },
    getRows(value) {
      const data = this.data;
      const disabledDate = data.disabledDate;
      const selectedDate = data.selectedDate || value;
      const minDate = data.minDate;
      const maxDate = data.maxDate;
      const rows = data.rows || [[], [], [], [], [], []];
      const offset = data.offset || 0;
      const showWeekNumber = data.showWeekNumber;


      const { day, dateCountOfMonth, dateCountOfLastMonth, startDate, now } = this.getBaseData(value);

      let count = 1;
      // let firstDayPosition;


      for (let i = 0; i < 6; i += 1) {
        const row = rows[i];
        if (showWeekNumber) {
          if (!row[0]) {
            row[0] = {
              type: 'week',
              text: getWeekNumber(nextDate(startDate, (i * 7) + 1)),
            };
          }
        }

        for (let j = 0; j < 7; j += 1) {
          let cell = row[showWeekNumber ? j + 1 : j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: 'normal',
              inRange: false,
              start: false,
              end: false,
            };
          }

          cell.type = 'normal';
          const index = (i * 7) + j;
          const time = nextDate(startDate, index - offset).getTime();
          cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
          cell.start = minDate && time === clearHours(minDate);
          cell.end = maxDate && time === clearHours(maxDate);

          const isToday = time === now;
          if (isToday) {
            cell.type = 'today';
          }

          if (i >= 0 && i <= 1) {
            if (j + (i * 7) >= (day + offset)) {
              cell.text = count;
              count += 1;
              // if (count === 2) {
              //   firstDayPosition = (i * 7) + j;
              // }
            } else {
              cell.text = (dateCountOfLastMonth - ((day + offset) - (j % 7))) + 1 + (i * 7);
              cell.type = 'prev-month';
            }
          } else if (count <= dateCountOfMonth) {
            cell.text = count;
            count += 1;
            // if (count === 2) {
            //   firstDayPosition = (i * 7) + j;
            // }
          } else {
            cell.text = count - dateCountOfMonth;
            count += 1;
            cell.type = 'next-month';
          }

          const newDate = new Date(time);
          cell.disabled = typeof disabledDate === 'function' && disabledDate(newDate);
          cell.selected = Array.isArray(selectedDate) &&
            selectedDate.filter(dateItem => dateItem.toString() === newDate.toString())[0];

          row[showWeekNumber ? j + 1 : j] = cell;
        }

        // if (this.selectionMode === 'week') {
        //   const start = this.showWeekNumber ? 1 : 0;
        //   const end = this.showWeekNumber ? 7 : 6;
        //   const isWeekActive = this.isWeekActive(row[start + 1]);

        //   row[start].inRange = isWeekActive;
        //   row[start].start = isWeekActive;
        //   row[end].inRange = isWeekActive;
        //   row[end].end = isWeekActive;
        // }
      }

      // rows.firstDayPosition = firstDayPosition;
      this.data.rows = rows;
      this.$update();
    },
  });
};
