/*PORTFOLIO SCRIPT*/
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initRevealAnimations();
    initProgressBars();
    initScrollButton();
    initContactForm();
});
/*MOBILE NAVIGATION*/
function initNavigation() {
    const burger =
        document.getElementById("burger");
    const navList =
        document.getElementById("navList");
    if (!burger || !navList) return;
    burger.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
    document
        .querySelectorAll(".nl")
        .forEach(link => {
            link.addEventListener("click", () => {
                navList.classList.remove("show");
            });
        });
}
/*REVEAL ON SCROLL*/
function initRevealAnimations() {
    const reveals =
        document.querySelectorAll(".reveal");
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "active"
                        );
                    }
                });
            },
            {
                threshold: 0.15
            }
        );
    reveals.forEach(item => {
        observer.observe(item);
    });
}
/*PROGRESS BAR ANIMATION*/
function initProgressBars() {
    const bars =
        document.querySelectorAll(
            ".progress-fill"
        );
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar =
                            entry.target;
                        const width =
                            bar.dataset.width;
                        bar.style.width = width;
                    }
                });
            },
            {
                threshold: 0.3
            }
        );
    bars.forEach(bar => {
        observer.observe(bar);
    });
}
/*ACTIVE NAVIGATION*/
window.addEventListener(
    "scroll",
    highlightNav
);
function highlightNav() {
    const sections =
        document.querySelectorAll("section");
    let current = "";
    sections.forEach(section => {
        const sectionTop =
            section.offsetTop - 150;
        const sectionHeight =
            section.offsetHeight;
        if (
            pageYOffset >= sectionTop &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });
    document
        .querySelectorAll(".nl")
        .forEach(link => {
            link.classList.remove("active");
            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }
        });
}
/*CONTACT FORM*/
function initContactForm() {
    const form =
        document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name =
            document.getElementById("name")?.value.trim();
        const email =
            document.getElementById("email")?.value.trim();
        const subject =
            document.getElementById("subject")?.value.trim();
        const message =
            document.getElementById("message")?.value.trim();
        if (!name || !email || !subject || !message) {
            alert("Please fill all fields.");
            return;
        }
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        try {
            const data = new FormData(form);
            const response = await fetch(
                "https://formspree.io/f/mdaveyqz",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );
            if (response.ok) {
                const successMsg =
                    document.getElementById("successMsg");
                successMsg.style.display = "block";
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 3000);
                form.reset();
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            alert("Something went wrong.");
            console.error(error);
        }
    });
}
/*EMAIL VALIDATION*/
function validateEmail(email) {
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
/*SCROLL TO TOP BUTTON*/
function initScrollButton() {
    const btn =
        document.getElementById(
            "scrollTopBtn"
        );
    if (!btn) return;
    window.addEventListener(
        "scroll",
        () => {
            if (
                window.scrollY > 500
            ) {
                btn.style.display =
                    "block";
            } else {
                btn.style.display =
                    "none";
            }
        }
    );
    btn.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}
/*SMOOTH SCROLLING*/
document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {
    anchor.addEventListener(
        "click",
        function (e) {
            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    );
});
/*PROFILE IMAGE FALLBACK*/
const profileImg =
document.getElementById(
    "profileImg"
);
const profileFallback =
document.getElementById(
    "photoFb"
);
if (profileImg) {
    profileImg.onerror =
        function () {
            profileImg.style.display =
                "none";
            if (
                profileFallback
            ) {
                profileFallback.style.display =
                    "flex";
            }
        };
}
/*STATS COUNTER ANIMATION*/
const statCards =
document.querySelectorAll(
    ".stat-card h2"
);
const statObserver =
new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (
                entry.isIntersecting
            ) {
                animateCounter(
                    entry.target
                );
                statObserver.unobserve(
                    entry.target
                );
            }
        });
    },
    {
        threshold: 0.5
    }
);
statCards.forEach(card => {
    statObserver.observe(card);
});
function animateCounter(
    element
) {
    const originalText =
        element.textContent;
    const value =
        parseInt(
            originalText.replace(
                /\D/g,
                ""
            )
        );
    if (isNaN(value)) return;
    let count = 0;
    const increment =
        Math.ceil(
            value / 60
        );
    const timer =
        setInterval(() => {
            count += increment;
            if (
                count >= value
            ) {
                element.textContent =
                    originalText;
                clearInterval(
                    timer
                );
            } else {
                if (
                    originalText.includes(
                        "+"
                    )
                ) {
                    element.textContent =
                        count + "+";
                } else {
                    element.textContent =
                        count;
                }
            }
        }, 20);
}
/*KEYBOARD ACCESSIBILITY*/
document.addEventListener(
    "keydown",
    e => {
        if (
            e.key === "Escape"
        ) {
            const modal =
                document.getElementById(
                    "successModal"
                );
            if (modal) {
                modal.style.display =
                    "none";
            }
        }
    }
);
console.log(
    "%cPortfolio Loaded Successfully",
    "color:#2563eb;font-size:18px;font-weight:bold;"
);
console.log({
    developer:
        "Egala Srinidhi Reddy",
    role:
        "AI & Full Stack Developer",
    github:
        "https://github.com/srinidhi-2006-bit",
    linkedin:
        "https://www.linkedin.com/in/egala-srinidhi-reddy-049966335/",
    leetcode:
        "https://leetcode.com/u/nidhi_123-4/",
    codechef:
        "https://www.codechef.com/users/flash_zeal_29"
});