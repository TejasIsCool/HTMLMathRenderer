### General info:

To use the script, put this in the head of the script

```html
<script src="https://cdn.jsdelivr.net/gh/TejasIsCool/MathToHTML@v0.1.5/dist/math-eq.min.js" defer></script>
```

You can then enter your math equations in the body of the page like this
```html
<m-eq>2^{2^3}</m-eq>
```
Making content with `<m-eq>` preserves the spaces as written in the html file.\
If you do not want to preserve spaces, you can use the `<m-eqi>` tag instead.

The tags will render inline (on the same line as written). They can wrap the text after them, if its big enough. By default, equations use the KaTeX math font (`'KaTeX_Main', serif`), which is loaded automatically. You can easily customize or override the font in your own CSS (e.g. `m-eq { font-family: 'Times New Roman', serif; }`).

### Commands:
The syntax has similarities with latex, but it a lot less features and more simpler than it. 

- <b>Subscript/Superscript</b>: You can write subscripts and superscripts. You can also write both together.\
<b>Syntax</b>: `base^{superscript}` or `base_{subscript}` or `base_{subscript}^{superscript}`. The curly braces are not necessary, but are required if you want to have multiple stuff/characters in the superscript or subscript.\
You can also chain this, so `2^{3^{4^5}}` works.


- <b>Groupings</b>: You can use curly braces `{}` to "group" stuff into a single element.\
Like in the example above `<m-eq>2^{2^3}</m-eq>`, the `2^3` is made into one element, which is then added as superscript to the 2 infront.
You can also group stuff inside groups, recursively! So `{{{{Also works}}}}`.\
 To actually use the curly braces, you will have to escape them with a backslash, like `\{` and `\}`.

- <b>Math</b>:
    - Fractions: `\frac{numerator}{denominator}`.
    - Roots: `\sqrt{content}` for square root, and `\root{index}{content}` for n-th root.
    - Brackets and Delimiters: `\left{bracket}{content}` and `\right{bracket}{content}`.\
    The brackets will scale to the height of the content. You can use `\{` and `\}` for curly braces, and `\langle` and `\rangle` for angle brackets.\
    This is useful for things like piecewise functions, or making matrices (below).
    
        Example:
        ```html
        <m-eq>
            T = \left{[}{\right{]}{
                1      2  3<br>
                4  5  6<br>
                7  8  9
            }}
        </m-eq>
        ```
        (Here, the right bracket is scaled to the height of the matrix, and the left bracket is scaled to the height of the right bracket, which is the same as the height of the matrix.)\
        There is no matrix command, so this is how they are made.
    - Overline and Underline:
        - `\overline{content}`: Draws a horizontal line above the content. Shorter or taller text/content will auto adjust the line position.
        - `\underline{content}`: Draws a horizontal line below the content. 
    - Cancel: 
        - `\cancel{stuff}` will draw a line over the content from top right to bottom left
        - `\cancelangle{angle}{stuff}` draws a line at your specified angle. The angle must be in degrees.
        - `\canceldir{dir}{stuff}` to set a direction to draw the lines at. The possible directions are:
            - Top left to bottom right: `tlbr` | `brtl` | `diagonal` | `diag` | `\` | `d`
            - Top tight to bottom left: `trbl` | `bltr` | `antidiagonal` | `antidiag` | `adiag` | `/` | `ad`
            - Top to bottom: `ud` | `du` | `vertical` | `vert` | `v` | `|`
            - Left to right: `lr` | `rl` | `horizontal` | `horiz` | `h` | `-`


- <b>Fonts and Alphabets</b>:
    - `\mathbb{content}`: Converts ASCII letters and digits inside `{content}` into blackboard bold / double-struck characters (e.g., `\mathbb{R}` becomes ℝ).
    - `\mathcal{content}`: Converts ASCII letters inside `{content}` into calligraphic / script characters (e.g., `\mathcal{L}` becomes ℒ).


- <b>Positioning</b>:
    - Over and Under: `\over{top}{main}` and `\under{bottom}{main}`. This will place the first argument directly over or under the second argument.
    - Scaling and Rotation:
        - `\scale{factor}{content}`: Scales the content by a factor (uses CSS zoom).
        - `\scalew{factor}{content}`: Scales only the width.
        - `\scaleh{factor}{content}`: Scales only the height.
        - `\rotate{degrees}{content}`: Rotates the content.
    - Attaching:
        - `\attach{main}{tr}{br}{tl}{bl}{up}{down}`: Attaches the scripts to the main element. The first argument is the main element, and the rest are the scripts. The order is top-right, bottom-right, top-left, bottom-left, up, down. If you don't want to use a script, just leave it empty.\
        Example: Suppose i wanted to attach text both above and below a line, I would do this:
            ```html
            <m-eq>\attach{AB}{}{}{Above}{Below}{}{}\end{m-eq}
            ```
        - `\attacho{main}{tr}{br}{tl}{bl}{up}{down}{overlap}`: Same as above, but with an overlap parameter. This will pull the scripts closer to the main element. The overlap is in ems, so `0.3em` is a good value, that the attach function uses by default.
        - `\attachos{main}{tr}{br}{tl}{bl}{up}{down}{overlap}{scale}`: Same as above, but with both an overlap parameter and a custom scale for the scripts. The scale allows you to change the size of the attached elements. By default, attach uses a scale of `0.6`, but you can change it to whatever you want with this.\
        (attachos is fun to say)

- <b>Symbols</b>\
To use these symbols, just write `\command`, where the command is the command of the symbol as below, or `\alias`, if the command has an alias.

    #### Greek Letters - Lowercase

    | Symbol | Command | Alias |
    |:---:|---|---|
    | α | `alpha` | `a` |
    | β | `beta` | `b` |
    | γ | `gamma` | `g` |
    | δ | `delta` | `d` |
    | ε | `epsilon` | `e` |
    | ζ | `zeta` | `z` |
    | η | `eta` | `h` |
    | θ | `theta` | `th` |
    | ι | `iota` | `i` |
    | κ | `kappa` | `k` |
    | λ | `lambda` | `l` |
    | μ | `mu` | `m` |
    | ν | `nu` | `n` |
    | ξ | `xi` | `x` |
    | ο | `omicron` | `o` |
    | π | `pi` | `p` |
    | ρ | `rho` | `r` |
    | σ | `sigma` | `s` |
    | τ | `tau` | `t` |
    | υ | `upsilon` | `u` |
    | φ | `phi` | `f` |
    | χ | `chi` | `c` |
    | ψ | `psi` | `ps` |
    | ω | `omega` | - |

    ---

    #### Greek Letters - Uppercase

    | Symbol | Command | Alias |
    |:---:|---|---|
    | Α | `Alpha` | `A` |
    | Β | `Beta` | `B` |
    | Γ | `Gamma` | `G` |
    | Δ | `Delta` | `D` |
    | Ε | `Epsilon` | `E` |
    | Ζ | `Zeta` | `Z` |
    | Η | `Eta` | `H` |
    | Θ | `Theta` | `Th` |
    | Ι | `Iota` | `I` |
    | Κ | `Kappa` | `K` |
    | Λ | `Lambda` | `L` |
    | Μ | `Mu` | `M` |
    | Ν | `Nu` | `N` |
    | Ξ | `Xi` | `X` |
    | Ο | `Omicron` | `O` |
    | Π | `Pi` | `P` |
    | Ρ | `Rho` | `R` |
    | Σ | `Sigma` | `S`, `sumb` |
    | Τ | `Tau` | `T` |
    | Υ | `Upsilon` | `U` |
    | Φ | `Phi` | `F` |
    | Χ | `Chi` | `C` |
    | Ψ | `Psi` | `Ps` |
    | Ω | `Omega` | - |

    ---

    #### Big Operators (Sum, Product, Integral, Root)

    | Symbol | Command
    |:---:|---
    | Σ | `sum` 
    | Σ | `sumb`  
    | ∏ | `prod` 
    | ∏ | `prodb` 
    | ∫ | `int` 
    | ∫ | `intb` 
    | ∬ | `iint`
    | ∭ | `iiint`
    | ∮ | `oint`
    | √ | `sqrt`

    `sum` contains a hidden zero-width character (`U+200`) at the end of the key, so the parser distinguishes it from `Sigma`/`S`/`sumb` even though both render as `Σ`. Same with `prod` and `int`. \
    These render inline versions of the symbols when paired with ^ and _ (ie, the superscript and subscript are on sides), whereas the `sumb`, `prodb`, `intb` have the subscript and superscript on top and below them.

    ---

    #### Set Theory

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | ∪ | `cup` | - |
    | ∪ | `union` | `bigcup` |
    | ∩ | `cap` | - |
    | ∩ | `intersect` | `bigcap` |
    | ∈ | `in` | - |
    | ∉ | `notin` | - |
    | ⊂ | `subset` | - |
    | ⊆ | `subseteq` | - |
    | ⊃ | `supset` | - |
    | ⊇ | `supseteq` | - |

    `cup` and `cap` also contain the hidden zero-width character, and act the same as sum.

    ---

    #### Relational / Comparison Operators

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | = | `eq` | `equal`, `equals` |
    | < | `lt` | - |
    | > | `gt` | - |
    | ≤ | `leq` | - |
    | ≥ | `geq` | - |
    | ≠ | `neq` | - |
    | ≈ | `approx` | - |
    | ≅ | `cong` | - |
    | ≡ | `equiv` | - |
    | ∼ | `sim` | - |
    | ≃ | `simeq` | - |
    | ≢ | `nequiv` | - |
    | ≇ | `ncong` | - |
    | ≁ | `nsim` | - |
    | ≄ | `nsimeq` | - |
    | ≉ | `napprox` | - |
    | ∝ | `prop` | `propto` |

    ---

    #### Logic / Quantifiers

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | ∀ | `forall` | - |
    | ∃ | `exists` | - |
    | ∴ | `therefore` | - |
    | ∵ | `because` | `since` |

    ---

    #### Arithmetic Operators

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | × | `times` | `cross` |
    | ÷ | `div` | - |
    | ± | `pm` | - |
    | ∓ | `mp` | - |
    | ⋅ | `cdot` | - |

    ---

    #### Other Symbols

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | ∞ | `infty` | - |
    | ⌊ | `lfloor` | - |
    | ⌋ | `rfloor` | - |
    | ⌈ | `lceil` | - |
    | ⌉ | `rceil` | - |
    | ⟨ | `langle` | - |
    | ⟩ | `rangle` | - |

    ---

    #### Arrows

    | Symbol | Command | Alias(es) |
    |:---:|---|---|
    | → | `rightarrow` | `to` |
    | ← | `leftarrow` | - |
    | ↑ | `uparrow` | - |
    | ↓ | `downarrow` | - |
    | ↔ | `leftrightarrow` | - |
    | ⇌ | `rightleftarrows` | - |
    | ↦ | `mapsto` | - |
    | ⇒ | `implies` | `Rightarrow` |
    | ⇔ | `iff` | `equivalent`, `LeftRightarrow` |
    | ⇐ | `Leftarrow` | - |
    | ⇒ | `Rightarrow` | - |
    | ⇑ | `Uparrow` | - |
    | ⇓ | `Downarrow` | - |
    | ⇔ | `LeftRightarrow` | - |
    | ⟶ | `Longrightarrow` | - |
    | ⟵ | `Longleftarrow` | - |
    | ⟹ | `LongRightarrow` | - |
    | ⟸ | `LongLeftarrow` | -  |
    | ⟷ | `Longleftrightarrow` | - |
    | ⟼ | `Longmapsto` | - |
    | ⟺ | `LongEquiv` | - |

    More kinds of arrows are supported, to get a full list, go to [Arrow documentation](./documentation_arrows.md)


    #### Literal / Escape Characters

    These have more meaning to the parser, but just escaping them will print the symbol itself.

    | Symbol | Command | Purpose |
    |:---:|---|---|
    | `^` | `^` | Literal caret (escapes superscript trigger) |
    | `_` | `_` | Literal underscore (escapes subscript trigger) |
    | `\` | `\` | Literal backslash |


### Additional info:

- You need not use text in your equations, you can use any other element as well! For instance, images! Most of the commands should be able to adapt to the sizes of the images.\
    Example usage
    ```html
    <m-eq>\sqrt{<img src="./testimg.png">}_2^3</m-eq>
    ```
    The sqrt symbol will go over the image in this case.

#### Alternate way of obtaining the math equation div:
You can use the function `mathStrToHtml`. It takes in a string, and it will output a `HTMLDIVELEMENT` that has the converted version of the string.