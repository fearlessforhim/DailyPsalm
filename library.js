const _tools = {
    startOfWeeksForMonth: (date) => {
        const currentMonth = date.getMonth();
        const rtv = [];
        const myDate = new Date(date);
        myDate.setDate(1);
        myDate.setHours(0, 0, 0, 0);
        do {
            if (myDate.getDay() === 0) {
                rtv.push(myDate.getDate());
            }
            myDate.setDate(myDate.getDate() + 1);
        } while ((myDate.getMonth() === currentMonth));
        return rtv;
    },
    weekNumberForDate: (date) => {
        const fullWeekStarts = _tools.startOfWeeksForMonth(date);
        const weekIdx = fullWeekStarts.findLastIndex(w => w <= date.getDate()) + 1;
        const startOfFirstWeekIsStartOfMonth = fullWeekStarts[0] === 1;
        return weekIdx + (startOfFirstWeekIsStartOfMonth ? 1 : 0);
    },
    parseDataPoints: (date) => {
        return {
            month: date.getMonth() + 1,
            dayOfMonth: date.getDate(),
            weekOfMonth: _tools.weekNumberForDate(date)
        }
    },
    getPsalm119Stanza: (dayOfMonthLastDigit) => {
        switch (dayOfMonthLastDigit) {
            case 0:
                return [151, 152];
            case 1:
                return [153, 154];
            case 2:
                return [155, 156];
            case 3:
                return [157, 158, 159];
            case 4:
                return [160, 161];
            case 5:
                return [162, 163];
            case 6:
                return [164, 165];
            case 7:
                return [166, 167];
            case 8:
                return [168, 169];
            case 9:
                return [170, 171, 172];
        }
    },
    numberToHumanReadable: (idx) => {
        if (idx <= 150) {
            return `Psalm ${idx}`;
        }

        let stanza = '';
        switch (idx - 150) {
            case 1:
                stanza = 'Aleph';
                break;
            case 2:
                stanza = 'Beth';
                break;
            case 3:
                stanza = 'Gimel';
                break;
            case 4:
                stanza = 'Daleth';
                break;
            case 5:
                stanza = 'He';
                break;
            case 6:
                stanza = 'Waw';
                break;
            case 7:
                stanza = 'Zayin';
                break;
            case 8:
                stanza = 'Heth';
                break;
            case 9:
                stanza = 'Teth';
                break;
            case 10:
                stanza = 'Yodh';
                break;
            case 11:
                stanza = 'Kaph';
                break;
            case 12:
                stanza = 'Lamedh';
                break;
            case 13:
                stanza = 'Mem';
                break;
            case 14:
                stanza = 'Nun';
                break;
            case 15:
                stanza = 'Samekh';
                break;
            case 16:
                stanza = 'Ayin';
                break;
            case 17:
                stanza = 'Pe';
                break;
            case 18:
                stanza = 'Tsadhe';
                break;
            case 19:
                stanza = 'Qoph';
                break;
            case 20:
                stanza = 'Resh';
                break;
            case 21:
                stanza = 'Shin';
                break;
            case 22:
                stanza = 'Taw';
                break;
        }

        return `Psalm 119 (${stanza})`;
    },
    titleDateFormat: (date) => {
        const options = {
            month: 'long',
            weekday: 'long',
        }
        return `${date.toLocaleDateString('en-US', {weekday: 'long'})}, ${date.toLocaleDateString('en-US', {
            month: 'long',
            day: "numeric"
        })}`;
    },
    div: () => {
        return document.createElement('div')
    },
    text: (text) => {
        return document.createTextNode(text);
    },
    textDiv: (text) => {
        const div = _tools.div();
        div.appendChild(_tools.text(text));
        return div;
    }
}

const library = {
    text: "test-text",
    getPsalmsForDate: (date) => {
        const dataPoints = _tools.parseDataPoints(date);
        const dayOfMonthLastDigit = dataPoints.dayOfMonth % 10;
        const rtv = [];
        rtv.push(parseInt(`${dataPoints.month}${dayOfMonthLastDigit}`));
        let psalmB = '';
        if (dataPoints.dayOfMonth === 31) {
            rtv.push(150);
        } else {
            switch (dataPoints.weekOfMonth) {
                case 1:
                    rtv.push(dayOfMonthLastDigit);
                    break;
                case 2:
                    rtv.push(parseInt(`13${dayOfMonthLastDigit}`));
                    break;
                case 3:
                    rtv.push(parseInt(`14${dayOfMonthLastDigit}`));
                    break;
                case 0:
                case 4:
                    rtv.push(..._tools.getPsalm119Stanza(dayOfMonthLastDigit));
                    break;
            }
        }

        return rtv
            .filter(p => p && p !== 119)
            .sort((a, b) => a - b);
    },
    numberToHumanReadable: _tools.numberToHumanReadable,
    buildTitleRow: () => {

        const options = {
            month: 'long',
            weekday: 'long',
        }

        let myDate = new Date();

        myDate.setDate(myDate.getDate() - 1);
        let titleWrap = document.getElementById("yesterday-title");
        titleWrap.appendChild(_tools.textDiv('Yesterday'));
        titleWrap.appendChild(_tools.textDiv(`${_tools.titleDateFormat(myDate)}`));

        myDate.setDate(myDate.getDate() + 1);
        titleWrap = document.getElementById("today-title");
        titleWrap.appendChild(_tools.textDiv('Today'));
        titleWrap.appendChild(_tools.textDiv(`${_tools.titleDateFormat(myDate)}`));

        myDate.setDate(myDate.getDate() + 1);
        titleWrap = document.getElementById("tomorrow-title");
        titleWrap.appendChild(_tools.textDiv('Tomorrow'));
        titleWrap.appendChild(_tools.textDiv(`${_tools.titleDateFormat(myDate)}`));
    },
    buildDataRow: () => {
        let myDate = new Date();

        myDate.setDate(myDate.getDate() - 1);
        let dayWrap = document.getElementById("yesterday-data");
        library.getPsalmsForDate(myDate).forEach(n => {
            const newDiv = document.createElement('div');
            const textNode = document.createTextNode(library.numberToHumanReadable(n));
            newDiv.appendChild(textNode);
            dayWrap.appendChild(newDiv);
        })


        myDate.setDate(myDate.getDate() + 1);
        dayWrap = document.getElementById("today-data");
        library.getPsalmsForDate(myDate).forEach(n => {
            const newDiv = document.createElement('div');
            const textNode = document.createTextNode(library.numberToHumanReadable(n));
            newDiv.appendChild(textNode);
            dayWrap.appendChild(newDiv);
        })


        myDate.setDate(myDate.getDate() + 1);
        dayWrap = document.getElementById("tomorrow-data");
        library.getPsalmsForDate(myDate).forEach(n => {
            const newDiv = document.createElement('div');
            const textNode = document.createTextNode(library.numberToHumanReadable(n));
            newDiv.appendChild(textNode);
            dayWrap.appendChild(newDiv);
        })
    }
};