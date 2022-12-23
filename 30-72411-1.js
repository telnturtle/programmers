// https://programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

function solution(orders_, course) {
    const orders = orders_.map((v) => [...v].sort().join(''));
    const nToCourseToCount = new Map();
    const listOfNToSetOfCourse = orders.map(makeCombination);
    listOfNToSetOfCourse.forEach((nToSetOfCourse) => {
        nToSetOfCourse.forEach((s, n) => {
            if (!nToCourseToCount.has(n)) nToCourseToCount.set(n, new Map());
            const ctc = nToCourseToCount.get(n);
            s.forEach((c) => {
                if (!ctc.has()) ctc.set(c, 0);
                ctc.set(c, ctc.get(c) + 1);
            });
        });
    });
    console.log(nToCourseToCount)

    const nestedResult = course.map((n) => {
        if (!nToCourseToCount.has(n)) return [];

        const courseToCount = nToCourseToCount.get(n);
        let max = 0;
        console.log({courseToCount})
        courseToCount.forEach((count, c) => {
            if (count > max) max = count;
        });
        if (max < 2) return [];

        const filtered = [];
        courseToCount.forEach((count, c) => {
            if (count === max) filtered.push(c);
        });
        return filtered;
    });


    const result = nestedResult.flat().sort();

    return result;
}

function makeCombination(order) {
    const map = new Map();
    for (let i = 2; i <= order.length; i++) {
        map.set(i, makeCombinationRec('', [...order], 0, i));
    }
    return map;
}

function makeCombinationRec(prefix, arr, s, n) {
    if (n === 0) return new Set([prefix]);

    const m = arr.slice(s).map((v, i) => {
        return makeCombinationRec(prefix + v, arr, s + i + 1, n - 1);
    });
    let set = new Set();
    m.forEach((v) => {
        set = new Set([...set, ...v]);
    });
    return set;
}

console.log(solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]));
// console.log(solution(['ABCFG'], [2, 3, 4]));
