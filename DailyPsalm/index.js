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

myDate = new Date();

myDate.setDate(myDate.getDate() - 1);
let dayWrap = document.getElementById("yesterday-wrap");
library.getPsalmsForDate(myDate).forEach(n => {
    const newDiv = document.createElement('div');
    const textNode = document.createTextNode(library.numberToHumanReadable(n));
    newDiv.appendChild(textNode);
    dayWrap.appendChild(newDiv);
})


myDate.setDate(myDate.getDate() + 1);
dayWrap = document.getElementById("today-wrap");
library.getPsalmsForDate(myDate).forEach(n => {
    const newDiv = document.createElement('div');
    const textNode = document.createTextNode(library.numberToHumanReadable(n));
    newDiv.appendChild(textNode);
    dayWrap.appendChild(newDiv);
})


myDate.setDate(myDate.getDate() + 1);
dayWrap = document.getElementById("tomorrow-wrap");
library.getPsalmsForDate(myDate).forEach(n => {
    const newDiv = document.createElement('div');
    const textNode = document.createTextNode(library.numberToHumanReadable(n));
    newDiv.appendChild(textNode);
    dayWrap.appendChild(newDiv);
})

