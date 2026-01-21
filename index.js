let myDate = new Date();
myDate.setDate(1);
myDate.setMonth(0);
myDate.setHours(0, 0, 0);
const stats = [...new Array(173)].map(() => 0);
for (let i = 0; i < 365; i++) {
    const psalmsForDate = library.getPsalmsForDate(myDate);
    myDate.setDate(myDate.getDate() + 1)

    psalmsForDate.forEach(p => {
        stats[p]++;
    })
}

const readCountsForCurrentYear = stats.map((s, idx) => {
    return {
        psalm: library.numberToHumanReadable(idx),
        count: s
    }
});

library.buildTitleRow();
library.buildDataRow();

