// pasch checker IIFE to check if a given STS is Anti-Pasch
(function() {
    /**
     * Determines the order (number of points) of an STS by finding the maximum point number.
     * @param {number[][]} triples - Array of triples
     * @returns {number} - The order of the STS
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
     * Validates whether the given triples form a valid Steiner Triple System.
     * @param {number[][]} triples - Array of triples
     * @returns {object} - { isValid: boolean, order: number, expectedNumTriples: number }
     */
    function validateSTS(triples) {
        const order = determineOrder(triples);
        if (order % 6 !== 1 && order % 6 !== 3) {
            console.warn(`Warning: Order ${order} is not congruent to 1 or 3 mod 6.`);
            // Proceeding as per user note
        }
        const expectedNumTriples = (order * (order -1)) / 6;
        const actualNumTriples = triples.length;
        const isValid = (actualNumTriples === expectedNumTriples);
        if (!isValid) {
            console.warn(`Warning: STS of order ${order} has ${actualNumTriples} triples (expected ${expectedNumTriples}).`);
        }
        return { isValid, order, expectedNumTriples };
    }

    /**
     * Builds a mapping from each point to the set of triples that include it.
     * @param {number[][]} triples - Array of triples
     * @returns {Map<number, Set<string>>} - Mapping from point to set of triples (as strings)
     */
    function buildPointToTriples(triples) {
        const pointToTriples = new Map();
        triples.forEach(triple => {
            const sortedTriple = [...triple].sort((a,b) => a - b).join('-'); // string representation
            triple.forEach(point => {
                if (!pointToTriples.has(point)) {
                    pointToTriples.set(point, new Set());
                }
                pointToTriples.get(point).add(sortedTriple);
            });
        });
        return pointToTriples;
    }

    /**
     * Determines whether the given STS contains any Pasch configurations.
     * @param {number[][]} triples - Array of triples
     * @param {Map<number, Set<string>>} pointToTriples - Mapping from points to triples
     * @returns {boolean} - True if Pasch configuration exists, False otherwise
     */
    function containsPasch(triples, pointToTriples) {
        const tripleSet = new Set(triples.map(triple => [...triple].sort((a,b)=>a-b).join('-')));

        for (let t1Str of tripleSet) {
            const t1 = t1Str.split('-').map(Number);
            const [a, b, c] = t1;

            // Find triples that share 'a' with t1, excluding t1 itself
            const relatedTriples = Array.from(pointToTriples.get(a)).filter(tripleStr => tripleStr !== t1Str);

            for (let t2Str of relatedTriples) {
                const t2 = t2Str.split('-').map(Number);
                const [a2, d, e] = t2; // t2 shares 'a'

                if (a2 !== a) {
                    console.warn(`Unexpected shared point: ${a2} != ${a}`);
                    continue;
                }

                // Ensure d and e are not in t1
                if (t1.includes(d) || t1.includes(e)) {
                    continue;
                }

                // Find triples containing both 'b' and 'd', excluding t1 and t2
                const triplesWithB = pointToTriples.get(b);
                const triplesWithD = pointToTriples.get(d);
                const intersectionBD = new Set([...triplesWithB].filter(x => triplesWithD.has(x) && x !== t1Str && x !== t2Str));

                for (let t3Str of intersectionBD) {
                    const t3 = t3Str.split('-').map(Number);
                    const [b2, d2, f] = t3;

                    if (b2 !== b || d2 !== d) {
                        // The triple must share 'b' and 'd' exactly
                        continue;
                    }

                    // Find triples containing both 'c' and 'e', excluding t1, t2, t3
                    const triplesWithC = pointToTriples.get(c);
                    const triplesWithE = pointToTriples.get(e);
                    const intersectionCE = new Set([...triplesWithC].filter(x => triplesWithE.has(x) && x !== t1Str && x !== t2Str && x !== t3Str));

                    for (let t4Str of intersectionCE) {
                        const t4 = t4Str.split('-').map(Number);
                        const [c2, e2, f2] = t4;

                        if (c2 !== c || e2 !== e) {
                            // The triple must share 'c' and 'e' exactly
                            continue;
                        }

                        // Check if both triples share the same 'f'
                        if (f === f2) {
                            // Found a Pasch configuration
                            return true;
                        }
                    }
                }
            }
        }

        // No Pasch configuration found
        return false;
    }

    /**
     * Checks whether a given system is Anti-Pasch.
     * @param {number[][]} triples - Array of triples
     * @returns {boolean} - True if Anti-Pasch, False otherwise
     * @throws {Error} - If the STS structure is invalid
     */
    function isAntiPasch(triples) {
        // Validate STS
        const { isValid, order, expectedNumTriples } = validateSTS(triples);
        if (!isValid) {
            throw new Error(`Invalid STS structure: expected ${expectedNumTriples} triples for order ${order}, but got ${triples.length}.`);
        }

        // Build point to triples mapping
        const pointToTriples = buildPointToTriples(triples);

        // Check for Pasch configurations
        const hasPasch = containsPasch(triples, pointToTriples);

        // Return the inverse: Anti-Pasch means no Pasch
        return !hasPasch;
    }

    // Expose the function to the global window object
    window.isAntiPasch = function(triples) {
        try {
            return isAntiPasch(triples);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

})();
