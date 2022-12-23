// https://programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

function solution(orders_, course) {
    const orders = orders_.map((v) => […v].sort().join(''));
    const nToMap = new Map();
    const listOfNToSet = orders.map((order) => {
        return makeCombination(order);
    });
    listOfNToSet.forEach((nToSet) => {
        nToSet.forEach((s, n) => {
            if (!nToMap.has(n)) {
                nToMap.set(n, new Map());
            }
            const old = nToMap.get(n);
            s.forEach((course) => {
                if (!old.has(course)) {
                    old.set(course, 0);
                }
                old.set(course, old.get(course) + 1);
            });
        });
    });

    const nestedResult = course.map((n) => {
        if (!nToMap.has(n)) return [];

        const courseToCount = nToMap.get(n);
        let max = 0;
        courseToCount.forEach((count, c) => {
            if (count > max) max = count;
        });
        if (max < 2) return [];

        const filtered = [];
        courseToCount.forEach((count, c) => {
            if (count === max) {
                filtered.push(c);
            }
        });
        return filtered;
    });

    const result = nestedResult.flat().sort();

    return result;
}

function makeCombination(order) {
    const map = new Map();
    for (let i = 2; i <= order.length; i++) {
        map.set(i, makeCombinationRec('', […order], i));
    }
    return map;
}

function makeCombinationRec(prefix, cands, n) {
    if (n === 0) return new Set([prefix]);
    else {
        const m = cands.map((v, i, a) => {
            return makeCombinationRec(prefix + v, a.slice(i + 1), n - 1);
        });
        let s = new Set();
        m.forEach((v) => {
            s = new Set([…s, …v]);
        });
        return s;
    }
}
