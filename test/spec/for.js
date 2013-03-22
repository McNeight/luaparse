describe('for', function() {
  it('for                                     -- FAIL', function() {
    expect(parser.parse('for', {wait:true}).end).to.throwError(/^\[1:3\] <name> expected near '<eof>'$/);
  });
  it('for do                                  -- FAIL', function() {
    expect(parser.parse('for do', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near 'do'$/);
  });
  it('for end                                 -- FAIL', function() {
    expect(parser.parse('for end', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near 'end'$/);
  });
  it('for 1                                   -- FAIL', function() {
    expect(parser.parse('for 1', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near '1'$/);
  });
  it('for a                                   -- FAIL', function() {
    expect(parser.parse('for a', {wait:true}).end).to.throwError(/^\[1:5\] 'in' expected near '<eof>'$/);
  });
  it('for true                                -- FAIL', function() {
    expect(parser.parse('for true', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near 'true'$/);
  });
  it('for a, in                               -- FAIL', function() {
    expect(parser.parse('for a, in', {wait:true}).end).to.throwError(/^\[1:7\] <name> expected near 'in'$/);
  });
  it('for a in                                -- FAIL', function() {
    expect(parser.parse('for a in', {wait:true}).end).to.throwError(/^\[1:8\] <expression> expected near '<eof>'$/);
  });
  it('for a do                                -- FAIL', function() {
    expect(parser.parse('for a do', {wait:true}).end).to.throwError(/^\[1:6\] 'in' expected near 'do'$/);
  });
  it('for a in do                             -- FAIL', function() {
    expect(parser.parse('for a in do', {wait:true}).end).to.throwError(/^\[1:9\] <expression> expected near 'do'$/);
  });
  it('for a in b do                           -- FAIL', function() {
    expect(parser.parse('for a in b do', {wait:true}).end).to.throwError(/^\[1:13\] 'end' expected near '<eof>'$/);
  });
  it('for a in b end                          -- FAIL', function() {
    expect(parser.parse('for a in b end', {wait:true}).end).to.throwError(/^\[1:11\] 'do' expected near 'end'$/);
  });
  it('for a in b, do                          -- FAIL', function() {
    expect(parser.parse('for a in b, do', {wait:true}).end).to.throwError(/^\[1:12\] <expression> expected near 'do'$/);
  });
  it('for a in b do end', function() {
    expect(parser.parse('for a in b do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do local a local b end', function() {
    expect(parser.parse('for a in b do local a local b end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "a",
                  "isLocal": true
                }
              ],
              "init": []
            },
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "b",
                  "isLocal": true
                }
              ],
              "init": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do local a; local b; end', function() {
    expect(parser.parse('for a in b do local a; local b; end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "a",
                  "isLocal": true
                }
              ],
              "init": []
            },
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "b",
                  "isLocal": true
                }
              ],
              "init": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do 1 end                     -- FAIL', function() {
    expect(parser.parse('for a in b do 1 end', {wait:true}).end).to.throwError(/^\[1:14\] Unexpected number '1' near 'end'$/);
  });
  it('for a in b do "foo" end                 -- FAIL', function() {
    expect(parser.parse('for a in b do "foo" end', {wait:true}).end).to.throwError(/^\[1:14\] Unexpected string 'foo' near 'end'$/);
  });
  it('for a b in                              -- FAIL', function() {
    expect(parser.parse('for a b in', {wait:true}).end).to.throwError(/^\[1:6\] 'in' expected near 'b'$/);
  });
  it('for a, b, c in p do end', function() {
    expect(parser.parse('for a, b, c in p do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            },
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": true
            },
            {
              "type": "Identifier",
              "name": "c",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "p",
              "isLocal": false
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        }
      ]
    });
  });
  it('for a, b, c in p, q, r do end', function() {
    expect(parser.parse('for a, b, c in p, q, r do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            },
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": true
            },
            {
              "type": "Identifier",
              "name": "c",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "p",
              "isLocal": false
            },
            {
              "type": "Identifier",
              "name": "q",
              "isLocal": false
            },
            {
              "type": "Identifier",
              "name": "r",
              "isLocal": false
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "r",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in 1 do end', function() {
    expect(parser.parse('for a in 1 do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1"
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a in true do end', function() {
    expect(parser.parse('for a in true do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "BooleanLiteral",
              "value": true,
              "raw": "true"
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a in "foo" do end', function() {
    expect(parser.parse('for a in "foo" do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "StringLiteral",
              "value": "foo",
              "raw": "\"foo\""
            }
          ],
          "body": []
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a in b do break end', function() {
    expect(parser.parse('for a in b do break end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "BreakStatement"
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do return end', function() {
    expect(parser.parse('for a in b do return end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "ReturnStatement",
              "arguments": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do return return end         -- FAIL', function() {
    expect(parser.parse('for a in b do return return end', {wait:true}).end).to.throwError(/^\[1:21\] 'end' expected near 'return'$/);
  });
  it('for a in b do do end end', function() {
    expect(parser.parse('for a in b do do end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "DoStatement",
              "body": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do do break end end', function() {
    expect(parser.parse('for a in b do do break end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "DoStatement",
              "body": [
                {
                  "type": "BreakStatement"
                }
              ]
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for a in b do do return end end', function() {
    expect(parser.parse('for a in b do do return end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForGenericStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a",
              "isLocal": true
            }
          ],
          "iterators": [
            {
              "type": "Identifier",
              "name": "b",
              "isLocal": false
            }
          ],
          "body": [
            {
              "type": "DoStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "arguments": []
                }
              ]
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "b",
          "isLocal": false
        }
      ]
    });
  });
  it('for =                                   -- FAIL', function() {
    expect(parser.parse('for =', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near '='$/);
  });
  it('for a =                                 -- FAIL', function() {
    expect(parser.parse('for a =', {wait:true}).end).to.throwError(/^\[1:7\] <expression> expected near '<eof>'$/);
  });
  it('for a, b =                              -- FAIL', function() {
    expect(parser.parse('for a, b =', {wait:true}).end).to.throwError(/^\[1:9\] 'in' expected near '='$/);
  });
  it('for a = do                              -- FAIL', function() {
    expect(parser.parse('for a = do', {wait:true}).end).to.throwError(/^\[1:8\] <expression> expected near 'do'$/);
  });
  it('for a = 1, do                           -- FAIL', function() {
    expect(parser.parse('for a = 1, do', {wait:true}).end).to.throwError(/^\[1:11\] <expression> expected near 'do'$/);
  });
  it('for a = p, q, do                        -- FAIL', function() {
    expect(parser.parse('for a = p, q, do', {wait:true}).end).to.throwError(/^\[1:14\] <expression> expected near 'do'$/);
  });
  it('for a = p q do                          -- FAIL', function() {
    expect(parser.parse('for a = p q do', {wait:true}).end).to.throwError(/^\[1:10\] ',' expected near 'q'$/);
  });
  it('for a = b do end                        -- FAIL', function() {
    expect(parser.parse('for a = b do end', {wait:true}).end).to.throwError(/^\[1:10\] ',' expected near 'do'$/);
  });
  it('for a = 1, 2, 3, 4 do end               -- FAIL', function() {
    expect(parser.parse('for a = 1, 2, 3, 4 do end', {wait:true}).end).to.throwError(/^\[1:15\] 'do' expected near ','$/);
  });
  it('for a = p, q do end', function() {
    expect(parser.parse('for a = p, q do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": null,
          "body": []
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        }
      ]
    });
  });
  it('for a = 1, 2 do end', function() {
    expect(parser.parse('for a = 1, 2 do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "NumericLiteral",
            "value": 1,
            "raw": "1"
          },
          "end": {
            "type": "NumericLiteral",
            "value": 2,
            "raw": "2"
          },
          "step": null,
          "body": []
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a = 1, 2 do local a local b end', function() {
    expect(parser.parse('for a = 1, 2 do local a local b end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "NumericLiteral",
            "value": 1,
            "raw": "1"
          },
          "end": {
            "type": "NumericLiteral",
            "value": 2,
            "raw": "2"
          },
          "step": null,
          "body": [
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "a",
                  "isLocal": true
                }
              ],
              "init": []
            },
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "b",
                  "isLocal": true
                }
              ],
              "init": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a = 1, 2 do local a; local b; end', function() {
    expect(parser.parse('for a = 1, 2 do local a; local b; end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "NumericLiteral",
            "value": 1,
            "raw": "1"
          },
          "end": {
            "type": "NumericLiteral",
            "value": 2,
            "raw": "2"
          },
          "step": null,
          "body": [
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "a",
                  "isLocal": true
                }
              ],
              "init": []
            },
            {
              "type": "LocalStatement",
              "variables": [
                {
                  "type": "Identifier",
                  "name": "b",
                  "isLocal": true
                }
              ],
              "init": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a = 1, 2 do 3 end                   -- FAIL', function() {
    expect(parser.parse('for a = 1, 2 do 3 end', {wait:true}).end).to.throwError(/^\[1:16\] Unexpected number '3' near 'end'$/);
  });
  it('for a = 1, 2 do "foo" end               -- FAIL', function() {
    expect(parser.parse('for a = 1, 2 do "foo" end', {wait:true}).end).to.throwError(/^\[1:16\] Unexpected string 'foo' near 'end'$/);
  });
  it('for a = p, q, r do end', function() {
    expect(parser.parse('for a = p, q, r do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": {
            "type": "Identifier",
            "name": "r",
            "isLocal": false
          },
          "body": []
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "r",
          "isLocal": false
        }
      ]
    });
  });
  it('for a = 1, 2, 3 do end', function() {
    expect(parser.parse('for a = 1, 2, 3 do end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "NumericLiteral",
            "value": 1,
            "raw": "1"
          },
          "end": {
            "type": "NumericLiteral",
            "value": 2,
            "raw": "2"
          },
          "step": {
            "type": "NumericLiteral",
            "value": 3,
            "raw": "3"
          },
          "body": []
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a = p, q do break end', function() {
    expect(parser.parse('for a = p, q do break end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": null,
          "body": [
            {
              "type": "BreakStatement"
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        }
      ]
    });
  });
  it('for a = 1, 2 do return end', function() {
    expect(parser.parse('for a = 1, 2 do return end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "NumericLiteral",
            "value": 1,
            "raw": "1"
          },
          "end": {
            "type": "NumericLiteral",
            "value": 2,
            "raw": "2"
          },
          "step": null,
          "body": [
            {
              "type": "ReturnStatement",
              "arguments": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": []
    });
  });
  it('for a = 1, 2 do return return end       -- FAIL', function() {
    expect(parser.parse('for a = 1, 2 do return return end', {wait:true}).end).to.throwError(/^\[1:23\] 'end' expected near 'return'$/);
  });
  it('for a = p, q do do end end', function() {
    expect(parser.parse('for a = p, q do do end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": null,
          "body": [
            {
              "type": "DoStatement",
              "body": []
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        }
      ]
    });
  });
  it('for a = p, q do do break end end', function() {
    expect(parser.parse('for a = p, q do do break end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": null,
          "body": [
            {
              "type": "DoStatement",
              "body": [
                {
                  "type": "BreakStatement"
                }
              ]
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        }
      ]
    });
  });
  it('for a = p, q do do return end end', function() {
    expect(parser.parse('for a = p, q do do return end end', { scope: true })).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "ForNumericStatement",
          "variable": {
            "type": "Identifier",
            "name": "a",
            "isLocal": true
          },
          "start": {
            "type": "Identifier",
            "name": "p",
            "isLocal": false
          },
          "end": {
            "type": "Identifier",
            "name": "q",
            "isLocal": false
          },
          "step": null,
          "body": [
            {
              "type": "DoStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "arguments": []
                }
              ]
            }
          ]
        }
      ],
      "comments": [],
      "globals": [
        {
          "type": "Identifier",
          "name": "p",
          "isLocal": false
        },
        {
          "type": "Identifier",
          "name": "q",
          "isLocal": false
        }
      ]
    });
  });
});
