(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) 
        return;
    
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) 
        s(o);
    
    new MutationObserver(o => {
        for (const l of o) 
            if (l.type === "childList") 
                for (const f of l.addedNodes) 
                    f.tagName === "LINK" && f.rel === "modulepreload" && s(f)
                
            
        
    }).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(o) {
        const l = {};
        return o.integrity && (l.integrity = o.integrity),
        o.referrerPolicy && (l.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials" ? l.credentials = "include" : o.crossOrigin === "anonymous" ? l.credentials = "omit" : l.credentials = "same-origin",
        l
    }
    function s(o) {
        if (o.ep) 
            return;
        
        o.ep = !0;
        const l = n(o);
        fetch(o.href, l)
    }
})();
function v() {
    const t = [
        "▁▂▃▄▅▆▇ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▂▁▂▃▄▅▆` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▃▂▁▂▃▄▅ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓",
        "▄▃▂▁▂▃▄` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓",
        "▅▄▃▂▁▂▃ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▆▅▄▃▂▁▂` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▇▆▅▄▃▂▁ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓",
        "▆▇▆▅▄▃▂` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓",
        "▅▆▇▆▅▄▃ `^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▄▅▆▇▆▅▄` ^^^^^~ ░ ui▀┳╲ ☺ .info ▓",
        "▃▄▅▆▇▆▅ `^^^^^~ ░ ui▀┳╲ ☻ .info ▓",
        "▂▃▄▅▆▇▆` ^^^^^~ ░ ui▀┳╲ ☻ .info ▓"
    ];
    function e() {
        n >= t.length - 1 ? n = 0 : n++,
        document.title = t[n],
        setTimeout(e, 200)
    }
    let n = 0;
    e()
}
const h = [
        "left", "right", "none"
    ],
    u = [
        "white",
        "black",
        "red",
        "yellow",
        "lime",
        "green",
        "aqua",
        "teal",
        "blue",
        "navy",
        "fuchsia",
        "purple"
    ],
    T = [
        "serif", "sans-serif", "cursive", "monospace"
    ],
    D = [
        "none",
        "underline",
        "overline",
        "line-through",
        "blink"
    ],
    L = [
        "center", "left", "right", "justify"
    ],
    p = [
        "txtbg1.png",
        "animansi.gif",
        "delicious-icon.gif",
        "gradi.png",
        "use-os-x-lion-to-improve-your-ui.gif",
        "tssqr4.gif"
    ],
    I = [
        "baseline",
        "sub",
        "super",
        "top",
        "text-top",
        "middle",
        "bottom",
        "text-bottom"
    ],
    P = [
        "dotted",
        "dashed",
        "solid",
        "double",
        "groove",
        "ridge"
    ],
    d = [
        "-top",
        "-bottom",
        "-left",
        "-right",
        ""
    ],
    S = [
        "none", "left", "right", "both"
    ],
    O = [
        "linear", "ease", "ease-in", "ease-out"
    ],
    B = [
        "transform", "filter"
    ],
    j = [
        "normal", "reverse", "alternate", "alternate-reverse"
    ],
    b = 25,
    r = (t, e) => Math.floor(Math.random() * (e - t + 1)) + t,
    a = t => t[Math.floor(Math.random() * t.length)],
    i = (t, e) => Math.random() * 100 <= t ? e : "",
    x = () => `rgba(${
        r(0, 255)
    },${
        r(0, 255)
    },${
        r(0, 255)
    },${
        r(0, 100) / 100
    })`,
    q = () => `${
        r(1, 30)
    }px ${
        r(1, 30)
    }px ${
        r(3, 8)
    }px ${
        a(u)
    }`,
    m = () => `${
        r(1, 25)
    }px ${
        a(P)
    } ${
        x()
    }`,
    k = () => `anim-${
        r(0, b)
    } ${
        r(0, 200) / 10
    }s ${
        a(O)
    } infinite ${
        a(j)
    }`,
    A = (t, e, n) => {
        let s = "";
        for (let o = t; o >= 1; o--) 
            s += `${
                r(e, n)
            }px `;
        
        return s
    },
    M = () => {
        let t = "";
        return t += i(50, `blur(${
            r(3, 30)
        }px) `),
        t += i(25, `contrast(${
            r(100, 200)
        }%) `),
        t += i(50, `drop-shadow(${
            A(3, 2, 60)
        } ${
            x()
        }) `),
        t += i(50, `hue-rotate(${
            r(0, 360)
        }deg) `),
        t += i(
            50,
            `invert(${
                r(0, 100) / 100
            }) `
        ),
        t += i(
            25,
            `opacity(${
                r(10, 100) / 100
            }) `
        ),
        t += i(25, `saturate(${
            r(30, 200)
        }%) `),
        t
    },
    w = () => {
        let t = r(0, 50) / 10,
            e = r(0, 50) / 10,
            n = r(0, 50) / 10,
            s = r(0, 50) / 10,
            o = r(0, 50) / 10,
            l = r(0, 50) / 10;
        return `matrix(${t},${e},${n},${s},${o},${l})`
    },
    $ = t => t == "transform" ? w() : t == "filter" ? M() : null,
    C = t => {
        let e = "";
        for (let n = t; n >= 1; n--) {
            let s = a(B),
                o = [
                    10,
                    20,
                    30,
                    40,
                    50,
                    60,
                    70,
                    80,
                    90
                ].sort(() => .5 - Math.random()).slice(1, r(0, 4)).sort();
            e += `@keyframes anim-${n}{`,
            e += `0%{${s}:${
                $(s)
            };}`;
            for (let l = 0; l < o.length; l++) 
                e += `${
                    o[l]
                }%{${s}:${
                    $(s)
                };}`;
            
            e += `100%{${s}:${
                $(s)
            };}`,
            e += "}"
        }
        return e
    },
    E = t => {
        let e = "";
        for (let n = t; n >= 1; n--) 
            e += `.img-s${n}{`,
            e += `float:${
                a(h)
            };`,
            e += i(10, `background-image:url('https://files.yyyyyyy.info/images/${
                a(p)
            }');`),
            e += i(5, `background-color:${
                a(u)
            };`),
            e += i(15, `border${
                a(d)
            }:${
                m()
            };`),
            e += i(15, `border${
                a(d)
            }:${
                m()
            };`),
            e += i(75, `vertical-align:${
                a(I)
            };`),
            e += i(
                5,
                `opacity:${
                    r(10, 100) / 100
                };`
            ),
            e += i(10, `filter:${
                M()
            };`),
            e += i(10, `transform:${
                w()
            };`),
            e += i(2, `animation:${
                k()
            };`),
            e += "}";
        
        return e
    },
    H = t => {
        let e = "";
        for (let n = t; n >= 1; n--) 
            e += `.txt-s${n}{`,
            e += `float:${
                a(h)
            };`,
            e += `text-align:${
                a(L)
            };`,
            e += `font-size:${
                r(6, 32)
            }px;`,
            e += `font-family:${
                a(T)
            };`,
            e += `color:${
                a(u)
            };`,
            e += i(5, `background-color:${
                a(u)
            };`),
            e += i(
                5,
                `opacity:${
                    r(0, 100) / 100
                };`
            ),
            e += i(10, `background-image:url('https://files.yyyyyyy.info/images/${
                a(p)
            }');`),
            e += i(80, `text-decoration:${
                a(D)
            };`),
            e += i(50, `text-shadow:${
                q()
            };`),
            e += i(15, `border${
                a(d)
            }:${
                m()
            };`),
            e += i(15, `border${
                a(d)
            }:${
                m()
            };`),
            e += `clear:${
                a(S)
            };`,
            e += i(3, `animation:${
                k()
            };`),
            e += "}";
        
        return e
    };
function F() {
    let t = "";
    return t += E(100),
    t += H(100),
    t += C(b),
    t
}
function N() {
    const t = F();
    document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${t}</style>`)
}
const R = [
        "data",
        "drawing",
        "gv",
        "iii",
        "link",
        "p",
        "s",
        "space",
        "teapot",
        "twitter",
        "x"
    ],
    y = t => t[Math.floor(Math.random() * t.length)],
    X = t => {
        const e = Math.floor(Math.random() * 100),
            n = y(t);
        return `<img src="https://files.yyyyyyy.info/${
            n.key
        }" class="img-s${e}" width="${
            n.width
        }" height="${
            n.height
        }">`
    },
    Y = (t, e) => {
        const n = Math.floor(Math.random() * 100),
            s = y(t);
        return `<span class="txt-s${n}">${
            s.substring(0, e)
        }</span>`
    },
    g = (t, e) => Math.random() * 100 <= t ? `<a href="l/${
        y(R)
    }">${e}</a>` : e;
function c(t, e, n) {
    let s = "";
    for (let o = e; o >= 1; o--) 
        switch (y(["image", "text"])) {
            case "image": s += g(10, X(t.images));
                break;
            case "text": s += g(1, Y(t.texts, n));
                break
        }
    
    return s
}
const G = `{
  background(amount: 1)
  layer2:
    layer(amount: 100, minDim: 0, maxDim: 200) { images { key, width, height} texts }
  layer3:
    layer(amount: 100, minDim: 50, maxDim: 400) { images { key, width, height} texts }
  layerVideo: 
    video(amount: 1)  
  layer4:
    layer(amount: 50, minDim: 200, maxDim: 900) { images { key, width, height} texts }
  layer5:
    layer(amount: 25, minDim: 500, maxDim: 9999) { images { key, width, height} texts }
}`;
async function V() {
    try {
        return(await fetch("https://api.yyyyyyy.info/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authToken: "8c33411c58a2d7d0d598e2de2542838c"
            },
            body: JSON.stringify(
                {query: G}
            )
        })).json()
    } catch (t) {
        console.error(t)
    }
}
async function z() {
    const t = await V(),
        e = document.getElementById("layer-2"),
        n = document.getElementById("layer-3"),
        s = document.getElementById("layer-4"),
        o = document.getElementById("layer-5"),
        l = document.querySelector("#video-container video");
    document.body.style.setProperty("--bgimage", `url(https://files.yyyyyyy.info/${
        t.data.background
    }`),
    e.innerHTML = c(t.data.layer2, 100, 500),
    n.innerHTML = c(t.data.layer3, 100, 400),
    s.innerHTML = c(t.data.layer4, 50, 400),
    o.innerHTML = c(t.data.layer4, 25, 300),
    l.src = `https://files.yyyyyyy.info/${
        t.data.layerVideo
    }`
}
v();
N();
z();
