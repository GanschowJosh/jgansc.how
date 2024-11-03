/**
 * pasch-checker.js
 * 
 * This module contains functions to validate a Steiner Triple System (STS)
 * and check for the presence of Pasch configurations.
 */

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
        // Proceeding as user might have specific reasons.
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
        let tripleFSet = frozenset(triple);
        triple.forEach(point => {
            if (!pointToTriples[point]) {
                pointToTriples[point] = new Set();
            }
            pointToTriples[point].add(tripleFSet);
        });
    });
    return pointToTriples;
}

/**
 * Function to create a unique identifier for a triple (similar to Python's frozenset).
 * @param {Array} arr - An array of elements.
 * @returns {String} - A JSON string representing the sorted set.
 */
function frozenset(arr) {
    return JSON.stringify([...new Set(arr)].sort((a, b) => a - b));
}

/**
 * Function to check if all elements of subset are in superset.
 * @param {String} subsetStr - JSON string of the subset.
 * @param {String} supersetStr - JSON string of the superset.
 * @returns {Boolean} - True if subset is indeed a subset of superset.
 */
function isSubset(subsetStr, supersetStr) {
    let subset = JSON.parse(subsetStr);
    let superset = JSON.parse(supersetStr);
    return subset.every(elem => superset.includes(elem));
}

/**
 * Function to determine whether the given STS contains any Pasch configurations.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @param {Object} pointToTriples - Mapping from points to sets of triples containing them.
 * @returns {Boolean} - True if the STS contains at least one Pasch configuration, else false.
 */
function containsPasch(triples, pointToTriples) {
    let tripleSet = new Set(triples.map(triple => frozenset(triple)));

    // Iterate over all combinations of two triples to find potential Pasch configurations
    for (let t1 of tripleSet) {
        let [a, b, c] = JSON.parse(t1);
        // Find triples that share exactly one point with t1
        let sharedPointTriples = [a, b, c].map(point => pointToTriples[point]).reduce((acc, set) => {
            set.forEach(triple => acc.add(triple));
            return acc;
        }, new Set());

        sharedPointTriples.forEach(t2 => {
            if (t2 === t1) return;
            let [d, e, f] = JSON.parse(t2);
            // Find the unique point in t2 that's not in t1
            let uniquePoints = [d, e, f].filter(p => ![a, b, c].includes(p));
            if (uniquePoints.length !== 1) return; // Must share exactly two points

            let dUnique = uniquePoints[0];
            // Now, find triples that contain two new points and complete the Pasch
            // Pasch requires two disjoint triples sharing two points
            let t3Candidates = pointToTriples[b].intersection(pointToTriples[dUnique]);
            t3Candidates.forEach(t3 => {
                if (t3 === t1 || t3 === t2) return;
                let [g, h, i] = JSON.parse(t3);
                let fUnique = [g, h, i].filter(p => ![b, dUnique].includes(p))[0];
                // Check if there exists a triple {c, e, fUnique}
                let paschTriple = frozenset([c, e, fUnique]);
                if (tripleSet.has(paschTriple)) {
                    return true; // Found a Pasch configuration
                }
            });
        });
    }

    // No Pasch configuration found
    return false;
}

/**
 * Enhanced function to check for Pasch configurations more efficiently.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @param {Object} pointToTriples - Mapping from points to sets of triples containing them.
 * @returns {Boolean} - True if a Pasch configuration exists, else false.
 */
function containsPaschOptimized(triples, pointToTriples) {
    let tripleSet = new Set(triples.map(triple => frozenset(triple)));

    for (let t1 of tripleSet) {
        let [a, b, c] = JSON.parse(t1);
        // Iterate through all pairs in t1
        let pairs = [
            [a, b],
            [a, c],
            [b, c]
        ];

        pairs.forEach(pair => {
            let [p1, p2] = pair;
            // Find triples that contain both p1 and p2
            let commonTriples = intersection(pointToTriples[p1], pointToTriples[p2]);
            commonTriples.forEach(t2 => {
                if (t2 === t1) return;
                let [x, y, z] = JSON.parse(t2);
                let uniquePoint = [x, y, z].find(p => !pair.includes(p));
                if (!uniquePoint) return;

                // Now, look for triples containing p1 and uniquePoint
                let candidateTriples = pointToTriples[p1].intersection(pointToTriples[uniquePoint]);
                candidateTriples.forEach(t3 => {
                    if (t3 === t1 || t3 === t2) return;
                    let [m, n, o] = JSON.parse(t3);
                    let f = [m, n, o].find(p => ![p1, uniquePoint].includes(p));
                    if (!f) return;

                    // Check if there's a triple containing p2, uniquePoint, and f
                    let paschTriple = frozenset([p2, uniquePoint, f]);
                    if (tripleSet.has(paschTriple)) {
                        return true; // Found a Pasch configuration
                    }
                });
            });
        });

        // Early exit if a Pasch configuration is found
        if (tripleSet.has(t1)) return true;
    }

    return false;
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
 * Function to check if the given STS is anti-Pasch.
 * @param {Array} triples - Array of triples, each triple is an array of three integers.
 * @returns {Boolean} - True if the STS is anti-Pasch, else false.
 */
function isAntiPasch(triples) {
    // Validate the STS first
    let validation = validateSTS(triples);
    if (!validation.isValid) {
        throw new Error(`Invalid Steiner Triple System. Expected ${validation.expectedNumTriples} triples but got ${triples.length}.`);
    }

    // Build the point to triples mapping
    let pointToTriples = buildPointToTriples(triples);

    // Check for Pasch configurations
    let hasPasch = containsPaschOptimized(triples, pointToTriples);
    return !hasPasch;
}
