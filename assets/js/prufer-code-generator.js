/**
 * Class representing a Tree and Prufer Code generation.
 */
class Tree {
    constructor(size) {
        if (size < 2) {
            throw new Error("Size of tree must be 2 or higher");
        }
        this.numNodes = size;
        this.numEdges = size - 1;
        this.matrix = Array.from({ length: size }, () => Array(size).fill(0));
        this.workingMatrix = Array.from({ length: size }, () => Array(size).fill(0));
    }

    addEdge(v, w) {
        this.matrix[v - 1][w - 1] = 1;
        this.matrix[w - 1][v - 1] = 1;
    }

    // Finding next leaf
    findLeaf() {
        for (let i = 0; i < this.numNodes; i++) {
            let count = 0;
            for (let j = 0; j < this.numNodes; j++) {
                if (this.workingMatrix[i][j]) {
                    count += 1;
                }
            }
            if (count === 1) {
                return i;
            }
        }
        return -1; // No leaf found
    }

    // Clearing all connections from a node, removing it from list
    clearConnections(node) {
        for (let i = 0; i < this.numNodes; i++) {
            this.workingMatrix[node][i] = 0;
            this.workingMatrix[i][node] = 0;
        }
    }

    // Generating Prufer code
    generatePrufer() {
        // Deep copy of the matrix
        this.workingMatrix = this.matrix.map(row => row.slice());
        const code = [];
        while (code.length < this.numNodes - 2) {
            const nextLeaf = this.findLeaf();
            if (nextLeaf === -1) {
                break; // Prevent infinite loop
            }
            // Find the neighbor of the leaf
            let neighbor = -1;
            for (let j = 0; j < this.numNodes; j++) {
                if (this.workingMatrix[nextLeaf][j]) {
                    neighbor = j;
                    break;
                }
            }
            if (neighbor !== -1) {
                code.push(neighbor + 1); // Convert to 1-based index
                this.clearConnections(nextLeaf);
            }
        }
        return code;
    }
}

/**
 * Function to generate edge input fields based on number of edges
 * @param {number} numEdges - Number of edges in the tree (n-1)
 */
function generateEdgeInputs(numEdges) {
    const edgesContainer = document.getElementById('edgesContainer');
    edgesContainer.innerHTML = ''; // Clear previous inputs
    
    const heading = document.createElement('h5');
    heading.textContent = 'Enter Edges (Format: Node A - Node B)';
    heading.classList.add('mb-3');
    edgesContainer.appendChild(heading);
    
    for (let i = 1; i <= numEdges; i++) {
        const edgeGroup = document.createElement('div');
        edgeGroup.classList.add('mb-3', 'row', 'align-items-center');
        
        const label = document.createElement('label');
        label.setAttribute('for', `edge${i}`);
        label.classList.add('col-sm-2', 'col-form-label');
        label.textContent = `Edge ${i}`;
        
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('col-sm-10');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-control');
        input.id = `edge${i}`;
        input.placeholder = 'e.g., 1-2';
        input.required = true;
        
        inputDiv.appendChild(input);
        edgeGroup.appendChild(label);
        edgeGroup.appendChild(inputDiv);
        
        edgesContainer.appendChild(edgeGroup);
    }
}

/**
 * Function to handle form submission and Prufer code generation
 */
function handleFormSubmission() {
    const pruferForm = document.getElementById('pruferForm');
    const pruferResult = document.getElementById('pruferResult');

    pruferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const numNodes = parseInt(document.getElementById('numNodes').value);
        if (isNaN(numNodes) || numNodes < 2) {
            alert('Please enter a valid number of nodes (n ≥ 2).');
            return;
        }
        const numEdges = numNodes - 1;
        const edgeInputs = [];
        for (let i = 1; i <= numEdges; i++) {
            const edgeInput = document.getElementById(`edge${i}`).value.trim();
            if (!edgeInput) {
                alert(`Please enter Edge ${i}.`);
                return;
            }
            const nodes = edgeInput.split('-').map(num => parseInt(num.trim()));
            if (nodes.length !== 2 || nodes.some(isNaN)) {
                alert(`Please enter a valid format for Edge ${i} (e.g., 1-2).`);
                return;
            }
            edgeInputs.push(nodes);
        }

        try {
            const tree = new Tree(numNodes);
            // Add edges to the tree
            edgeInputs.forEach(([v, w]) => {
                if (v < 1 || v > numNodes || w < 1 || w > numNodes) {
                    throw new Error(`Invalid node number in edge ${v}-${w}. Nodes must be between 1 and ${numNodes}.`);
                }
                tree.addEdge(v, w);
            });

            // Validate the tree by checking if it's connected and has no cycles
            // Since it's a tree, number of edges should be n-1 (already ensured)
            // Additional connectivity checks can be implemented if necessary

            const pruferCode = tree.generatePrufer();
            pruferResult.textContent = `✅ Prufer Code: (${pruferCode.join(', ')})`;
        } catch (error) {
            pruferResult.textContent = `❌ Error: ${error.message}`;
        }
    });
}

/**
 * Function to handle generating edge inputs when the button is clicked
 */
function handleGenerateEdgesButton() {
    const generateEdgesButton = document.getElementById('generateEdges');
    generateEdgesButton.addEventListener('click', () => {
        const numNodes = parseInt(document.getElementById('numNodes').value);
        if (isNaN(numNodes) || numNodes < 2) {
            alert('Please enter a valid number of nodes (n ≥ 2).');
            return;
        }
        const numEdges = numNodes - 1;
        generateEdgeInputs(numEdges);
    });
}

/**
 * Initialize the Prufer Code Generator tool
 */
function initializePruferCodeGenerator() {
    handleGenerateEdgesButton();
    handleFormSubmission();
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePruferCodeGenerator);
