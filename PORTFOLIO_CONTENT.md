# Joshua Ganschow — Portfolio Content Reference

This document consolidates the information that appeared across the portfolio before its 2026 redesign. It is the reference copy for future site changes. Interactive mathematical tools are archived here for historical context but are no longer part of the live portfolio.

## Profile

Joshua Ganschow is a Computer Science and Mathematics student at Dakota State University with a strong background in competitive programming and algorithm design for combinatorics and graph theory. He enjoys building software, solving difficult algorithmic problems, and applying mathematics to software systems.

He is a PassageMath maintainer and a SageMath contributor.

Primary areas of focus:

- Full-stack software engineering
- Algorithms and data structures
- Graph theory and combinatorics
- Competitive programming
- Mathematical research and visualization
- Open-source mathematical software

## Contact

- Personal email: [ganschowjosh@gmail.com](mailto:ganschowjosh@gmail.com)
- School email: [Joshua.Ganschow@trojans.dsu.edu](mailto:Joshua.Ganschow@trojans.dsu.edu)
- LinkedIn: [linkedin.com/in/joshua-ganschow](https://www.linkedin.com/in/joshua-ganschow/)
- GitHub: [github.com/GanschowJosh](https://github.com/GanschowJosh)

## Skills

- Languages: Python, C/C++, C#, SQL, TypeScript
- Frameworks and engineering: ASP.NET, REST APIs, full-stack development, automated testing
- Systems and tools: Git, Docker, Azure DevOps, SQL Server, CI/CD
- Core areas: algorithms and data structures, graph theory, combinatorics, competitive programming

## Experience

### Software Engineering Intern — Omnitech, Inc.

May 2025–Present

- Developed an internal contract management system used by sales, accounting, project managers, and engineers.
- Built full-stack features using ASP.NET, C#, SQL, and TypeScript for time-tracking and billing workflows.
- Implemented automated end-to-end and regression tests for enterprise applications.
- Set up CI/CD pipelines in Azure DevOps for build and deployment automation.
- Optimized SQL Server schemas and queries.

### GROWSTEM Student Mentor — Dakota State University

August 2024–Present

- Mentors recipients of the GROWSTEM scholarship.
- Works with program coordinators to support student success.
- Provides academic support and supplemental instruction.

## Education

### Bachelor of Science in Computer Science and Mathematics

Dakota State University, Madison, South Dakota  
2023–2026 (anticipated)  
GPA: 3.96

### Master of Science in Computer Science

Dakota State University, Madison, South Dakota  
2025–2027 (anticipated)

This is a 4+1 program. Dual-credit coursework during the final year of the bachelor's program enables completion of the master's degree in one additional year.

### Relevant coursework

- Programming Fundamentals
- Data Structures
- Object-Oriented Design
- Structured Systems Analysis
- Discrete Mathematics
- Combinatorics / Combinatorial Designs
- Linear Algebra
- Game Theory
- Statistics
- Calculus
- Number Theory and Cryptography
- Assembly Language

## Leadership and Activities

### President — Competitive Programming Club, Dakota State University

August 2024–Present

- Leads weekly meetings on algorithms, data structures, and problem solving.
- Led and competed on a team that qualified for the ICPC North America Championship.
- Led and competed on a team that placed second in the DigiKey Collegiate Computing Competition (DKC3).

### Leader — Math Club, Dakota State University

August 2024–Present

- Hosts sessions on advanced mathematical topics and combinatorics.
- Fosters a collaborative environment for exploring mathematics beyond coursework.

## Projects

### Thread-Safe Queue and Worker Pool

CSC718 · C, POSIX threads, concurrency, systems programming

A bounded producer-consumer queue and worker pool implemented in C. The project uses POSIX threads for concurrent job processing and includes correctness checks, performance timing, and worker statistics.

- [GitHub repository](https://github.com/GanschowJosh/threadPool)

### SageMath and PassageMath

Python · Open source · Mathematical software

Joshua contributed an implementation of Stinson's randomized hill-climbing algorithm for Steiner triple system generation to SageMath. The contribution added an optional algorithm parameter without changing the existing default behavior, preserving backward compatibility. It included tests and documentation and was merged on July 26, 2026.

Joshua also serves as a maintainer of PassageMath, the modular, pip-installable, Sage-compatible mathematical software distribution.

- [Merged SageMath pull request #42510](https://github.com/sagemath/sage/pull/42510)
- [PassageMath organization](https://github.com/passagemath)

### Small Antiperfect Steiner Triple Systems

November 2023–February 2026 · Python, C/C++

An in-depth research project on the generation, enumeration, and analysis of Steiner triple systems and their combinatorial and graph-theoretic structure.

Key work and outcomes:

- First author on a peer-reviewed publication in *Discrete Mathematics*.
- Implemented a modified Stinson hill-climbing algorithm to construct Steiner triple systems.
- Designed pruning strategies to reduce an exponential search space.
- Parallelized the enumeration of approximately 6,000,000 systems.
- Built reusable Python modules using object-oriented principles.
- Translated mathematical properties into executable tests and algorithms.

Publication:

- *Small Antiperfect Steiner Triple Systems*
- DOI: [10.1016/j.disc.2026.115061](https://doi.org/10.1016/j.disc.2026.115061)

Origin: After Joshua demonstrated his programming skills to Dr. Schroeder, his Discrete Mathematics professor, Dr. Schroeder invited him to join the research. The project introduced Joshua to what became his favorite field of mathematics.

Usage: Clone the repository and run `main.py`. Enter the desired valid order and number of systems; the program prints them to the console.

Links:

- [GitHub repository](https://github.com/GanschowJosh/Steiner-Triple-Systems-Research)
- [Background on Steiner triple systems](https://en.wikipedia.org/wiki/Steiner_system#Steiner_triple_systems)
- Image asset: `assets/images/STS-output.png`

### Latin Square Tools

A toolkit for generating and analyzing Latin squares for combinatorial research and experimentation.

- [GitHub repository](https://github.com/GanschowJosh/LatinSquareTools/)

### Prime Grid Labeling

Python · Graph theory · Collaborative research

A program for generating an `n` by `m` matrix labeled with the integers 1 through `n*m` so every pair of neighboring values is coprime. This structure can be mapped to prime graph labeling. The project is a collaboration among six Dakota State University undergraduate students.

Motivation:

- A professor suggested graph labeling in the context of a matrix after a research presentation.
- The project offered a way to explore graph theory and graph algorithms with other motivated students.
- The team wanted to contribute to the study of prime graph labeling.

Skills and work:

- Created Python modules using object-oriented principles.
- Applied graph structure, graph algorithms, and mathematical reasoning.
- Worked concurrently with five other students using Git.
- Communicated regularly about project requirements and ideas.
- Translated mathematical theory into executable code.

Usage: Set `START_N` and `END_N` as the lower and upper bounds for grids to generate, then run `runner.py`. Generated matrices are written to the `grids` directory. The repository README contains further details.

Links:

- [GitHub repository](https://github.com/GanschowJosh/PrimeGridLabeling/)
- Image asset: `assets/images/prime-labeling.png`

### Visual Inductive Proof

Python · Matplotlib · Discrete mathematics

A visualization of the inductive proof that any `2^n` by `2^n` grid with one square removed can be completely tiled by L-shaped triominoes.

Origin: Joshua first wrote the proof for a Discrete Mathematics assignment, then created a Python visualization to make it easier to understand. After seeing the script, his professor invited him to join the Steiner triple systems research project.

Skills and work:

- Implemented the proof as an algorithm in Python.
- Used Matplotlib to clearly visualize a mathematical construction.
- Strengthened knowledge of induction and combinatorial mathematics.
- Labeled the output to show the order in which triominoes were placed.

Usage: Run the Python script, enter the requested grid size, and select the row and column of the missing square. The program displays the resulting labeled tiling.

Links:

- [Source on GitHub](https://github.com/GanschowJosh/DiscreteMath/blob/main/triominoes.py)
- Image asset: `assets/images/triominoes.png`

### Competitive Programming

Python · Algorithms · Data structures

Joshua maintains public solution repositories for Kattis, CSES, LeetCode, and Advent of Code. The solutions cover arrays, graphs, trees, strings, dynamic programming, and other common algorithmic topics.

This work supports his competitive-programming practice, club leadership, and preparation for contests including ICPC and DKC3.

- [Kattis solutions](https://github.com/GanschowJosh/Kattis)
- [CSES solutions](https://github.com/GanschowJosh/CSES)
- [LeetCode solutions](https://github.com/GanschowJosh/Leetcode)
- [Advent of Code solutions](https://github.com/GanschowJosh/aoc)

## Archived Interactive Tools

These tools existed in the previous portfolio. They and their supporting JavaScript have been removed from the live site so the portfolio can focus on projects and résumé content.

### Steiner Triple Systems Generator

Generated a Steiner triple system from a requested order. It accepted a positive integer below 100 congruent to 1 or 3 modulo 6 and could load a random valid example. The output was displayed as comma-separated triples.

### Pasch / Anti-Pasch Checker

Accepted triples as comma-separated, hyphen-delimited values and reported whether a Steiner triple system contained a Pasch configuration or was anti-Pasch. It also checked for malformed and duplicate triples and included both Pasch and anti-Pasch examples.

- [Background on Pasch configurations](https://encyclopediaofmath.org/wiki/Pasch_configuration)

### Steiner Triple System Validator

Accepted a set of triples and checked whether it satisfied the requirements of a valid Steiner triple system.

### Prüfer Code Generator

Accepted the number of nodes and a tree's edges, then generated the corresponding Prüfer sequence.

- [Background on Prüfer sequences](https://en.wikipedia.org/wiki/Pr%C3%BCfer_sequence)

### Prüfer Code Decoder

Accepted a comma-separated Prüfer sequence, reconstructed the corresponding tree, and visualized it with Cytoscape.js.

- [Background on Prüfer sequences](https://en.wikipedia.org/wiki/Pr%C3%BCfer_sequence)

### Magic Square Checker

Accepted a square matrix and reported whether it was a valid magic square.

## Historical Assets Not Used in the Redesign

The repository also contains the following image assets from earlier versions of the site:

- `assets/images/hero-background.jpg` — ICPC North America Championship photograph
- `assets/images/steiner-triples.png` — Steiner triples graphic
- `assets/images/pptx-to-md.png` — PowerPoint-to-Markdown graphic
- `assets/images/leetcode.png` — LeetCode graphic
- `assets/images/Kattis.jpg` — Kattis graphic
- `assets/images/cses.jpg` — CSES graphic
