/**
 * Class representing a Tree and Prufer Code decoding.
 */
class Tree {
    constructor(size) {
        if (size < 2) {
            throw new Error("Size of tree must be 2 or higher");
        }
        this.numNodes = size;
        this.numEdges = size - 1;
        this.matrix = Array.from({ length: size }, () => Array(size).fill(0));
    }

    addEdge(v, w) {
        this.matrix[v - 1][w - 1] = 1;
        this.matrix[w - 1][v - 1] = 1;
    }

    /**
     * Generates the Prufer code from the adjacency matrix.
     * Not needed for decoder, but kept for completeness.
     */
    generatePrufer() {
        // Implementation if needed
    }
}

/**
 * Function to generate a tree from a Prufer code
 * @param {number[]} pruferCode - Array of integers representing the Prufer code
 * @returns {Tree} - The generated tree
 */
function generateTreeFromPrufer(pruferCode) {
    const size = pruferCode.length + 2;
    const nodeDegree = Array(size + 1).fill(1); // Nodes are 1-indexed

    // Count the degree for each node
    pruferCode.forEach(node => {
        if (node < 1 || node > size) {
            throw new Error(`Invalid node number in Prufer code: ${node}. Must be between 1 and ${size}.`);
        }
        nodeDegree[node]++;
    });

    // Initialize the tree
    const tree = new Tree(size);

    // Initialize a list of leaves
    const leaves = [];
    for (let i = 1; i <= size; i++) {
        if (nodeDegree[i] === 1) {
            leaves.push(i);
        }
    }
    leaves.sort((a, b) => a - b); // Sort to always pick the smallest leaf

    // Iterate over the Prufer code to build the tree
    pruferCode.forEach(node => {
        if (leaves.length === 0) {
            throw new Error("Invalid Prufer code: no leaves available to connect.");
        }
        const leaf = leaves.shift(); // Get the smallest leaf
        tree.addEdge(leaf, node);
        nodeDegree[node]--;

        if (nodeDegree[node] === 1) {
            // Insert in sorted order
            let index = leaves.findIndex(n => n > node);
            if (index === -1) {
                leaves.push(node);
            } else {
                leaves.splice(index, 0, node);
            }
        }
    });

    // Connect the last two remaining nodes
    const remaining = leaves;
    if (remaining.length !== 2) {
        throw new Error("Invalid Prufer code: should have exactly two remaining nodes.");
    }
    tree.addEdge(remaining[0], remaining[1]);

    return tree;
}

/**
 * Function to visualize the tree using Cytoscape.js
 * @param {Tree} tree - The tree to visualize
 */
function visualizeTree(tree) {
    // Prepare Cytoscape elements from the adjacency matrix
    const elements = [];
    const nodesSet = new Set();
    for (let i = 0; i < tree.numNodes; i++) {
        for (let j = i + 1; j < tree.numNodes; j++) {
            if (tree.matrix[i][j] === 1) {
                const source = (i + 1).toString();
                const target = (j + 1).toString();
                elements.push({ data: { id: source } });
                elements.push({ data: { id: target } });
                elements.push({ data: { source: source, target: target } });
                nodesSet.add(source);
                nodesSet.add(target);
            }
        }
    }

    // Remove duplicate node entries
    const uniqueElements = elements.filter((element, index, self) =>
        element.data.id ? index === self.findIndex((e) => e.data.id === element.data.id) : true
    );

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
 * Function to handle form submission and Prufer code decoding
 */
function handleFormSubmission() {
    const pruferForm = document.getElementById('pruferDecoderForm');
    const pruferResult = document.getElementById('decoderResult');

    pruferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pruferInput = document.getElementById('pruferCodeInput').value.trim();
        if (!pruferInput) {
            alert('Please enter a Prufer code.');
            return;
        }

        // Parse the Prufer code
        const pruferCode = pruferInput.split(',').map(num => parseInt(num.trim()));
        if (pruferCode.some(isNaN)) {
            alert('Please ensure all elements in the Prufer code are valid numbers.');
            return;
        }

        try {
            const tree = generateTreeFromPrufer(pruferCode);
            pruferResult.textContent = `✅ The tree has been generated successfully.`;
            visualizeTree(tree);
        } catch (error) {
            pruferResult.textContent = `❌ Error: ${error.message}`;
            // Clear the graph visualization if there's an error
            const cyContainer = document.getElementById('cy');
            cyContainer.innerHTML = '';
        }
    });

    document.getElementById('generateExample').addEventListener('click', function() {
        // Set an example Prufer code in the input field
        document.getElementById('pruferCodeInput').value = '4,4,4,5';
        
        // Trigger the form submission
        document.getElementById('pruferDecoderForm').requestSubmit();
    });
}

/**
 * Function to handle theme changes and adjust graph styles accordingly
 */
function handleThemeChanges() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    toggleSwitch.addEventListener('change', () => {
        const cyContainer = document.getElementById('cy');
        if (toggleSwitch.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            cyContainer.innerHTML = ''; // Clear existing graph
            // Optionally, regenerate the tree visualization if desired
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            cyContainer.innerHTML = ''; // Clear existing graph
            // Optionally, regenerate the tree visualization if desired
        }
    });
}

/**
 * Initialize the Prufer Code Decoder tool
 */
function initializePruferCodeDecoder() {
    handleFormSubmission();
    handleThemeChanges();
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePruferCodeDecoder);
