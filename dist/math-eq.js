(() => {
  // src/constants.js
  var escape_word_map = {
    "sum": "\u03A3\u200B",
    // has a U+200 zero with character at end, so it is considered different by the parser
    "sumb": "\u03A3",
    "prod": "\u220F\u200B",
    // U+200
    "prodb": "\u220F",
    "union": "\u222A",
    "cup": "\u222A\u200B",
    // U+200
    "bigcup": "\u222A",
    "intersect": "\u2229",
    "cap": "\u2229\u200B",
    // U+200
    "bigcap": "\u2229",
    "alpha": "\u03B1",
    "a": "\u03B1",
    "beta": "\u03B2",
    "b": "\u03B2",
    "gamma": "\u03B3",
    "g": "\u03B3",
    "delta": "\u03B4",
    "d": "\u03B4",
    "epsilon": "\u03B5",
    "e": "\u03B5",
    "zeta": "\u03B6",
    "z": "\u03B6",
    "eta": "\u03B7",
    "h": "\u03B7",
    "theta": "\u03B8",
    "th": "\u03B8",
    "iota": "\u03B9",
    "i": "\u03B9",
    "kappa": "\u03BA",
    "k": "\u03BA",
    "lambda": "\u03BB",
    "l": "\u03BB",
    "mu": "\u03BC",
    "m": "\u03BC",
    "nu": "\u03BD",
    "n": "\u03BD",
    "xi": "\u03BE",
    "x": "\u03BE",
    "omicron": "\u03BF",
    "o": "\u03BF",
    "pi": "\u03C0",
    "p": "\u03C0",
    "rho": "\u03C1",
    "r": "\u03C1",
    "sigma": "\u03C3",
    "s": "\u03C3",
    "tau": "\u03C4",
    "t": "\u03C4",
    "upsilon": "\u03C5",
    "u": "\u03C5",
    "phi": "\u03C6",
    "f": "\u03C6",
    "chi": "\u03C7",
    "c": "\u03C7",
    "psi": "\u03C8",
    "ps": "\u03C8",
    "omega": "\u03C9",
    // Capitals
    "Alpha": "\u0391",
    "A": "\u0391",
    "Beta": "\u0392",
    "B": "\u0392",
    "Gamma": "\u0393",
    "G": "\u0393",
    "Delta": "\u0394",
    "D": "\u0394",
    "Epsilon": "\u0395",
    "E": "\u0395",
    "Zeta": "\u0396",
    "Z": "\u0396",
    "Eta": "\u0397",
    "H": "\u0397",
    "Theta": "\u0398",
    "Th": "\u0398",
    "Iota": "\u0399",
    "I": "\u0399",
    "Kappa": "\u039A",
    "K": "\u039A",
    "Lambda": "\u039B",
    "L": "\u039B",
    "Mu": "\u039C",
    "M": "\u039C",
    "Nu": "\u039D",
    "N": "\u039D",
    "Xi": "\u039E",
    "X": "\u039E",
    "Omicron": "\u039F",
    "O": "\u039F",
    "Pi": "\u03A0",
    "P": "\u03A0",
    "Rho": "\u03A1",
    "R": "\u03A1",
    "Sigma": "\u03A3",
    "S": "\u03A3",
    "Tau": "\u03A4",
    "T": "\u03A4",
    "Upsilon": "\u03A5",
    "U": "\u03A5",
    "Phi": "\u03A6",
    "F": "\u03A6",
    "Chi": "\u03A7",
    "C": "\u03A7",
    "Psi": "\u03A8",
    "Ps": "\u03A8",
    "Omega": "\u03A9",
    // Maths
    "eq": "=",
    "equal": "=",
    "equals": "=",
    "lt": "&lt;",
    // As html doesn't rly like using <> freely
    "leq": "\u2264",
    "gt": "&gt;",
    "geq": "\u2265",
    "neq": "\u2260",
    "times": "\xD7",
    "div": "\xF7",
    "pm": "\xB1",
    "mp": "\u2213",
    "cdot": "\u22C5",
    "to": "\u2192",
    "infty": "\u221E",
    "approx": "\u2248",
    "cong": "\u2245",
    "equiv": "\u2261",
    "sim": "\u223C",
    "simeq": "\u2243",
    "nequiv": "\u2262",
    "ncong": "\u2247",
    "nsim": "\u2241",
    "nsimeq": "\u2244",
    "napprox": "\u2249",
    "cross": "\xD7",
    // Same as times, added it for myself
    "prop": "\u221D",
    "propto": "\u221D",
    "in": "\u2208",
    "notin": "\u2209",
    "subset": "\u2282",
    "subseteq": "\u2286",
    "subsetneq": "\u228A",
    "supset": "\u2283",
    "supseteq": "\u2287",
    "supsetneq": "\u228B",
    "int": "\u222B\u200B",
    "intb": "\u222B",
    "iint": "\u222C",
    "iiint": "\u222D",
    "oint": "\u222E",
    "sqrt": "\u221A",
    // Arrows
    "leftarrow": "\u2190",
    "rightarrow": "\u2192",
    "uparrow": "\u2191",
    "downarrow": "\u2193",
    "leftrightarrow": "\u2194",
    "rightleftarrows": "\u21CC",
    "mapsto": "\u21A6",
    "equivalent": "\u21D4",
    "implies": "\u21D2",
    "iff": "\u21D4",
    "Leftarrow": "\u21D0",
    "Rightarrow": "\u21D2",
    "Uparrow": "\u21D1",
    "Downarrow": "\u21D3",
    "LeftRightarrow": "\u21D4",
    "Longrightarrow": "\u27F6",
    "Longleftarrow": "\u27F5",
    "Longleftrightarrow": "\u27F7",
    "Longmapsto": "\u27FC",
    "LongLeftarrow": "\u27F8",
    "LongRightarrow": "\u27F9",
    "LongEquiv": "\u27FA",
    "rightsquigarrow": "\u21DD",
    "leftsquigarrow": "\u21DC",
    "leftrightsquigarrow": "\u21AD",
    // Arrows incoming
    // Negated / basic extras
    "nleftarrow": "\u219A",
    "nrightarrow": "\u219B",
    "nleftrightarrow": "\u21AE",
    "nLeftarrow": "\u21CD",
    "nRightarrow": "\u21CF",
    "nLeftrightarrow": "\u21CE",
    "Leftrightarrow": "\u21D4",
    "updownarrow": "\u2195",
    "Updownarrow": "\u21D5",
    // Diagonal
    "nwarrow": "\u2196",
    "nearrow": "\u2197",
    "searrow": "\u2198",
    "swarrow": "\u2199",
    "Nwarrow": "\u21D6",
    "Nearrow": "\u21D7",
    "Searrow": "\u21D8",
    "Swarrow": "\u21D9",
    // Maps
    "mapsfrom": "\u21A4",
    "mapsup": "\u21A5",
    "mapsdown": "\u21A7",
    "Mapsfrom": "\u2906",
    "Mapsto": "\u2907",
    "longmapsto": "\u27FC",
    "longmapsfrom": "\u27FB",
    "Longmapsfrom": "\u27FD",
    "twoheadmapsto": "\u2905",
    "twoheadmapsfrom": "\u2B36",
    // Long
    "longleftarrow": "\u27F5",
    "longrightarrow": "\u27F6",
    "longleftrightarrow": "\u27F7",
    "longrightsquigarrow": "\u27FF",
    "longleftsquigarrow": "\u2B33",
    // Multiple / paired arrows
    "Lleftarrow": "\u21DA",
    "Rrightarrow": "\u21DB",
    "upuparrows": "\u21C8",
    "downdownarrows": "\u21CA",
    "leftleftarrows": "\u21C7",
    "rightrightarrows": "\u21C9",
    "leftrightarrows": "\u21C6",
    "rightleftarrow": "\u21C4",
    "updownarrows": "\u21C5",
    "downuparrows": "\u21F5",
    "uparrowdownarrow": "\u21C5",
    "downarrowuparrow": "\u21F5",
    "rightthreearrows": "\u21F6",
    "leftthreearrows": "\u2B31",
    "rightarrowshortleftarrow": "\u2942",
    "leftarrowshortrightarrow": "\u2943",
    "shortrightarrowleftarrow": "\u2944",
    "barleftarrowrightarrowba": "\u21B9",
    // Tails, hooks, loops, curved
    "leftarrowtail": "\u21A2",
    "rightarrowtail": "\u21A3",
    "looparrowleft": "\u21AB",
    "looparrowright": "\u21AC",
    "hookleftarrow": "\u21A9",
    "hookrightarrow": "\u21AA",
    "curvearrowleft": "\u21B6",
    "curvearrowright": "\u21B7",
    "circlearrowleft": "\u21BA",
    "circlearrowright": "\u21BB",
    "acwopencirclearrow": "\u21BA",
    "cwopencirclearrow": "\u21BB",
    "Lsh": "\u21B0",
    "Rsh": "\u21B1",
    "ldsh": "\u21B2",
    "rdsh": "\u21B3",
    "carriagereturn": "\u21B5",
    "barovernorthwestarrow": "\u21B8",
    "downzigzagarrow": "\u21AF",
    "leftwavearrow": "\u219C",
    "rightwavearrow": "\u219D",
    "updownarrowbar": "\u21A8",
    // Two-headed
    "twoheadleftarrow": "\u219E",
    "twoheaduparrow": "\u219F",
    "twoheadrightarrow": "\u21A0",
    "twoheaddownarrow": "\u21A1",
    "twoheadrightarrowtail": "\u2916",
    "twoheadleftarrowtail": "\u2B3B",
    "twoheadleftdbkarrow": "\u2B37",
    // Dashed, white, bar
    "leftdasharrow": "\u21E0",
    "updasharrow": "\u21E1",
    "rightdasharrow": "\u21E2",
    "downdasharrow": "\u21E3",
    "dashleftarrow": "\u21E0",
    "dashrightarrow": "\u21E2",
    "barleftarrow": "\u21E4",
    "rightarrowbar": "\u21E5",
    "leftwhitearrow": "\u21E6",
    "upwhitearrow": "\u21E7",
    "rightwhitearrow": "\u21E8",
    "downwhitearrow": "\u21E9",
    "whitearrowupfrombar": "\u21EA",
    "circleonrightarrow": "\u21F4",
    "rightarrowtriangle": "\u21FE",
    "leftarrowtriangle": "\u21FD",
    "leftrightarrowtriangle": "\u21FF",
    "nvleftarrow": "\u21F7",
    "nvrightarrow": "\u21F8",
    "nvleftrightarrow": "\u21F9",
    "nVleftarrow": "\u21FA",
    "nVrightarrow": "\u21FB",
    "nVleftrightarrow": "\u21FC",
    "nvLeftarrow": "\u2902",
    "nvRightarrow": "\u2903",
    "nvLeftrightarrow": "\u2904",
    // Harpoons
    "leftharpoonup": "\u21BC",
    "leftharpoondown": "\u21BD",
    "upharpoonright": "\u21BE",
    "upharpoonleft": "\u21BF",
    "rightharpoonup": "\u21C0",
    "rightharpoondown": "\u21C1",
    "downharpoonright": "\u21C2",
    "downharpoonleft": "\u21C3",
    "leftrightharpoons": "\u21CB",
    "rightleftharpoons": "\u21CC",
    "leftrightharpoonupdown": "\u294A",
    "leftrightharpoondownup": "\u294B",
    "updownharpoonrightleft": "\u294C",
    "updownharpoonleftright": "\u294D",
    "leftrightharpoonupup": "\u294E",
    "updownharpoonrightright": "\u294F",
    "leftrightharpoondowndown": "\u2950",
    "updownharpoonleftleft": "\u2951",
    "barleftharpoonup": "\u2952",
    "rightharpoonupbar": "\u2953",
    "barupharpoonright": "\u2954",
    "downharpoonrightbar": "\u2955",
    "barleftharpoondown": "\u2956",
    "rightharpoondownbar": "\u2957",
    "barupharpoonleft": "\u2958",
    "downharpoonleftbar": "\u2959",
    "leftharpoonupbar": "\u295A",
    "barrightharpoonup": "\u295B",
    "upharpoonrightbar": "\u295C",
    "bardownharpoonright": "\u295D",
    "leftharpoondownbar": "\u295E",
    "barrightharpoondown": "\u295F",
    "upharpoonleftbar": "\u2960",
    "bardownharpoonleft": "\u2961",
    "leftleftharpoons": "\u2962",
    "upharpoonsleftright": "\u2963",
    "rightrightharpoons": "\u2964",
    "downharpoonsleftright": "\u2965",
    "leftrightharpoonsup": "\u2966",
    "leftrightharpoonsdown": "\u2967",
    "rightleftharpoonsup": "\u2968",
    "rightleftharpoonsdown": "\u2969",
    "leftharpoonupdash": "\u296A",
    "dashleftharpoondown": "\u296B",
    "rightharpoonupdash": "\u296C",
    "dashrightharpoondown": "\u296D",
    "updownharpoonsleftright": "\u296E",
    "downupharpoonsleftright": "\u296F",
    "upequilibrium": "\u296E",
    "uprevequilibrium": "\u296F",
    // Tailed / barred / dotted variants
    "nvrightarrowtail": "\u2914",
    "nVrightarrowtail": "\u2915",
    "nvtwoheadrightarrow": "\u2900",
    "nVtwoheadrightarrow": "\u2901",
    "nvtwoheadrightarrowtail": "\u2917",
    "nVtwoheadrightarrowtail": "\u2918",
    "nvtwoheadleftarrow": "\u2B34",
    "nVtwoheadleftarrow": "\u2B35",
    "nvleftarrowtail": "\u2B39",
    "nVleftarrowtail": "\u2B3A",
    "nvtwoheadleftarrowtail": "\u2B3C",
    "nVtwoheadleftarrowtail": "\u2B3D",
    "leftdotarrow": "\u2B38",
    "rightdotarrow": "\u2911",
    "leftbkarrow": "\u290C",
    "rightbkarrow": "\u290D",
    "leftdbkarrow": "\u290E",
    "rightdbkarrow": "\u290F",
    "drbkarrow": "\u2910",
    "uparrowbarred": "\u2909",
    "downarrowbarred": "\u2908",
    "baruparrow": "\u2912",
    "downarrowbar": "\u2913",
    "leftdbltail": "\u291B",
    "rightdbltail": "\u291C",
    "diamondleftarrow": "\u291D",
    "rightarrowdiamond": "\u291E",
    "diamondleftarrowbar": "\u291F",
    "barrightarrowdiamond": "\u2920",
    "leftquaddarrow": "\u2B45",
    "rightquaddarrow": "\u2B46",
    // Curved arrows
    "rightcurvedarrow": "\u2933",
    "uprightcurvearrow": "\u2934",
    "downrightcurvedarrow": "\u2935",
    "leftdowncurvedarrow": "\u2936",
    "rightdowncurvedarrow": "\u2937",
    "cwrightarcarrow": "\u2938",
    "acwleftarcarrow": "\u2939",
    "acwoverarcarrow": "\u293A",
    "acwunderarcarrow": "\u293B",
    "curvearrowrightminus": "\u293C",
    "curvearrowleftplus": "\u293D",
    "cwundercurvearrow": "\u293E",
    "ccwundercurvearrow": "\u293F",
    "leftcurvedarrow": "\u2B3F",
    "fdiagovnearrow": "\u292F",
    "rdiagovsearrow": "\u2930",
    // Circle arrows
    "acwgapcirclearrow": "\u27F2",
    "cwgapcirclearrow": "\u27F3",
    "acwcirclearrow": "\u2940",
    "cwcirclearrow": "\u2941",
    "leftrightarrowcircle": "\u2948",
    "twoheaduparrowcircle": "\u2949",
    "rightarrowonoplus": "\u27F4",
    "leftarrowonoplus": "\u2B32",
    "circleonleftarrow": "\u2B30",
    "uparrowoncircle": "\u29BD",
    "circledownarrow": "\u29EC",
    "blackcircledownarrow": "\u29ED",
    "blackdiamonddownarrow": "\u29EA",
    "rangledownzigzagarrow": "\u237C",
    // Arrows combined with other symbols
    "rightarrowplus": "\u2945",
    "leftarrowplus": "\u2946",
    "similarrightarrow": "\u2972",
    "leftarrowsimilar": "\u2973",
    "rightarrowsimilar": "\u2974",
    "rightarrowapprox": "\u2975",
    "leftarrowless": "\u2977",
    "leftarrowsubset": "\u297A",
    "equalrightarrow": "\u2971",
    "equalleftarrow": "\u2B40",
    "bsimilarleftarrow": "\u2B41",
    "leftarrowbackapprox": "\u2B42",
    "rightarrowgtr": "\u2B43",
    "rightarrowsupset": "\u2B44",
    "bsimilarrightarrow": "\u2B47",
    "rightarrowbackapprox": "\u2B48",
    "similarleftarrow": "\u2B49",
    "leftarrowapprox": "\u2B4A",
    "leftarrowbsimilar": "\u2B4B",
    "rightarrowbsimilar": "\u2B4C",
    "draftingarrow": "\u279B",
    // Combining arrows (accents)
    "overleftarrow": "\u20D6",
    "overrightarrow": "\u20D7",
    "overleftrightarrow": "\u20E1",
    "leftharpoonaccent": "\u20D0",
    "rightharpoonaccent": "\u20D1",
    "underrightharpoondown": "\u20EC",
    "underleftharpoondown": "\u20ED",
    "underleftarrow": "\u20EE",
    "underrightarrow": "\u20EF",
    // More from data.py
    "leftrightharpoondown": "\u2950",
    "rightharpoonsupdown": "\u2964",
    "upharpoonrightdown": "\u21C2",
    "leftrightharpoonup": "\u294E",
    "rightupdownharpoon": "\u294F",
    "leftharpoonsupdown": "\u2962",
    "upharpoonleftdown": "\u21C3",
    "leftupdownharpoon": "\u2951",
    "upharpoonrightup": "\u21BE",
    "leftrightharpoon": "\u294A",
    "rightleftharpoon": "\u294B",
    "downdownharpoons": "\u2965",
    "upharpoonleftup": "\u21BF",
    "rightbarharpoon": "\u296C",
    "barrightharpoon": "\u296D",
    "revequilibrium": "\u21CB",
    "longmappedfrom": "\u27FB",
    "Longmappedfrom": "\u27FD",
    "leftbarharpoon": "\u296A",
    "barleftharpoon": "\u296B",
    "updownharpoons": "\u296E",
    "downupharpoons": "\u296F",
    "RightArrowBar": "\u21E5",
    "LeftArrowBar": "\u21E4",
    "DownArrowBar": "\u2913",
    "upupharpoons": "\u2963",
    "equilibrium": "\u21CC",
    "nHdownarrow": "\u21DF",
    "seovnearrow": "\u292D",
    "neovsearrow": "\u292E",
    "neovnwarrow": "\u2931",
    "nwovnearrow": "\u2932",
    "rightarrowx": "\u2947",
    "RRightarrow": "\u2B46",
    "mappedfrom": "\u21A4",
    "DDownarrow": "\u27F1",
    "Mappedfrom": "\u2906",
    "Ddownarrow": "\u290B",
    "UpArrowBar": "\u2912",
    "rightimply": "\u2970",
    "leftarrowx": "\u2B3E",
    "LLeftarrow": "\u2B45",
    "lightning": "\u21AF",
    "Lightning": "\u21AF",
    "nHuparrow": "\u21DE",
    "dasharrow": "\u21E2",
    "impliedby": "\u27F8",
    "righttail": "\u291A",
    "nwsearrow": "\u2921",
    "neswarrow": "\u2922",
    "hknwarrow": "\u2923",
    "hknearrow": "\u2924",
    "linefeed": "\u21B4",
    "UUparrow": "\u27F0",
    "Uuparrow": "\u290A",
    "drbkarow": "\u2910",
    "lefttail": "\u2919",
    "hksearow": "\u2925",
    "hkswarow": "\u2926",
    "dbkarow": "\u290F",
    "leadsto": "\u2933",
    "subrarr": "\u2979",
    "suplarr": "\u297B",
    "ltlarr": "\u2976",
    "gtrarr": "\u2978",
    "gets": "\u2190",
    "dlsh": "\u21B2",
    "Ldsh": "\u21B2",
    "drsh": "\u21B3",
    "Rdsh": "\u21B3",
    // CamelCase vector aliases
    "RightDownVectorBar": "\u2955",
    "DownRightVectorBar": "\u2957",
    "RightDownTeeVector": "\u295D",
    "DownRightTeeVector": "\u295F",
    "DownLeftVectorBar": "\u2956",
    "LeftDownVectorBar": "\u2959",
    "DownLeftTeeVector": "\u295E",
    "LeftDownTeeVector": "\u2961",
    "RightUpVectorBar": "\u2954",
    "RightUpTeeVector": "\u295C",
    "LeftUpVectorBar": "\u2958",
    "LeftUpTeeVector": "\u2960",
    "RightVectorBar": "\u2953",
    "RightTeeVector": "\u295B",
    "LeftVectorBar": "\u2952",
    "LeftTeeVector": "\u295A",
    // Maps (extra)
    "MapsDown": "\u21A7",
    "MapsUp": "\u21A5",
    "^": "^",
    // Like printing the characters, not actually using them
    "_": "_",
    "\\": "\\",
    "forall": "\u2200",
    "exists": "\u2203",
    "therefore": "\u2234",
    "because": "\u2235",
    "since": "\u2235",
    "lfloor": "\u230A",
    "rfloor": "\u230B",
    "lceil": "\u2308",
    "rceil": "\u2309",
    "langle": "\u27E8",
    "rangle": "\u27E9"
  };
  var escape_word_list = Object.keys(escape_word_map).sort((a, b) => b.length - a.length);
  escape_word_list.push(...[
    "over",
    // So \over{a}{b} means put b above a
    "under",
    "cancel",
    // \cancel{} Makes a diagonal strikethrough the character/expression, like in ≠
    "cancelangle",
    // \cancel{angle}{stuff}, angle in degrees.
    "canceldir",
    // \cancel{dir}{stuff} Cancels in specified directions: trbl (top right bottom left), tlbr (top left bottom right), ud (up to down), lr (left to right)
    "frac",
    // \frac{a}{b} is explicitly division, so a above b with a horizontal line between
    "atop",
    // \atop{a}{b} is like frac, but without the horizontal line
    "root",
    "attach",
    // \attach{}{}{}{}{}{}{}
    "attacho",
    // Like attach, but also additional parameter of overlap
    "attachos",
    // Like attacho, but also option to configure how much smaller the super and subscript go (default = 0.6 on the above)
    // Question, how do i do multi line braces?
    // Latex does it with \left and \right, so can prob do that.
    "left",
    // \left {(}{....}, the first input is what kind of bracket, the other is the content it is scaled with
    "right",
    // same iea
    "lr",
    // \lr{ab}{content} -> becomes a{content}b, where a and b scale with the content. By default, if multiple characters, itll use first character for a, and rest for b.
    "left[",
    "right]",
    "left(",
    "right)",
    "left{",
    "right}",
    "left|",
    "right|",
    "lr(",
    "lr[",
    "lr{",
    "lr|",
    // to make matrix, \left {[}{\right{]}{..tablesomehow...}} // so these should not scale stuff
    // if want to use curly braces, must backslash them, so \left{\{}{....}
    // these can be multilined as they will scale with the content, should be able to make similar to sqrt
    "scale",
    // scaling the element by some scale
    "scalew",
    "scaleh",
    "rotate",
    // works in degrees
    "mathbb",
    // {R a b} -> ℝ 𝕒 𝕓
    "mathcal",
    // {R a b} -> ℛ 𝒶 b
    "underline",
    "overline"
  ]);
  var single_pop_list = ["sqrt", "cancel", "mathbb", "mathcal", "underline", "overline", "left[", "right]", "left(", "right)", "left{", "right}", "left|", "right|", "lr(", "lr[", "lr{", "lr|"];
  var double_pop_list = ["over", "under", "frac", "atop", "root", "left", "right", "scale", "scalew", "scaleh", "rotate", "cancelangle", "canceldir", "lr"];
  var custom_handling_list = ["attach", "attacho", "attachos"];
  var updown_modifier = ["\u03A3", "\u220F", "\u222A", "\u2229", "\u222B", "\u222C", "\u222D", "\u222E"];
  var mathbb_map = {
    "a": "\u{1D552}",
    "b": "\u{1D553}",
    "c": "\u{1D554}",
    "d": "\u{1D555}",
    "e": "\u{1D556}",
    "f": "\u{1D557}",
    "g": "\u{1D558}",
    "h": "\u{1D559}",
    "i": "\u{1D55A}",
    "j": "\u{1D55B}",
    "k": "\u{1D55C}",
    "l": "\u{1D55D}",
    "m": "\u{1D55E}",
    "n": "\u{1D55F}",
    "o": "\u{1D560}",
    "p": "\u{1D561}",
    "q": "\u{1D562}",
    "r": "\u{1D563}",
    "s": "\u{1D564}",
    "t": "\u{1D565}",
    "u": "\u{1D566}",
    "v": "\u{1D567}",
    "w": "\u{1D568}",
    "x": "\u{1D569}",
    "y": "\u{1D56A}",
    "z": "\u{1D56B}",
    "A": "\u{1D538}",
    "B": "\u{1D539}",
    "C": "\u2102",
    "D": "\u{1D53B}",
    "E": "\u{1D53C}",
    "F": "\u{1D53D}",
    "G": "\u{1D53E}",
    "H": "\u210D",
    "I": "\u{1D540}",
    "J": "\u{1D541}",
    "K": "\u{1D542}",
    "L": "\u{1D543}",
    "M": "\u{1D544}",
    "N": "\u2115",
    "O": "\u{1D546}",
    "P": "\u2119",
    "Q": "\u211A",
    "R": "\u211D",
    "S": "\u{1D54A}",
    "T": "\u{1D54B}",
    "U": "\u{1D54C}",
    "V": "\u{1D54D}",
    "W": "\u{1D54E}",
    "X": "\u{1D54F}",
    "Y": "\u{1D550}",
    "Z": "\u2124",
    "0": "\u{1D7D8}",
    "1": "\u{1D7D9}",
    "2": "\u{1D7DA}",
    "3": "\u{1D7DB}",
    "4": "\u{1D7DC}",
    "5": "\u{1D7DD}",
    "6": "\u{1D7DE}",
    "7": "\u{1D7DF}",
    "8": "\u{1D7E0}",
    "9": "\u{1D7E1}"
  };
  var mathcal_map = {
    "a": "\u{1D4B6}",
    "b": "\u{1D4B7}",
    "c": "\u{1D4B8}",
    "d": "\u{1D4B9}",
    "e": "\u212F",
    "f": "\u{1D4BB}",
    "g": "\u210A",
    "h": "\u{1D4BD}",
    "i": "\u{1D4BE}",
    "j": "\u{1D4BF}",
    "k": "\u{1D4C0}",
    "l": "\u{1D4C1}",
    "m": "\u{1D4C2}",
    "n": "\u{1D4C3}",
    "o": "\u2134",
    "p": "\u{1D4C5}",
    "q": "\u{1D4C6}",
    "r": "\u{1D4C7}",
    "s": "\u{1D4C8}",
    "t": "\u{1D4C9}",
    "u": "\u{1D4CA}",
    "v": "\u{1D4CB}",
    "w": "\u{1D4CC}",
    "x": "\u{1D4CD}",
    "y": "\u{1D4CE}",
    "z": "\u{1D4CF}",
    "A": "\u{1D49C}",
    "B": "\u212C",
    "C": "\u{1D49E}",
    "D": "\u{1D49F}",
    "E": "\u2130",
    "F": "\u2131",
    "G": "\u{1D4A2}",
    "H": "\u210B",
    "I": "\u2110",
    "J": "\u{1D4A5}",
    "K": "\u{1D4A6}",
    "L": "\u2112",
    "M": "\u2133",
    "N": "\u{1D4A9}",
    "O": "\u{1D4AA}",
    "P": "\u{1D4AB}",
    "Q": "\u{1D4AC}",
    "R": "\u211B",
    "S": "\u{1D4AE}",
    "T": "\u{1D4AF}",
    "U": "\u{1D4B0}",
    "V": "\u{1D4B1}",
    "W": "\u{1D4B2}",
    "X": "\u{1D4B3}",
    "Y": "\u{1D4B4}",
    "Z": "\u{1D4B5}"
  };

  // src/utils.js
  function attach(main_element, sup, sub, lsup, lsub, up, down, overlap = "0em", scale = 0.6) {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.whiteSpace = "nowrap";
    wrapper.classList.add("math-attach-wrapper");
    function makeScript(content, overlapSide) {
      const d = document.createElement("span");
      d.style.zoom = scale;
      if (overlap !== "0em") d.style[overlapSide] = `-${overlap}`;
      d.append(content);
      return d;
    }
    if (lsup || lsub) {
      const leftCol = document.createElement("span");
      leftCol.style.display = "inline-flex";
      leftCol.style.flexDirection = "column";
      leftCol.style.alignItems = "flex-end";
      if (lsup && lsub) leftCol.style.verticalAlign = "middle";
      else if (lsup) leftCol.style.verticalAlign = "super";
      else if (lsub) leftCol.style.verticalAlign = "sub";
      if (lsup) leftCol.appendChild(makeScript(lsup, "marginBottom"));
      if (lsub) leftCol.appendChild(makeScript(lsub, "marginTop"));
      wrapper.appendChild(leftCol);
    }
    const centerCol = document.createElement("span");
    if (up || down) {
      centerCol.style.display = "inline-flex";
      centerCol.style.flexDirection = "column";
      centerCol.style.alignItems = "center";
      centerCol.style.verticalAlign = "middle";
    }
    if (up) centerCol.appendChild(makeScript(up, "marginBottom"));
    const mainSpan = document.createElement("span");
    mainSpan.style.display = "inline-block";
    mainSpan.style.lineHeight = "1";
    mainSpan.classList.add("math-attach-main");
    mainSpan.append(main_element);
    centerCol.appendChild(mainSpan);
    if (down) centerCol.appendChild(makeScript(down, "marginTop"));
    wrapper.appendChild(centerCol);
    if (sup || sub) {
      const rightCol = document.createElement("span");
      rightCol.style.display = "inline-flex";
      rightCol.style.flexDirection = "column";
      rightCol.style.alignItems = "flex-start";
      rightCol.classList.add("math-attach-right");
      if (sup && sub) rightCol.style.verticalAlign = "middle";
      else if (sup) rightCol.style.verticalAlign = "super";
      else if (sub) rightCol.style.verticalAlign = "sub";
      if (sup) {
        const s = makeScript(sup, "marginBottom");
        s.classList.add("math-attach-sup");
        rightCol.appendChild(s);
      }
      if (sub) {
        const s = makeScript(sub, "marginTop");
        s.classList.add("math-attach-sub");
        rightCol.appendChild(s);
      }
      wrapper.appendChild(rightCol);
    }
    const baselineHack = document.createElement("span");
    baselineHack.style.display = "inline-block";
    baselineHack.style.width = "0";
    baselineHack.style.height = "0";
    baselineHack.style.verticalAlign = "baseline";
    wrapper.appendChild(baselineHack);
    return wrapper;
  }
  function toElement(item) {
    if (typeof item === "string") {
      const span = document.createElement("span");
      span.textContent = item;
      return span;
    }
    return item;
  }
  var measureCanvas = null;
  var measureCtx = null;
  function getMeasureCtx() {
    if (!measureCtx && typeof document !== "undefined") {
      measureCanvas = document.createElement("canvas");
      measureCtx = measureCanvas.getContext("2d");
    }
    return measureCtx;
  }
  function getVisualAscent(content, wrapper) {
    let textAscent = 0;
    const ctx = getMeasureCtx();
    if (ctx) {
      const text = content.textContent || "";
      if (text.length > 0) {
        let font = "16px sans-serif";
        if (wrapper && wrapper.isConnected) {
          font = window.getComputedStyle(wrapper).font || font;
        } else if (typeof window !== "undefined" && document.body) {
          font = window.getComputedStyle(document.body).font || font;
        }
        ctx.font = font;
        const metrics = ctx.measureText(text);
        textAscent = metrics.actualBoundingBoxAscent || 0;
      }
    }
    let elementAscent = 0;
    if (wrapper && wrapper.isConnected) {
      const anchor = wrapper.querySelector(":scope > .math-baseline-anchor");
      if (anchor) {
        const baselineY = anchor.getBoundingClientRect().top;
        const children = content.querySelectorAll("img, svg, div:not([data-source]), .math-frac, .math-sqrt-content, .math-attach-wrapper, .math-brace-content, .math-overline-line, [style*='height']");
        for (const child of children) {
          if (child === wrapper.querySelector(":scope > .math-overline-line") || child.classList.contains("math-baseline-anchor")) continue;
          const rect = child.getBoundingClientRect();
          if (rect.height > 0) {
            const asc = baselineY - rect.top;
            if (asc > elementAscent) elementAscent = asc;
          }
        }
      }
    }
    return Math.max(textAscent, elementAscent);
  }
  function getVisualDescent(content, wrapper) {
    let textDescent = 0;
    const ctx = getMeasureCtx();
    if (ctx) {
      const text = content.textContent || "";
      if (text.length > 0) {
        let font = "16px sans-serif";
        if (wrapper && wrapper.isConnected) {
          font = window.getComputedStyle(wrapper).font || font;
        } else if (typeof window !== "undefined" && document.body) {
          font = window.getComputedStyle(document.body).font || font;
        }
        ctx.font = font;
        const metrics = ctx.measureText(text);
        textDescent = metrics.actualBoundingBoxDescent || 0;
      }
    }
    let elementDescent = 0;
    if (wrapper && wrapper.isConnected) {
      const anchor = wrapper.querySelector(":scope > .math-baseline-anchor");
      if (anchor) {
        const baselineY = anchor.getBoundingClientRect().top;
        const children = content.querySelectorAll("img, svg, div:not([data-source]), .math-frac, .math-sqrt-content, .math-attach-wrapper, .math-brace-content, .math-underline-line, [style*='height']");
        for (const child of children) {
          if (child === wrapper.querySelector(":scope > .math-underline-line") || child.classList.contains("math-baseline-anchor")) continue;
          const rect = child.getBoundingClientRect();
          if (rect.height > 0) {
            const desc = rect.bottom - baselineY;
            if (desc > elementDescent) elementDescent = desc;
          }
        }
      }
    }
    return Math.max(textDescent, elementDescent);
  }
  function updateOverline(wrapper) {
    const content = wrapper.querySelector(".math-overline-content");
    const line = wrapper.querySelector(":scope > .math-overline-line");
    const anchor = wrapper.querySelector(":scope > .math-baseline-anchor");
    if (!content || !line || !anchor) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    if (wrapperRect.height === 0) return;
    const baselineFromBottom = wrapperRect.bottom - anchorRect.top;
    const ascent = getVisualAscent(content, wrapper);
    const gap = 2;
    const lineBottom = baselineFromBottom + ascent + gap;
    line.style.bottom = `${lineBottom}px`;
    const neededHeight = lineBottom + 2;
    if (neededHeight > wrapperRect.height) {
      const currentPad = parseFloat(window.getComputedStyle(wrapper).paddingTop) || 0;
      wrapper.style.paddingTop = `${neededHeight - wrapperRect.height + currentPad}px`;
    }
  }
  function updateUnderline(wrapper) {
    const content = wrapper.querySelector(".math-underline-content");
    const line = wrapper.querySelector(":scope > .math-underline-line");
    const anchor = wrapper.querySelector(":scope > .math-baseline-anchor");
    if (!content || !line || !anchor) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    if (wrapperRect.height === 0) return;
    const baselineFromBottom = wrapperRect.bottom - anchorRect.top;
    const descent = getVisualDescent(content, wrapper);
    const gap = 2;
    const lineBottom = baselineFromBottom - descent - gap;
    line.style.bottom = `${lineBottom}px`;
    if (lineBottom < 0) {
      const neededPad = Math.abs(lineBottom) + 2;
      const currentPad = parseFloat(window.getComputedStyle(wrapper).paddingBottom) || 0;
      if (neededPad > currentPad) {
        wrapper.style.paddingBottom = `${neededPad}px`;
      }
    }
  }
  function setupLineObserver(root) {
    const lineObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (el.classList.contains("math-overline")) {
          updateOverline(el);
        } else if (el.classList.contains("math-underline")) {
          updateUnderline(el);
        }
      }
    });
    for (const el of root.querySelectorAll(".math-overline, .math-underline")) {
      lineObserver.observe(el);
      if (el.classList.contains("math-overline")) updateOverline(el);
      else if (el.classList.contains("math-underline")) updateUnderline(el);
    }
  }

  // src/extra_renderers.js
  var SpecialExpressions = class {
    /**
     * Creates an instance of SpecialExpressions.
     * @param {String} name
     * @param {HTMLDivElement[]} [data=[]] // Like a ^ would store what expression is behind it, or a frac would store two expressions
     * @memberof SpecialExpressions
     */
    constructor(name, data = []) {
      this.name = name;
      this.data = data;
    }
  };
  function special_to_div(spec_element) {
    switch (spec_element.name) {
      case "over":
        return attach(toElement(spec_element.data[1]), void 0, void 0, void 0, void 0, toElement(spec_element.data[0]), void 0, "0.5em");
      case "under":
        return attach(toElement(spec_element.data[1]), void 0, void 0, void 0, void 0, void 0, toElement(spec_element.data[0]), "0.5em");
      case "sqrt": {
        let content = spec_element.data[0];
        let sub_div = document.createElement("span");
        sub_div.style.display = "inline-block";
        sub_div.style.borderTop = "solid thin";
        sub_div.classList.add("math-sqrt-content");
        sub_div.style.zoom = 0.9;
        sub_div.appendChild(content);
        let out_div = document.createElement("span");
        out_div.style.display = "inline-flex";
        out_div.style.alignItems = "flex-end";
        out_div.style.verticalAlign = "middle";
        let outer_sub_div = document.createElement("span");
        outer_sub_div.textContent = "\u221A";
        outer_sub_div.classList.add("math-sqrt-symbol");
        outer_sub_div.style.transformOrigin = "bottom center";
        outer_sub_div.style.lineHeight = "1";
        outer_sub_div.style.display = "inline-block";
        out_div.appendChild(outer_sub_div);
        out_div.appendChild(sub_div);
        return out_div;
      }
      case "root": {
        let content = spec_element.data[1];
        let sub_div = document.createElement("span");
        sub_div.style.display = "inline-block";
        sub_div.style.borderTop = "solid thin";
        sub_div.classList.add("math-sqrt-content");
        sub_div.style.zoom = 0.9;
        sub_div.appendChild(content);
        let out_div = document.createElement("span");
        out_div.style.display = "inline-flex";
        out_div.style.alignItems = "flex-end";
        out_div.style.verticalAlign = "middle";
        let outer_sub_div = document.createElement("span");
        outer_sub_div.textContent = "\u221A";
        outer_sub_div.classList.add("math-sqrt-symbol");
        outer_sub_div.style.transformOrigin = "bottom center";
        outer_sub_div.style.lineHeight = "1";
        outer_sub_div.style.display = "inline-block";
        out_div.appendChild(outer_sub_div);
        out_div.appendChild(sub_div);
        let upper_element = toElement(spec_element.data[0]);
        upper_element.style.zoom = 0.7;
        return attach(out_div, void 0, void 0, upper_element);
      }
      case "cancel": {
        let content = toElement(spec_element.data[0]);
        let wrapper = document.createElement("span");
        wrapper.appendChild(content);
        wrapper.style.position = "relative";
        let svgNS = "http://www.w3.org/2000/svg";
        let svg = document.createElementNS(svgNS, "svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";
        let line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", "100%");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "0");
        line.setAttribute("y2", "100%");
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
        wrapper.appendChild(svg);
        return wrapper;
      }
      case "cancelangle": {
        let content = toElement(spec_element.data[1]);
        let angle = parseFloat(spec_element.data[0].innerText, 10);
        let wrapper = document.createElement("span");
        wrapper.appendChild(content);
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.overflow = "hidden";
        wrapper.style.setProperty("--line-angle", `${angle}deg`);
        let line = document.createElement("div");
        line.style.position = "absolute";
        line.style.top = "50%";
        line.style.left = "50%";
        line.style.width = "200vmax";
        line.style.height = "1px";
        line.style.backgroundColor = "black";
        line.style.transform = "translate(-50%, -50%) rotate(var(--line-angle))";
        line.style.pointerEvents = "none";
        let contentStyles = window.getComputedStyle(content);
        let contentZIndex = contentStyles.getPropertyValue("z-index");
        if (contentZIndex === "auto") {
          contentZIndex = 0;
        } else {
          contentZIndex = parseInt(contentZIndex, 10);
        }
        line.style.zIndex = contentZIndex + 1;
        wrapper.appendChild(line);
        return wrapper;
      }
      case "canceldir": {
        let content = toElement(spec_element.data[1]);
        let dir = spec_element.data[0].innerText;
        let dir_directions = [
          "tlbr",
          "brtl",
          "diagonal",
          "diag",
          "\\",
          "d",
          "trbl",
          "bltr",
          "antidiagonal",
          "antidiag",
          "adiag",
          "/",
          "ad",
          "ud",
          "du",
          "vertical",
          "vert",
          "v",
          "|",
          "lr",
          "rl",
          "horizontal",
          "horiz",
          "h",
          "-"
        ];
        if (!dir_directions.includes(dir)) {
          throw Error("Invalid direction. ");
        }
        let wrapper = document.createElement("span");
        wrapper.appendChild(content);
        wrapper.style.position = "relative";
        let svgNS = "http://www.w3.org/2000/svg";
        let svg = document.createElementNS(svgNS, "svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";
        let line = document.createElementNS(svgNS, "line");
        if (["tlbr", "brtl", "diagonal", "diag", "\\", "d"].includes(dir)) {
          line.setAttribute("x1", "0");
          line.setAttribute("y1", "0");
          line.setAttribute("x2", "100%");
          line.setAttribute("y2", "100%");
        } else if (["trbl", "bltr", "antidiagonal", "antidiag", "adiag", "/", "ad"].includes(dir)) {
          line.setAttribute("x1", "100%");
          line.setAttribute("y1", "0");
          line.setAttribute("x2", "0");
          line.setAttribute("y2", "100%");
        } else if (["ud", "du", "vertical", "vert", "v", "|"].includes(dir)) {
          line.setAttribute("x1", "50%");
          line.setAttribute("y1", "0");
          line.setAttribute("x2", "50%");
          line.setAttribute("y2", "100%");
        } else if (["lr", "rl", "horizontal", "horiz", "h", "-"].includes(dir)) {
          line.setAttribute("x1", "0");
          line.setAttribute("y1", "50%");
          line.setAttribute("x2", "100%");
          line.setAttribute("y2", "50%");
        }
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
        wrapper.appendChild(svg);
        return wrapper;
      }
      case "frac": {
        let numerator = toElement(spec_element.data[0]);
        let denominator = toElement(spec_element.data[1]);
        let frac_div = document.createElement("span");
        frac_div.style.display = "inline-flex";
        frac_div.style.flexDirection = "column";
        frac_div.style.alignItems = "center";
        frac_div.style.verticalAlign = "middle";
        frac_div.style.whiteSpace = "nowrap";
        frac_div.style.lineHeight = "1";
        frac_div.style.zoom = 0.8;
        let numSpan = document.createElement("span");
        numSpan.style.display = "inline-block";
        numSpan.style.paddingBottom = "0.05em";
        numSpan.appendChild(numerator);
        frac_div.appendChild(numSpan);
        let bar = document.createElement("span");
        bar.style.display = "inline-block";
        bar.style.width = "100%";
        bar.style.borderTop = "solid 0.05em";
        bar.style.margin = "0.05em 0";
        frac_div.appendChild(bar);
        let denSpan = document.createElement("span");
        denSpan.style.display = "inline-block";
        denSpan.style.paddingTop = "0.05em";
        denSpan.appendChild(denominator);
        frac_div.appendChild(denSpan);
        return frac_div;
      }
      case "atop": {
        let top = toElement(spec_element.data[0]);
        let bottom = toElement(spec_element.data[1]);
        let stack_div = document.createElement("span");
        stack_div.style.display = "inline-flex";
        stack_div.style.flexDirection = "column";
        stack_div.style.alignItems = "center";
        stack_div.style.verticalAlign = "middle";
        stack_div.style.whiteSpace = "nowrap";
        stack_div.style.lineHeight = "1";
        stack_div.style.zoom = 0.8;
        let topSpan = document.createElement("span");
        topSpan.style.display = "inline-block";
        topSpan.style.paddingBottom = "0.1em";
        topSpan.appendChild(top);
        stack_div.appendChild(topSpan);
        let botSpan = document.createElement("span");
        botSpan.style.display = "inline-block";
        botSpan.style.paddingTop = "0.1em";
        botSpan.appendChild(bottom);
        stack_div.appendChild(botSpan);
        return stack_div;
      }
      case "attach": {
        return attach(
          toElement(spec_element.data[0]),
          toElement(spec_element.data[1]),
          toElement(spec_element.data[2]),
          toElement(spec_element.data[3]),
          toElement(spec_element.data[4]),
          toElement(spec_element.data[5]),
          toElement(spec_element.data[6])
        );
      }
      case "attacho": {
        return attach(
          toElement(spec_element.data[0]),
          toElement(spec_element.data[1]),
          toElement(spec_element.data[2]),
          toElement(spec_element.data[3]),
          toElement(spec_element.data[4]),
          toElement(spec_element.data[5]),
          toElement(spec_element.data[6]),
          spec_element.data[7].innerText
          // The overlap parameter
        );
      }
      case "attachos": {
        return attach(
          toElement(spec_element.data[0]),
          toElement(spec_element.data[1]),
          toElement(spec_element.data[2]),
          toElement(spec_element.data[3]),
          toElement(spec_element.data[4]),
          toElement(spec_element.data[5]),
          toElement(spec_element.data[6]),
          spec_element.data[7].innerText,
          parseFloat(spec_element.data[8].innerText, 10)
        );
      }
      case "left": {
        let brace = spec_element.data[0].innerText || spec_element.data[0].textContent || "";
        return createBraced(spec_element.data[1], brace, null);
      }
      case "right": {
        let brace = spec_element.data[0].innerText || spec_element.data[0].textContent || "";
        return createBraced(spec_element.data[1], null, brace);
      }
      case "lr": {
        let text = spec_element.data[0].innerText || spec_element.data[0].textContent || "";
        let left_brace = text[0];
        let right_brace = text.slice(1);
        if (right_brace.length === 0) {
          const pairs = { "(": ")", "[": "]", "{": "}", "\u230A": "\u230B", "\u2308": "\u2309", "\u27E8": "\u27E9" };
          right_brace = pairs[left_brace] || left_brace;
        }
        return createBraced(spec_element.data[1], left_brace, right_brace);
      }
      case "left[":
        return createBraced(spec_element.data[0], "[", null);
      case "right]":
        return createBraced(spec_element.data[0], null, "]");
      case "left(":
        return createBraced(spec_element.data[0], "(", null);
      case "right)":
        return createBraced(spec_element.data[0], null, ")");
      case "left{":
        return createBraced(spec_element.data[0], "{", null);
      case "right}":
        return createBraced(spec_element.data[0], null, "}");
      case "left|":
        return createBraced(spec_element.data[0], "|", null);
      case "right|":
        return createBraced(spec_element.data[0], null, "|");
      case "lr(":
        return createBraced(spec_element.data[0], "(", ")");
      case "lr[":
        return createBraced(spec_element.data[0], "[", "]");
      case "lr{":
        return createBraced(spec_element.data[0], "{", "}");
      case "lr|":
        return createBraced(spec_element.data[0], "|", "|");
      case "scale": {
        let amount = parseFloat(spec_element.data[0].innerText, 10);
        let content = toElement(spec_element.data[1]);
        content.style.zoom = amount;
        return content;
      }
      case "scalew": {
        let amount = parseFloat(spec_element.data[0].innerText, 10);
        let content = toElement(spec_element.data[1]);
        content.style.transform = `scaleX(${amount})`;
        content.style.transformOrigin = "left center";
        return content;
      }
      case "scaleh": {
        let amount = parseFloat(spec_element.data[0].innerText, 10);
        let content = toElement(spec_element.data[1]);
        content.style.transform = `scaleY(${amount})`;
        content.style.transformOrigin = "center top";
        return content;
      }
      case "rotate": {
        let amount = parseFloat(spec_element.data[0].innerText, 10);
        let content = toElement(spec_element.data[1]);
        content.style.transform = `rotate(${amount}deg)`;
        return content;
      }
      case "mathbb": {
        let content = toElement(spec_element.data[0]);
        for (let node of content.childNodes) {
          if (node.nodeType == Node.TEXT_NODE) {
            let text = node.textContent;
            let new_text = "";
            for (let char of text) {
              new_text += mathbb_map[char] || char;
            }
            node.textContent = new_text;
          }
        }
        return content;
      }
      case "mathcal": {
        let content = toElement(spec_element.data[0]);
        for (let node of content.childNodes) {
          if (node.nodeType == Node.TEXT_NODE) {
            let text = node.textContent;
            let new_text = "";
            for (let char of text) {
              new_text += mathcal_map[char] || char;
            }
            node.textContent = new_text;
          }
        }
        return content;
      }
      case "overline": {
        let content = toElement(spec_element.data[0]);
        content.classList.add("math-overline-content");
        let wrapper = document.createElement("span");
        wrapper.classList.add("math-overline");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.verticalAlign = "baseline";
        let line = document.createElement("span");
        line.classList.add("math-overline-line");
        line.style.position = "absolute";
        line.style.left = "0";
        line.style.right = "0";
        line.style.height = "0.08em";
        line.style.backgroundColor = "currentColor";
        line.style.pointerEvents = "none";
        let baselineAnchor = document.createElement("span");
        baselineAnchor.classList.add("math-baseline-anchor");
        baselineAnchor.style.display = "inline-block";
        baselineAnchor.style.width = "0";
        baselineAnchor.style.height = "0";
        baselineAnchor.style.verticalAlign = "baseline";
        wrapper.appendChild(content);
        wrapper.appendChild(line);
        wrapper.appendChild(baselineAnchor);
        let ascent = getVisualAscent(content, wrapper);
        if (ascent > 0) {
          line.style.bottom = `calc(0.22em + ${ascent}px + 2px)`;
        } else {
          line.style.bottom = "calc(1ex + 0.22em + 2px)";
        }
        return wrapper;
      }
      case "underline": {
        let content = toElement(spec_element.data[0]);
        content.classList.add("math-underline-content");
        let wrapper = document.createElement("span");
        wrapper.classList.add("math-underline");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.verticalAlign = "baseline";
        let line = document.createElement("span");
        line.classList.add("math-underline-line");
        line.style.position = "absolute";
        line.style.left = "0";
        line.style.right = "0";
        line.style.height = "0.08em";
        line.style.backgroundColor = "currentColor";
        line.style.pointerEvents = "none";
        let baselineAnchor = document.createElement("span");
        baselineAnchor.classList.add("math-baseline-anchor");
        baselineAnchor.style.display = "inline-block";
        baselineAnchor.style.width = "0";
        baselineAnchor.style.height = "0";
        baselineAnchor.style.verticalAlign = "baseline";
        wrapper.appendChild(content);
        wrapper.appendChild(line);
        wrapper.appendChild(baselineAnchor);
        let descent = getVisualDescent(content, wrapper);
        if (descent > 0) {
          line.style.bottom = `calc(0.22em - ${descent}px - 2px)`;
        } else {
          line.style.bottom = "calc(0.22em - 2px)";
        }
        return wrapper;
      }
      default:
        throw Error(`Unimplemented special expression ${spec_element.name}`);
    }
  }
  function createBraced(content, leftOrBrace = null, rightOrSide = null) {
    let leftBrace = null;
    let rightBrace = null;
    if (rightOrSide === "left") {
      leftBrace = leftOrBrace;
    } else if (rightOrSide === "right") {
      rightBrace = leftOrBrace;
    } else {
      leftBrace = leftOrBrace;
      rightBrace = rightOrSide;
    }
    const out_div = document.createElement("span");
    out_div.style.display = "inline-flex";
    out_div.style.alignItems = "center";
    out_div.style.verticalAlign = "middle";
    const sub_div = document.createElement("span");
    sub_div.style.display = "inline-block";
    sub_div.classList.add("math-brace-content");
    if (content) sub_div.append(content);
    function makeSymbol(char) {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("math-brace-symbol");
      span.style.transformOrigin = "center center";
      span.style.lineHeight = "1";
      span.style.display = "inline-block";
      return span;
    }
    if (leftBrace) {
      out_div.appendChild(makeSymbol(leftBrace));
    }
    out_div.appendChild(sub_div);
    if (rightBrace) {
      out_div.appendChild(makeSymbol(rightBrace));
    }
    return out_div;
  }

  // src/parser.js
  function sense_maker(str) {
    return escape_word_list.filter((word) => word.startsWith(str));
  }
  function tex_to_div(tokens) {
    let current_character_index = 0;
    let expression_array = [];
    while (current_character_index < tokens.length) {
      if (tokens[current_character_index] == "\\") {
        if (current_character_index + 1 < tokens.length && (tokens[current_character_index + 1] == "{" || tokens[current_character_index + 1] == "}")) {
          expression_array.push(tokens[current_character_index + 1]);
          current_character_index += 2;
          continue;
        }
      }
      if (tokens[current_character_index] == "{") {
        if (current_character_index + 1 == tokens.length) {
          expression_array.push("{");
          current_character_index += 1;
          continue;
        }
        let inner_expression = [];
        var current_scope = 1;
        while (current_scope != 0) {
          current_character_index += 1;
          if (current_character_index > tokens.length) {
            break;
          }
          if (tokens[current_character_index] == "\\") {
            if (current_character_index + 1 < tokens.length && (tokens[current_character_index + 1] == "{" || tokens[current_character_index + 1] == "}")) {
              inner_expression.push(tokens[current_character_index]);
              current_character_index += 1;
              inner_expression.push(tokens[current_character_index]);
              continue;
            }
          }
          if (tokens[current_character_index] == "{") {
            current_scope += 1;
          } else if (tokens[current_character_index] == "}") {
            current_scope -= 1;
          }
          if (current_scope != 0) {
            inner_expression.push(tokens[current_character_index]);
          }
        }
        let inner_div = tex_to_div(inner_expression);
        expression_array.push(inner_div);
      } else {
        expression_array.push(tokens[current_character_index]);
      }
      current_character_index += 1;
    }
    let final_expression_array = [];
    let element_index = 0;
    let expr_length = expression_array.length;
    while (element_index < expr_length) {
      let element = expression_array[element_index];
      if (element == "^" || element == "_") {
        if (element_index + 1 < expr_length) {
          element_index += 1;
          let first_component = expression_array[element_index];
          let isSup = element == "^";
          let otherSymbol = isSup ? "_" : "^";
          let hasPair = element_index + 2 < expr_length && expression_array[element_index + 1] == otherSymbol;
          let prev_raw = final_expression_array.pop() ?? document.createElement("span");
          if (prev_raw instanceof SpecialExpressions) {
            prev_raw = special_to_div(prev_raw);
          }
          let isBigOp = false;
          if (typeof prev_raw === "string" && updown_modifier.includes(prev_raw)) {
            isBigOp = true;
          } else if (prev_raw instanceof HTMLElement && updown_modifier.includes(prev_raw.textContent)) {
            isBigOp = true;
          }
          let prev = toElement(prev_raw);
          if (isBigOp) {
            prev.style.display = "inline-block";
            prev.style.transform = "translateY(0.08em)";
          }
          if (hasPair) {
            element_index += 2;
            let second_component = expression_array[element_index];
            let sup_component = isSup ? first_component : second_component;
            let sub_component = isSup ? second_component : first_component;
            let wrapper;
            if (isBigOp) {
              wrapper = attach(prev, void 0, void 0, void 0, void 0, sup_component, sub_component, "0.3em");
            } else {
              wrapper = attach(prev, sup_component, sub_component);
            }
            final_expression_array.push(wrapper);
          } else {
            if (isSup) {
              if (isBigOp) {
                final_expression_array.push(attach(prev, void 0, void 0, void 0, void 0, first_component, void 0, "0.3em"));
              } else {
                final_expression_array.push(attach(prev, first_component));
              }
            } else {
              if (isBigOp) {
                final_expression_array.push(attach(prev, void 0, void 0, void 0, void 0, void 0, first_component, "0.3em"));
              } else {
                final_expression_array.push(attach(prev, void 0, first_component));
              }
            }
          }
        } else {
          final_expression_array.push(element);
        }
      } else if (element == "\\") {
        element_index += 1;
        let matches = [];
        let previous_word = "";
        let current_word = "";
        do {
          matches = sense_maker(current_word);
          previous_word = current_word;
          let next = "";
          if (element_index >= expr_length || typeof (next = expression_array[element_index]) != "string" || sense_maker(current_word + next).length == 0) {
            if (matches.includes(current_word)) {
              if (single_pop_list.includes(current_word)) {
                if (next == " " || next == "\xA0") {
                  if (Object.keys(escape_word_map).includes(current_word)) {
                    final_expression_array.push(escape_word_map[current_word]);
                  } else {
                    throw Error("Haven't implemented a space after a singlepop escape thingy");
                  }
                } else {
                  final_expression_array.push(new SpecialExpressions(current_word, [next]));
                }
                element_index += 1;
              } else if (double_pop_list.includes(current_word)) {
                let data1 = next;
                if (element_index + 1 < expr_length) {
                  let data2 = expression_array[element_index + 1];
                  final_expression_array.push(new SpecialExpressions(current_word, [data1, data2]));
                } else {
                  throw Error("No two elements to pop!");
                }
                element_index += 2;
              } else if (custom_handling_list.includes(current_word)) {
                if (current_word == "attach") {
                  let data = [];
                  for (let i = 0; i < 7; i++) {
                    if (element_index + i < expr_length) {
                      data.push(expression_array[element_index + i]);
                    } else {
                      data.push(void 0);
                    }
                  }
                  final_expression_array.push(new SpecialExpressions(current_word, data));
                  element_index += 7;
                } else if (current_word == "attacho") {
                  let data = [];
                  for (let i = 0; i < 8; i++) {
                    if (element_index + i < expr_length) {
                      data.push(expression_array[element_index + i]);
                    } else {
                      data.push(void 0);
                    }
                  }
                  final_expression_array.push(new SpecialExpressions(current_word, data));
                  element_index += 8;
                } else if (current_word == "attachos") {
                  let data = [];
                  for (let i = 0; i < 9; i++) {
                    if (element_index + i < expr_length) {
                      data.push(expression_array[element_index + i]);
                    } else {
                      data.push(void 0);
                    }
                  }
                  final_expression_array.push(new SpecialExpressions(current_word, data));
                  element_index += 9;
                }
              } else {
                let out_str = escape_word_map[current_word];
                if (out_str === "\u222B" || out_str === "\u222B\u200B" || out_str === "\u222C" || out_str === "\u222D" || out_str === "\u222E") {
                  let intSpan = document.createElement("span");
                  intSpan.textContent = out_str;
                  intSpan.style.display = "inline-block";
                  intSpan.style.transform = "translateY(0.0em)";
                  final_expression_array.push(intSpan);
                } else {
                  let symbol_div = toElement(out_str);
                  symbol_div.classList.add("math-to-html-math-symbol");
                  final_expression_array.push(symbol_div);
                }
              }
              break;
            }
            throw Error("Invalid Backslash Usage");
          }
          current_word += next;
          element_index += 1;
        } while (sense_maker(current_word).length > 0);
        element_index -= 1;
      } else {
        final_expression_array.push(expression_array[element_index]);
      }
      element_index += 1;
    }
    let div_element = document.createElement("div");
    div_element.style.display = "inline-block";
    for (let element of final_expression_array) {
      if (element instanceof SpecialExpressions) {
        element = special_to_div(element);
      }
      div_element.append(element);
    }
    div_element.dataset.source = tokens;
    return div_element;
  }

  // src/index.js
  function injectDefaultStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById("math-eq-default-styles")) return;
    const style = document.createElement("style");
    style.id = "math-eq-default-styles";
    style.textContent = `
@import url('https://cdn.jsdelivr.net/npm/katex@0.18.5/dist/katex.min.css');

:where(m-eq, m-eqi) {
	font-family: 'KaTeX_Main', serif;
}
`;
    const target = document.head || document.documentElement;
    target.appendChild(style);
    if (document.fonts) {
      document.fonts.ready.then(() => {
        document.querySelectorAll(".math-overline").forEach(updateOverline);
        document.querySelectorAll(".math-underline").forEach(updateUnderline);
      });
    }
  }
  injectDefaultStyles();
  function setupAttachObserver(root) {
    const attachObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const main = entry.target;
        const wrapper = main.closest(".math-attach-wrapper");
        if (!wrapper) continue;
        const rightCol = wrapper.querySelector(".math-attach-right");
        if (!rightCol) continue;
        if (!rightCol.dataset.originalVerticalAlign) {
          rightCol.dataset.originalVerticalAlign = rightCol.style.verticalAlign || "baseline";
        }
        rightCol.style.height = "";
        rightCol.style.justifyContent = "";
        rightCol.style.verticalAlign = rightCol.dataset.originalVerticalAlign;
        const mainHeight = main.offsetHeight;
        const rightHeight = rightCol.offsetHeight;
        if (mainHeight > rightHeight * 1.8 && rightHeight > 0) {
          rightCol.style.height = mainHeight + "px";
          rightCol.style.verticalAlign = "bottom";
          const hasSup = rightCol.querySelector(".math-attach-sup");
          const hasSub = rightCol.querySelector(".math-attach-sub");
          if (hasSup && hasSub) {
            rightCol.style.justifyContent = "space-between";
          } else if (hasSup) {
            rightCol.style.justifyContent = "flex-start";
          } else if (hasSub) {
            rightCol.style.justifyContent = "flex-end";
          }
        }
      }
    });
    const attachMains = root.querySelectorAll(".math-attach-main");
    for (let main of attachMains) {
      attachObserver.observe(main);
    }
  }
  var MEqElement = class extends HTMLElement {
    connectedCallback() {
      let source = this.childNodes;
      let tokens = [];
      for (let token of source) {
        if (token.nodeType == Node.TEXT_NODE) {
          let cleanText = token.textContent.replace(/\n\s*/g, "");
          cleanText = cleanText.replaceAll(" ", "\xA0");
          tokens.push(...cleanText);
        } else {
          tokens.push(token.cloneNode(true));
        }
      }
      this.innerHTML = "";
      this.appendChild(tex_to_div(tokens));
      const observer = new ResizeObserver(() => {
        let symbols = Array.from(this.querySelectorAll(".math-sqrt-symbol")).reverse();
        for (let sym of symbols) {
          let cont = sym.nextElementSibling;
          if (!cont || !cont.classList.contains("math-sqrt-content")) continue;
          sym.style.transform = "none";
          let contHeight = cont.getBoundingClientRect().height;
          let symHeight = sym.getBoundingClientRect().height;
          if (symHeight > 0) {
            let scaleY = contHeight / symHeight * 0.95;
            sym.style.transform = `scale(1, ${scaleY})`;
          }
        }
      });
      let contents = this.querySelectorAll(".math-sqrt-content");
      for (let cont of contents) {
        observer.observe(cont);
      }
      const observer2 = new ResizeObserver(() => {
        let symbols = Array.from(this.querySelectorAll(".math-brace-symbol")).reverse();
        for (let sym of symbols) {
          let cont = sym.nextElementSibling;
          if (!cont || !cont.classList.contains("math-brace-content")) {
            cont = sym.previousElementSibling;
          }
          if (!cont || !cont.classList.contains("math-brace-content")) continue;
          sym.style.transform = "none";
          let contHeight = cont.getBoundingClientRect().height;
          let symHeight = sym.getBoundingClientRect().height;
          if (symHeight > 0) {
            let scaleY = contHeight / symHeight * 1;
            let shiftY = contHeight * -0.07;
            sym.style.transform = `translateY(${shiftY}px) scale(1, ${scaleY})`;
          }
        }
      });
      contents = this.querySelectorAll(".math-brace-content");
      for (let cont of contents) {
        observer2.observe(cont);
      }
      setupAttachObserver(this);
      setupLineObserver(this);
    }
  };
  var MEqIElement = class extends HTMLElement {
    connectedCallback() {
      let source = this.childNodes;
      let tokens = [];
      for (let token of source) {
        if (token.nodeType == Node.TEXT_NODE) {
          tokens.push(...token.textContent);
        } else {
          tokens.push(token.cloneNode(true));
        }
      }
      this.innerHTML = "";
      this.appendChild(tex_to_div(tokens));
      const observer = new ResizeObserver(() => {
        let symbols = Array.from(this.querySelectorAll(".math-sqrt-symbol")).reverse();
        for (let sym of symbols) {
          let cont = sym.nextElementSibling;
          if (!cont || !cont.classList.contains("math-sqrt-content")) continue;
          sym.style.transform = "none";
          let contHeight = cont.getBoundingClientRect().height;
          let symHeight = sym.getBoundingClientRect().height;
          if (symHeight > 0) {
            let scaleY = contHeight / symHeight * 0.95;
            sym.style.transform = `scale(1, ${scaleY})`;
          }
        }
      });
      let contents = this.querySelectorAll(".math-sqrt-content");
      for (let cont of contents) {
        observer.observe(cont);
      }
      const observer2 = new ResizeObserver(() => {
        let symbols = Array.from(this.querySelectorAll(".math-brace-symbol")).reverse();
        for (let sym of symbols) {
          let cont = sym.nextElementSibling;
          if (!cont || !cont.classList.contains("math-brace-content")) {
            cont = sym.previousElementSibling;
          }
          if (!cont || !cont.classList.contains("math-brace-content")) continue;
          sym.style.transform = "none";
          let contHeight = cont.getBoundingClientRect().height;
          let symHeight = sym.getBoundingClientRect().height;
          if (symHeight > 0) {
            let scaleY = contHeight / symHeight * 1;
            let shiftY = contHeight * -0.07;
            sym.style.transform = `translateY(${shiftY}px) scale(1, ${scaleY})`;
          }
        }
      });
      contents = this.querySelectorAll(".math-brace-content");
      for (let cont of contents) {
        observer2.observe(cont);
      }
      setupAttachObserver(this);
      setupLineObserver(this);
    }
  };
  customElements.define("m-eq", MEqElement);
  customElements.define("m-eqi", MEqIElement);
  function mathStrToHtml(str) {
    let cleanText = str.replace(/\n\s*/g, "");
    cleanText = cleanText.replaceAll(" ", "\xA0");
    let tokens = [];
    tokens.push(...cleanText);
    return tex_to_div(tokens);
  }
  window.mathStrToHtml = mathStrToHtml;
})();
//# sourceMappingURL=math-eq.js.map
