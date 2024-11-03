/**
 * This module contains all the functions for the generation of Steiner Triple Systems
 */

class SteinerTripleSystem {
    constructor(v) {
        this.v = v;
        this.LivePoints = new Array(v + 1).fill(0);
        this.IndexLivePoints = new Array(v + 1).fill(0);
        this.NumLivePairs = new Array(v + 1).fill(0);
        this.LivePairs = Array.from({ length: v + 1 }, () => new Array(v + 1).fill(0));
        this.IndexLivePairs = Array.from({ length: v + 1 }, () => new Array(v + 1).fill(0));
        this.Other = Array.from({ length: v + 1 }, () => new Array(v + 1).fill(0));
        this.NumLivePoints = v;
        this.NumBlocks = 0;
    }

    // Function to initialize the data structures
    initialize() {
        for (let x = 1; x <= this.v; x++) { // Adjust the range
            this.LivePoints[x] = x;
            this.IndexLivePoints[x] = x;
            this.NumLivePairs[x] = this.v - 1;
            for (let y = 1; y < this.v; y++) { // Adjust the range
                this.LivePairs[x][y] = ((y + x - 1) % this.v) + 1;
            }
            for (let y = 1; y <= this.v; y++) { // Adjust the range
                this.IndexLivePairs[x][y] = (y - x + this.v) % this.v;
                this.Other[x][y] = 0;
            }
        }
    }

    // Function to insert a pair into the system
    InsertPair(x, y) {
        if (this.NumLivePairs[x] === 0) {
            this.NumLivePoints += 1;
            this.LivePoints[this.NumLivePoints] = x;
            this.IndexLivePoints[x] = this.NumLivePoints;
        }
        this.NumLivePairs[x] += 1;
        let posn = this.NumLivePairs[x];
        this.LivePairs[x][posn] = y;
        this.IndexLivePairs[x][y] = posn;
    }

    // Function to delete a pair from the system
    DeletePair(x, y) {
        let posn = this.IndexLivePairs[x][y];
        let num = this.NumLivePairs[x];
        let z = this.LivePairs[x][num];
        this.LivePairs[x][posn] = z;
        this.IndexLivePairs[x][z] = posn;
        this.LivePairs[x][num] = 0;
        this.IndexLivePairs[x][y] = 0;
        this.NumLivePairs[x] -= 1;
        if (this.NumLivePairs[x] === 0) {
            posn = this.IndexLivePoints[x];
            let zLive = this.LivePoints[this.NumLivePoints];
            this.LivePoints[posn] = zLive;
            this.IndexLivePoints[zLive] = posn;
            this.LivePoints[this.NumLivePoints] = 0;
            this.NumLivePoints -= 1;
        }
    }

    // Function to add a block to the system
    AddBlock(x, y, z) {
        this.Other[x][y] = z;
        this.Other[y][x] = z;
        this.Other[x][z] = y;
        this.Other[z][x] = y;
        this.Other[y][z] = x;
        this.Other[z][y] = x;
        this.DeletePair(x, y);
        this.DeletePair(y, x);
        this.DeletePair(x, z);
        this.DeletePair(z, x);
        this.DeletePair(y, z);
        this.DeletePair(z, y);
    }

    // Function to exchange blocks in the system
    ExchangeBlock(x, y, z, w) {
        this.Other[x][y] = z;
        this.Other[y][x] = z;
        this.Other[x][z] = y;
        this.Other[z][x] = y;
        this.Other[y][z] = x;
        this.Other[z][y] = x;
        this.Other[w][y] = 0;
        this.Other[y][w] = 0;
        this.Other[w][z] = 0;
        this.Other[z][w] = 0;
        this.InsertPair(w, y);
        this.InsertPair(y, w);
        this.InsertPair(w, z);
        this.InsertPair(z, w);
        this.DeletePair(x, y);
        this.DeletePair(y, x);
        this.DeletePair(x, z);
        this.DeletePair(z, x);
    }

    // Function to perform a revised switch operation
    RevisedSwitch() {
        if (this.NumLivePoints === 0) {
            return; // No live points to switch
        }

        let r = this.getRandomInt(1, this.NumLivePoints);
        let x = this.LivePoints[r];
        if (this.NumLivePairs[x] < 2) {
            // Not enough pairs to perform switch
            return;
        }

        let sT = this.getRandomSample(1, this.NumLivePairs[x], 2);
        let s = Math.min(sT[0], sT[1]);
        let t = Math.max(sT[0], sT[1]);
        let y = this.LivePairs[x][s];
        let z = this.LivePairs[x][t];
        if (this.Other[y][z] === 0) {
            this.AddBlock(x, y, z);
            this.NumBlocks += 1;
        } else {
            let w = this.Other[y][z];
            this.ExchangeBlock(x, y, z, w);
        }
    }

    // Function to construct blocks from the system
    ConstructBlocks() {
        let B = [];
        for (let x = 1; x < this.v; x++) {
            for (let y = x + 1; y <= this.v; y++) {
                let z = this.Other[x][y];
                if (z > y) {
                    B.push([x, y, z]);
                }
            }
        }
        return B;
    }

    // Function to implement Revised Stinson's Algorithm
    RevisedStinsonsAlgorithm() {
        this.NumBlocks = 0;
        this.initialize();
        let targetBlocks = (this.v * (this.v - 1)) / 6;
        while (this.NumBlocks < targetBlocks) {
            this.RevisedSwitch();
        }
        return this.ConstructBlocks();
    }

    // Helper function to get random integer between min and max inclusive
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper function to get 'count' unique random samples between min and max inclusive
    getRandomSample(min, max, count) {
        let nums = [];
        for (let i = min; i <= max; i++) {
            nums.push(i);
        }
        // Shuffle the array using Fisher-Yates shuffle
        for (let i = nums.length - 1; i > 0; i--) {
            let j = this.getRandomInt(0, i);
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        return nums.slice(0, count);
    }
}

// Function to check if a given v is valid for an order of a Steiner Triple System
function isValidOrder(v) {
    return v % 6 === 1 || v % 6 === 3;
}

function generateSteinerTripleSystem(v) {
    if (!isValidOrder(v)) {
        throw new Error(`${v} is not a valid order for a Steiner Triple System`);
    }
    let sts = new SteinerTripleSystem(v);
    return sts.RevisedStinsonsAlgorithm();
}

// Function to check if a set of points and triples is a Steiner Triple System
function isSteinerTripleSystem(points, triples) {
    // Create a set of all triples
    let triples_set = new Set(triples.map(triple => frozenset(triple)));

    // Check if every pair of points appears in exactly one triple
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let pair = new Set([points[i], points[j]]);
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
    if (!isValidOrder(order)) {
        return false;
    }

    // Return true if all checks passed
    return true;
}

// Helper function to create a unique identifier for a set
function frozenset(arr) {
    return JSON.stringify([...arr].sort((a, b) => a - b));
}

// Helper function to check if subset is in superset
function isSubset(subset, superset) {
    for (let elem of subset) {
        if (!superset.has(elem)) {
            return false;
        }
    }
    return true;
}
