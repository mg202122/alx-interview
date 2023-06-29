#!/usr/bin/python3
"""Pascal Triangle module"""


def pascal_triangle(n):
    """Generates a list of lists based on pascal triangle"""
    pascal_t = []
    for i in range(1, n + 1):
        row = [1] * (i)
        for j in range(2, i):
            row[j - 1] = pascal_t[i - 2][j - 2] + pascal_t[i - 2][j - 1]
        pascal_t.append(row)
    return pascal_t
