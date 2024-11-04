/**
 * Function to check if a given order is valid for an STS.
 * Valid orders satisfy v ≡ 1 or 3 mod 6.
 * @param {Number} v - Order of the STS.
 * @returns {Boolean} - True if valid, else false.
 */
function isValidOrder(v) {
    return v % 6 === 1 || v % 6 === 3;
}

/**
 * Function to determine the order of an STS by finding the maximum point number.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @returns {Number} - The order of the STS.
 */
function determineOrder(triples) {
    let maxPoint = 0;
    triples.forEach(triple => {
        triple.forEach(point => {
            if (point > maxPoint) {
                maxPoint = point;
            }
        });
    });
    return maxPoint;
}

/**
 * Function to validate whether the given triples form a valid Steiner Triple System.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @returns {Object} - { isValid: Boolean, order: Number, expectedNumTriples: Number }
 */
function validateSTS(triples) {
    let order = determineOrder(triples);
    if (!isValidOrder(order)) {
        console.warn(`Warning: Order ${order} is not congruent to 1 or 3 mod 6.`);
    }
    let expectedNumTriples = (order * (order - 1)) / 6;
    let actualNumTriples = triples.length;
    let isValid = actualNumTriples === expectedNumTriples;
    if (!isValid) {
        console.warn(`Warning: STS of order ${order} has ${actualNumTriples} triples (expected ${expectedNumTriples}).`);
    }
    return {
        isValid,
        order,
        expectedNumTriples
    };
}

/**
 * Function to build a mapping from each point to the set of triples that include it.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @returns {Object} - Mapping from point to Set of triples.
 */
function buildPointToTriples(triples) {
    let pointToTriples = {};
    triples.forEach(triple => {
        let sortedTriple = frozenset(triple);
        triple.forEach(point => {
            if (!pointToTriples[point]) {
                pointToTriples[point] = new Set();
            }
            pointToTriples[point].add(sortedTriple);
        });
    });
    return pointToTriples;
}

/**
 * Function to create a unique identifier for a triple (similar to Python's frozenset).
 * This uses a sorted JSON string for consistent representation.
 * @param {Array} arr - An array of elements.
 * @returns {String} - A JSON string representing the sorted set.
 */
function frozenset(arr) {
    return JSON.stringify([...new Set(arr)].sort((a, b) => a - b));
}

/**
 * Helper function to compute the intersection of two sets.
 * @param {Set} setA 
 * @param {Set} setB 
 * @returns {Set} - Intersection of setA and setB.
 */
function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setA) {
        if (setB.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

/**
 * Function to determine whether the given STS contains any Pasch configurations.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @param {Object} pointToTriples - Mapping from points to sets of triples containing them.
 * @returns {Boolean} - True if the STS contains at least one Pasch configuration, else false.
 */
function containsPasch(triples, pointToTriples) {
    let tripleSet = new Set(triples.map(triple => frozenset(triple)));

    for (let t1 of tripleSet) {
        let [a, b, c] = JSON.parse(t1);
        let pairs = [
            [a, b],
            [a, c],
            [b, c]
        ];

        for (let pair of pairs) {
            let [p1, p2] = pair;
            let commonTriples = intersection(pointToTriples[p1], pointToTriples[p2]);
            
            for (let t2 of commonTriples) {
                if (t2 === t1) continue;

                let t2Array = JSON.parse(t2);
                let uniquePoint = t2Array.find(p => !pair.includes(p));
                if (!uniquePoint) continue;

                let candidateTriples = intersection(pointToTriples[p1], pointToTriples[uniquePoint]);
                
                for (let t3 of candidateTriples) {
                    if (t3 === t1 || t3 === t2) continue;

                    let t3Array = JSON.parse(t3);
                    let f = t3Array.find(p => p !== p1 && p !== uniquePoint);
                    if (!f) continue;

                    let paschTriple = frozenset([p2, uniquePoint, f]);
                    if (tripleSet.has(paschTriple)) {
                        return true; // Found a Pasch configuration
                    }
                }
            }
        }
    }

    return false;
}

/**
 * Function to check if the given STS is anti-Pasch.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @returns {Boolean} - True if the STS is anti-Pasch, else false.
 */
function isAntiPasch(triples) {
    let validation = validateSTS(triples);
    if (!validation.isValid) {
        throw new Error(`Invalid Steiner Triple System. Expected ${validation.expectedNumTriples} triples but got ${triples.length}.`);
    }

    let pointToTriples = buildPointToTriples(triples);
    return !containsPasch(triples, pointToTriples);
}
