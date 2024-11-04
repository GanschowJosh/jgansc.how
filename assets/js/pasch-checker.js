// assets/js/pasch-checker.js

/**
 * Class representing a Tree for Anti-Pasch Checking.
 */
class Tree {
    constructor(size) {
        if (size < 2) {
            throw new Error("Size of tree must be 2 or higher");
        }
        this.numNodes = size;
        this.numEdges = size - 1;
        this.matrix = Array.from({ length: size + 1 }, () => Array(size + 1).fill(0)); // 1-based indexing
    }

    addEdge(v, w) {
        this.matrix[v][w] = 1;
        this.matrix[w][v] = 1;
    }

    /**
     * Finds the next leaf node in the working matrix.
     * @returns {number} The index of the leaf node, or -1 if none found.
     */
    findLeaf(workingMatrix) {
        for (let i = 1; i <= this.numNodes; i++) {
            let count = 0;
            for (let j = 1; j <= this.numNodes; j++) {
                if (workingMatrix[i][j] === 1) {
                    count += 1;
                }
            }
            if (count === 1) {
                return i;
            }
        }
        return -1; // No leaf found
    }

    /**
     * Clears all connections from a given node in the working matrix.
     * @param {number} node - The node to clear connections from.
     * @param {Array} workingMatrix - The working adjacency matrix.
     */
    clearConnections(node, workingMatrix) {
        for (let i = 1; i <= this.numNodes; i++) {
            workingMatrix[node][i] = 0;
            workingMatrix[i][node] = 0;
        }
    }

    /**
     * Checks if the tree contains any Pasch configurations.
     * @returns {boolean} True if Pasch exists, False otherwise.
     */
    containsPasch() {
        // Build point_to_triples mapping
        const pointToTriples = {};
        for (let i = 1; i <= this.numNodes; i++) {
            pointToTriples[i] = new Set();
        }

        // Extract all triples from the adjacency matrix
        const triples = [];
        const seenTriples = new Set();

        for (let v = 1; v <= this.numNodes; v++) {
            for (let w = v + 1; w <= this.numNodes; w++) {
                if (this.matrix[v][w] === 1) {
                    for (let x = w + 1; x <= this.numNodes; x++) {
                        if (this.matrix[v][x] === 1 && this.matrix[w][x] === 1) {
                            const triple = [v, w, x].sort((a, b) => a - b);
                            const tripleKey = triple.join('-');
                            if (!seenTriples.has(tripleKey)) {
                                triples.push(triple);
                                seenTriples.add(tripleKey);
                                triple.forEach(point => pointToTriples[point].add(tripleKey));
                            }
                        }
                    }
                }
            }
        }

        // Now, check for Pasch configurations
        // A Pasch is defined as two triples {a,b,c} and {a,d,e} sharing a common point 'a'
        // and {b,d,f} and {c,e,f} forming a quadrilateral.

        // For this implementation, we'll follow the logic in your Python script
        // which iterates through triples and looks for specific configurations.

        // Implement the contains_pasch logic from Python in JavaScript
        // The Python logic seems to look for Pasch configurations as defined.

        // Implement a similar approach
        for (let t1 of triples) {
            const [a, b, c] = t1;

            // Find triples that share point 'a' with t1, excluding t1 itself
            const relatedTriples = Array.from(pointToTriples[a]).filter(tripleStr => tripleStr !== t1.join('-'));

            for (let tripleStr of relatedTriples) {
                const t2 = tripleStr.split('-').map(Number);
                const [a2, d, e] = t2; // t2 shares 'a'

                // Ensure t2 shares exactly one point 'a'
                if (a2 !== a) continue; // Shouldn't happen, but safety check

                // Now, find triples containing both 'b' and 'd'
                const triplesWithB = Array.from(pointToTriples[b]);
                const triplesWithD = Array.from(pointToTriples[d]);

                const intersectionBD = triplesWithB.filter(triple => triplesWithD.includes(triple) && triple !== t1.join('-') && triple !== t2.join('-'));

                for (let tripleStr3 of intersectionBD) {
                    const t3 = tripleStr3.split('-').map(Number);
                    const [b2, d2, f] = t3;

                    if (b2 !== b || d2 !== d) continue; // Should share exactly 'b' and 'd'

                    // Now, find triples containing both 'c' and 'e'
                    const triplesWithC = Array.from(pointToTriples[c]);
                    const triplesWithE = Array.from(pointToTriples[e]);

                    const intersectionCE = triplesWithC.filter(triple => triplesWithE.includes(triple) && triple !== t1.join('-') && triple !== t2.join('-') && triple !== t3.join('-'));

                    for (let tripleStr4 of intersectionCE) {
                        const t4 = tripleStr4.split('-').map(Number);
                        const [c2, e2, f2] = t4;

                        if (c2 !== c || e2 !== e) continue; // Should share exactly 'c' and 'e'

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
}

    /**
     * Function to parse the input system into triples
     * @param {string} input - The system input string
     * @returns {number[][]} - Array of triples
     */
    function parseSystem(input) {
        return input.split(',').map(triple => {
            return triple.trim().split('-').map(Number);
        });
    }

    /**
     * Function to validate the STS structure
     * @param {number[][]} triples - Array of triples
     * @returns {object} - { isValid: boolean, order: number, expectedNumTriples: number }
     */
    function validateSTS(triples) {
        const order = Math.max(...triples.flat());
        if (order % 6 !== 1 && order % 6 !== 3) {
            console.warn(`Warning: Order ${order} is not congruent to 1 or 3 mod 6.`);
            // Proceeding as per user note
        }
        const expectedNumTriples = (order * (order - 1)) / 6;
        const actualNumTriples = triples.length;
        const isValid = (actualNumTriples === expectedNumTriples);
        if (!isValid) {
            console.warn(`Warning: STS of order ${order} has ${actualNumTriples} triples (expected ${expectedNumTriples}).`);
        }
        return { isValid, order, expectedNumTriples };
    }

    /**
     * Function to check if the system is Anti-Pasch
     * @param {number[][]} triples - Array of triples
     * @returns {boolean} - True if Anti-Pasch, False otherwise
     */
    function checkAntiPasch(triples) {
        const { isValid, order, expectedNumTriples } = validateSTS(triples);
        if (!isValid) {
            return { isValid, isAntiPasch: null, message: 'Invalid STS structure' };
        }

        const tree = new Tree(order);
        triples.forEach(([v, w, x]) => {
            tree.addEdge(v, w);
            tree.addEdge(w, x);
            tree.addEdge(x, v);
        });

        const hasPasch = tree.containsPasch();
        const isAntiPasch = !hasPasch;

        return { isValid, isAntiPasch, message: isAntiPasch ? 'The system is Anti-Pasch.' : 'The system contains Pasch configurations.' };
    }

    /**
     * Function to visualize the tree using Cytoscape.js
     * @param {number[][]} triples - Array of triples
     */
    function visualizeSystem(triples) {
        // Extract edges from triples
        const edges = new Set();
        triples.forEach(([v, w, x]) => {
            const sortedTriple = [v, w, x].sort((a, b) => a - b);
            edges.add(`${sortedTriple[0]}-${sortedTriple[1]}`);
            edges.add(`${sortedTriple[0]}-${sortedTriple[2]}`);
            edges.add(`${sortedTriple[1]}-${sortedTriple[2]}`);
        });

        const elements = [];

        // Add nodes
        const nodes = new Set();
        edges.forEach(edgeStr => {
            const [source, target] = edgeStr.split('-').map(Number);
            nodes.add(source);
            nodes.add(target);
        });

        nodes.forEach(node => {
            elements.push({ data: { id: node.toString() } });
        });

        // Add edges
        edges.forEach(edgeStr => {
            const [source, target] = edgeStr.split('-');
            elements.push({ data: { source: source.toString(), target: target.toString() } });
        });

        // Remove duplicate nodes
        const uniqueElements = Array.from(new Set(elements.map(e => JSON.stringify(e))))
            .map(e => JSON.parse(e));

        // Initialize Cytoscape
        const cy = cytoscape({
            container: document.getElementById('cy'), // Container to render in
            elements: uniqueElements,
            style: [ // Styling for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#1a73e8',
                        'label': 'data(id)',
                        'color': '#ffffff',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '12px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#1a73e8',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 10
            }
        });

        // Adjust styles based on theme
        if (document.body.classList.contains('dark-mode')) {
            cy.style()
                .selector('node')
                .style({
                    'background-color': '#bb86fc',
                    'color': '#121212'
                })
                .selector('edge')
                .style({
                    'line-color': '#bb86fc'
                })
                .update();
        }
    }

    /**
     * Function to handle form submission
     */
    function handleFormSubmission() {
        const form = document.getElementById('antiPaschForm');
        const result = document.getElementById('antiPaschResult');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('systemInput').value.trim();
            if (!input) {
                alert('Please enter a system.');
                return;
            }

            // Parse the system
            let triples;
            try {
                triples = parseSystem(input);
                console.log("Parsed Triples:", triples);
            } catch (error) {
                console.error("Error parsing input:", error);
                result.textContent = `❌ Error parsing input: ${error.message}`;
                document.getElementById('cy').innerHTML = ''; // Clear visualization
                return;
            }

            // Check Anti-Pasch
            const { isValid, isAntiPasch, message } = checkAntiPasch(triples);
            if (!isValid) {
                result.textContent = `❌ Invalid STS structure. ${message}`;
                document.getElementById('cy').innerHTML = ''; // Clear visualization
                return;
            }

            if (isAntiPasch) {
                result.textContent = `✅ The system is Anti-Pasch.`;
                visualizeSystem(triples);
            } else {
                result.textContent = `❌ The system contains Pasch configurations.`;
                document.getElementById('cy').innerHTML = ''; // Clear visualization
            }
        });
    }

    /**
     * Initialize the Anti-Pasch Checker
     */
    function initializeAntiPaschChecker() {
        handleFormSubmission();
    }

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', initializeAntiPaschChecker);
