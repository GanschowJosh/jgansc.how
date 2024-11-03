/**
 * Function to check if a set of points and triples is a Steiner Triple System
 * @param {Array} points - An array of points (integers)
 * @param {Array} triples - An array of triples, each triple is an array of three integers
 * @returns {Boolean} - Returns true if it's a valid Steiner Triple System, else false
 */
function isSteinerTripleSystem(points, triples) {
    // Create a set of all triples using frozenset equivalent
    let triples_set = new Set(triples.map(triple => frozenset(triple)));

    // Check if every pair of points appears in exactly one triple
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let pair = frozenset([points[i], points[j]]);
            let count = 0;
            triples_set.forEach(triple => {
                if (isSubset(pair, triple)) {
                    count += 1;
                }
            });
            if (count !== 1) {
                return false;
            }
        }
    }

    // Check if the order of the system is congruent to 1 or 3 modulo 6
    let order = points.length;
    if (!(order % 6 === 1 || order % 6 === 3)) {
        return false;
    }

    // Return true if all checks passed
    return true;
}

/**
 * Helper function to create a unique identifier for a set (similar to Python's frozenset)
 * @param {Array} arr - An array of elements
 * @returns {String} - A JSON string representing the sorted set
 */
function frozenset(arr) {
    return JSON.stringify([...new Set(arr)].sort((a, b) => a - b));
}

/**
 * Helper function to check if all elements of subset are in superset
 * @param {String} subsetStr - JSON string of the subset
 * @param {String} supersetStr - JSON string of the superset
 * @returns {Boolean} - Returns true if subset is indeed a subset of superset
 */
function isSubset(subsetStr, supersetStr) {
    let subset = JSON.parse(subsetStr);
    let superset = JSON.parse(supersetStr);
    return subset.every(elem => superset.includes(elem));
}
